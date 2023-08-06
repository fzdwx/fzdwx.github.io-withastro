// uno.config.ts
import {defineConfig, presetTypography, presetUno, transformerDirectives} from 'unocss'

export default defineConfig({
    content:{
        pipeline:{
            include:[
                "./src/**/*.{vue,ts,js,jsx,tsx,css,astro}"
            ]
        }
    },
    transformers: [
        transformerDirectives({
        }),
    ],
    // ...UnoCSS options
    shortcuts: {
        'm-center': 'flex justify-center items-center',
        'm-con': 'max-w-[90%] sm:w-[560px] lg:w-[850px]',
        'my-prose': "prose",
    },
    presets: [
        presetUno(),
        presetTypography(
            {
                cssExtend: {
                    'a':{
                        underline: 'none',
                        color:'text-just'
                    },
                    'a:hover':{
                        color:'text-just-dark'
                    }
                }
            }
        )
    ],
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
