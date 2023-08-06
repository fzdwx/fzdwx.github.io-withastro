---
title: "在 Go 实现类似 Java 中 Stream 的编程体验"
date: "2023-05-08T17:48:09+08:00"
tags: [go]
---

在我们的 curd 的日常中, list 是不可缺少的一部分(在 go 中是 slice), 例如我们从数据库中查询分页数据, 然后可能需要对数据进行过滤, 转换, 去重等操作: 

```go
var users []User = userService.ListUsers()

// 过滤
var filteredUsers []User
for _, user := range users {
    if user.Age > 18 {
        filteredUsers = append(filteredUsers, user)
    }
}

// 转换
var userNames []string
for _, user := range filteredUsers {
    userNames = append(userNames, user.Name)
}

// 去重
var uniqueUserNames []string
for _, userName := range userNames {
    if !contains(uniqueUserNames, userName) {
        uniqueUserNames = append(uniqueUserNames, userName)
    }
}
```

上面这段代码是一个典型的 slice 处理过程, 但是它有几个问题:

1. 重复遍历了 3 次
2. 代码冗余, 过滤, 转换, 去重的代码都是类似的, 只是处理的逻辑不同

但是在 Java 中可以使用 Stream 来进行处理, 并且只遍历一次:

```java
List<User> users = userService.listUsers();

List<String> userName = users.stream()
    .filter(u -> u.age > 18)
    .map(u -> u.name)
    .distinct()
    .collect(Collectors.toList());
```

## 那么可不可以在 go 中也实现这个数据结构?

我的答案是可以, 但是有一些问题:

1. go 没有方法泛型, 就是一个结构体的泛型必须一开始就固定好, 方法上不能新加一个泛型,
这就会导致在实现 map, distinct 无法链式调用, 只能通过调用一个新函数来实现.
2. go 中的比较符号只能作用于基本类型, 不能作用于结构体, 也没有 equals 方法, 所以在实现 distinct 时需要传入一个比较函数.

Iterator 是核心接口, 表示这是一个可遍历的类型, 用于获取下一个元素, 如果返回 false 就表示结束遍历

```go
type Iterator[T any] interface {
 Next() (T, bool)
}
```

实现思路:

1. 一个基础的 stream 实现, 用于遍历所有元素
2. map, filter, distinct 等方法都返回一个新的 stream 结构体, 并实现它们各自 `Next` 方法

### 基础的遍历

https://github.com/fzdwx/iter/blob/main/stream/stream.go

用一个 idx 表示当前的元素, 每次调用 Next 时 idx + 1, 然后判断 idx 是否小于数组长度, 如果小于就返回当前元素, 否则返回一个空元素和 false

```go
func (a *Stream[T]) Next() (T, bool) {
 a.idx++
 if a.HasNext() {
  return a.arr[a.idx], true
 }
 return types.Empty[T](), false
}

func (a *Stream[T]) HasNext() bool {
 return a.idx < len(a.arr)
}
```

### map

https://github.com/fzdwx/iter/blob/main/stream/ops_map.go

也很好实现, 只需要在 Next 时调用 mapFunc 就可以了

```go
func (m *mapStream[T, U]) Next() (U, bool) {
 v, ok := m.iter.Next()
 if !ok {
  return types.Empty[U](), false
 }
 return m.mapper(v), true
}
```

### filter

https://github.com/fzdwx/iter/blob/main/stream/ops_filter.go

filter 的 Next 的语义就是找到下一个符合 filterFunc 的元素, 所以需要在 Next 时就调用 filterFunc, 如果符合就返回, 否则继续找下一个

```go
func (f *filterStream[T]) Next() (T, bool) {
 for {
  v, ok := f.iter.Next()
  if !ok {
   return types.Empty[T](), false
  }
  if f.filter(v) {
   return v, true
  }
 }
}
```

### distinct

https://github.com/fzdwx/iter/blob/main/stream/ops_distinct.go

distinct 我是用一个 map 来标记重复 key, 下面的 `d.distinct` 方法是用来生成 key 的

```go
func (d distinctStream[T, K]) Next() (T, bool) {
 for {
  v, ok := d.iter.Next()
  if !ok {
   return v, false
  }
  k := d.distinct(v)
  if !d.m[k] {
   d.m[k] = true
   return v, true
  }
 }
}
```

上面介绍了一些中间操作的实现, 接下来是终端操作, 也就是真正调用 `Next` 的地方:

```go
// 比如说转换成 array:
func CollectToArray[T any](iter types.Iterator[T]) []T {
 var arr []T
 for {
  v, ok := iter.Next()
  if !ok {
   return arr
  }
  arr = append(arr, v)
 }
}

// 分组:
func (a *groupArray[T, K]) Collect() map[K][]T {
 m := make(map[K][]T)
 for {
  v, ok := a.iter.Next()
  if !ok {
   break
  }
  key := a.groupBy(v)
  m[key] = append(m[key], v)
 }
 return m
}

// 转换成 map
func ToMap[T any, K comparable](
 iterator types.Iterator[T],
 keyMapper fx.Func[T, K],
) map[K]T {
 m := make(map[K]T)
 for {
  v, ok := iterator.Next()
  if !ok {
   break
  }
  m[keyMapper(v)] = v
 }
 return m
}
```

## 用我们实现的库在来进行上面的例子

体验上已经差不多了, 但不得不说 Java 中的 lambda 确实用起来很舒服, 如果 go 能简化一下 func 方法的写法就更好了

::code-group
```go [go]
users := userService.ListUsers()

stream.Of(users).
 Filter(func(u user) bool {
  return u.Age > 18
 }).
 MapTo(func(u user) string {
  return u.Name
 }).
 Distinct(fx.IdentityString).
 ToArray()
```
```java [java]
List<User> users = userService.listUsers();

List<String> userName = users.stream()
    .filter(u -> u.age > 18)
    .map(u -> u.name)
    .distinct()
    .collect(Collectors.toList());
```
::

**最后**:

项目地址： <https://github.com/fzdwx/iter> , 欢迎 star 和 pr
