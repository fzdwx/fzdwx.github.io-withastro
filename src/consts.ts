// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const SITE_CONFIG = {
    header: {
        title: "fzdwx",
        icon: "https://avatars.githubusercontent.com/u/65269574?v=4",
        description: "fzdwx's blog",
    },
    footer: {
        copyRight: "2023 ~ forever | <a class='text-just-dark' href='https://github.com/fzdwx' target='_blank'>fzdwx</a> All Rights Reserved.",
    },
    github: {
        owner: "fzdwx",
        repo: "fzdwx.github.io",
    },
    feeds: [
        {
            url: "https://manateelazycat.github.io/feed.xml",
            avatar: "https://manateelazycat.github.io/favicon.ico"
        },
        {
            url: "http://feeds.feedburner.com/ruanyifeng",
            avatar: "http://www.ruanyifeng.com/blog/images/person2_s.jpg"
        },
        {
            url: "https://blog.codingnow.com/atom.xml",
            avatar: "https://blog.codingnow.com/favicon.ico"
        },
        {
            url: "https://www.skyzh.dev/posts/index.xml",
            avatar: "https://www.skyzh.dev/skyzh.jpg"
        },
        {
            url: "https://www.manjusaka.blog/atom.xml",
            avatar: "https://user-images.githubusercontent.com/7054676/56820343-2fe1b580-687e-11e9-8f6f-778df3a8eafd.png"
        },
        {
            url: "https://weekly.tw93.fun/rss.xml",
            avatar: "https://avatars.githubusercontent.com/u/8736212?v=4"
        },
        {
            url: "https://linux-china.davao.page/rss.xml",
            avatar: "https://avatars.githubusercontent.com/u/46711?v=4"
        }
    ],
    links: [
        {
            title: "Home",
            url: "/",
            icon: "ph:house-line-duotone",
        },
        {
            title: "Blog",
            url: "/blog",
            icon: "mdi:text-box-multiple-outline",
        },
        {
            title: "Feeds",
            url: "/sub-feeds",
            icon: "icon-park-outline:rss"
        },
        {
            title: "Timeline",
            url: "/timeline",
            icon: undefined
        }
    ]
}
