import type { Compiler } from '@rspack/core'
import { hash } from 'ohash'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import { resolveOptions } from 'unplugin-vue-router/options'
import { type Options, createRoutesContext } from 'unplugin-vue-router'

export default class RspackVueRouterPlugin extends RspackVirtualModulePlugin {
  public name = 'RspackVueRouterPlugin'

  private _ctx
  private _hash = ''

  constructor(options: Options = {}) {
    super({ 'vue-router/auto-routes': 'export const routes = []' })
    this._ctx = createRoutesContext(resolveOptions(options))
  }

  async apply(compiler: Compiler) {
    super.apply(compiler)
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
