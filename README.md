# parcel-transformer-webextension

Parcel plugin to use WebExtension manifest as an entry point (parcel@v2 and json5 supported)

## Installation

`npm install parcel-transformer-webextension --save-dev`

## Configuration

Please add following configuration to `.parcelrc`

```json
{
 "transformers": {
    "manifest.{json5,json}": ["parcel-transformer-webextension"]
  },
  "packagers": {
    "manifest.json": "@parcel/packager-raw-url"
  }
}
```

## Usage

After installing and configuring the plugin, use WebExtension manifest.json as entry point:
```bash
parcel src/manifest.json5
```
Any manifest property (including nested) can be resolved as an asset(html/css/js/png/jpeg), 
all you need is to provide proper asset path to manifest property, for example:

```json5
// other manifest props
"browser_action": {
  "default_icon": "assets/icons/icon48.png",
  "default_popup": "action.html",
  "default_title": "Action!"
}
```

Btw, the plugin adds `json5` support, so [comments and other json5 benefits](https://www.npmjs.com/package/json5#short-example) can be used with WebExtension manifest file. Enjoy!

## License 

Apache 2.0