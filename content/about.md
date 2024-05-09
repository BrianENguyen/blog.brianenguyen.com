# About

_BENplate_ is an opinionated Nuxt starter template made by [Brian E. Nguyen](https://brianenguyen.com).

## Features

- [Nuxt](https://nuxt.com/)
- [Bun](https://bun.sh/)
- [Auto import components](https://nuxt.com/docs/guide/directory-structure/components)
- [Layout system](https://nuxt.com/docs/api/components/nuxt-layout)
- [UnoCSS](https://unocss.dev/)
- [Markdown Support](https://content.nuxt.com/usage/markdown)
  - [Code syntax highlighting](https://shiki.matsu.io/)
- [Icons](https://icones.js.org/)
- [Light / dark mode](https://vueuse.org/core/useDark)

```javascript
// Syntax highlighting example
function benplate() {
  const foo = 'bar';
  console.log(foo);
}
```

## Installation

```shell
> git clone https://github.com/buraiyen/BENplate

...

> cd BENplate/
> bun install
> bun run dev
```

## Checklist

When using this template, please follow this checklist to update your info properly

<input type="checkbox" id="license" name="license">
<label for="license">Change the author name in <code>LICENSE</code></label>

<br />

<input type="checkbox" id="github" name="github">
<label for="license">
  Remove or change the <code>funding.yml</code> file in the <code>.github/</code> directory
</label>

<br />

<input type="checkbox" id="favicon" name="favicon">
<label for="favicon">
  Remove or replace the <code>favicon.ico</code> file in the <code>public/</code> directory
</label>

And that's it! You're good to go!

## Hosting

Since Bun is in its early stages, I **_highly_** recommend that you use [Vercel](https://vercel.com/changelog/bun-install-is-now-supported-with-zero-configuration) to host your app because it works out-of-the-box with zero configurations needed
