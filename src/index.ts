import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'
import type { Compiler } from '@rspack/core'
import { hash } from 'ohash'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import { resolveOptions } from 'unplugin-vue-router/options'
import { type Options, createRoutesContext } from 'unplugin-vue-router'

export default class RspackVueRouterPlugin extends RspackVirtualModulePlugin {
  public name = 'RspackVueRouterPlugin'

  private _ctx
  private _options
  private _hash = ''

  constructor(vueRouterOptions: Options = {}) {
    super({ 'vue-router/auto-routes': 'export const routes = []' })
    const options = resolveOptions(vueRouterOptions)
    this._options = options
    this._ctx = createRoutesContext(options)
  }

  async apply(compiler: Compiler) {
    super.apply(compiler)

    if (typeof this._options.dts === 'string')
      await fs.mkdir(dirname(this._options.dts), { recursive: true })

    await this._ctx.scanPages(false)
    const content = this._ctx.generateRoutes()
    this.writeModule('vue-router/auto-routes', content)

    compiler.hooks.thisCompilation.tap(this.name, async () => {
      await this._ctx.scanPages(false)
      const content = this._ctx.generateRoutes()
      const newHash = hash(content)
      if (this._hash === newHash)
        return
      this._hash = newHash
      this.writeModule('vue-router/auto-routes', content)
    })
  }
}
