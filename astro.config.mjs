import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import image from "@astrojs/image";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://fzdwx.vercel.app',
  output: 'server',
  integrations: [mdx(), sitemap(), UnoCSS({
    injectReset: true
  }), image()],
  adapter: vercel()
});
