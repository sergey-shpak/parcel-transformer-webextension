const { Transformer } = require('@parcel/plugin')
const json5 = require('json5')

const isDependency = /^[\S]*(.html|.css|.js|.png|.jpeg)$/

const extractDependencies = (data, asset) => 
  Array.isArray(data)
  ? data.map(item => extractDependencies(item, asset))
  : typeof data === 'object'
  ? Object.entries(data).reduce((acc, [key, value]) => ({
      ...acc, [key]: extractDependencies(value, asset)
    }), {})
  : typeof data === 'string' && isDependency.test(data)
  ? asset.addURLDependency(data)
  : data

exports.default = new Transformer({
  async transform({ asset }) {
    let rawCode = await asset.getCode()
    let manifest = json5.parse(rawCode)

    asset.type = 'json'
    asset.setCode(JSON.stringify(
      extractDependencies(manifest, asset)
    ))

    return [asset]
  }
})