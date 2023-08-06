// uno.config.ts
import {defineConfig} from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    shortcuts: {
        'm-center': 'flex justify-center items-center',
        'm-con': 'max-w-[90%] sm:w-[560px] lg:w-[850px]'
    },
    theme: {
        colors: {
            'aura-just': "#61ffca",
            'just': "#10b981",
            'just-light': "#34d399",
            'just-lighter': "#6ee7b7",
            'just-dark': "#059669",
            'just-darker': "rgb(4, 120, 87)",
            'codebg': "#f8f8f8",
            'codetext': "#24292e"
        }
    }
})
