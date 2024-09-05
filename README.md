# rspack-plugin-vue-router

File-system vue routing for [rspack](https://rspack.dev/index) by [unplugin-vue-router](https://uvr.esm.is/).

unplugin-vue-router may have some [issues](https://github.com/posva/unplugin-vue-router/issues/500) to work with rspack, this caused by the unplugin rspack virtual module bug: [here](https://github.com/unjs/unplugin/pull/411)

This issue shoud be fixed in the next version of unplugin, and before that, this pkg provide a solution for using unplugin-vue-router in your application.

## Installation

```bash
pnpm add rspack-plugin-vue-router -D
```

## Usage

```ts
// rspack.config.ts
import RspackVueRouterPlugin from 'rspack-plugin-vue-router'

export default {
  plugins: [
    new RspackVueRouterPlugin({
      routesFolder: './app/pages',
    }),
  ],
}
```

## Options

### `options.routesFolder`

- Type: `string`
- Default: `./src/pages`

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
