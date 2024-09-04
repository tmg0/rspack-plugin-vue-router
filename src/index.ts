import type { Compiler } from '@rspack/core'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import { resolveOptions } from 'unplugin-vue-router/options'
import { type Options, createRoutesContext } from 'unplugin-vue-router'

export default class RspackPluginVueRouter extends RspackVirtualModulePlugin {
  private _ctx

  constructor(options: Options = {}) {
    super({ 'vue-router/auto-routes': '' })
    this._ctx = createRoutesContext(resolveOptions(options))
  }

  async apply(compiler: Compiler) {
    super.apply(compiler)
    await this._ctx.scanPages(false)
    this.writeModule('vue-router/auto-routes', this._ctx.generateRoutes())
  }
}
