import { Transformer } from "@parcel/plugin";

export default new Transformer({
  async loadConfig({ config }) {
    const result = await config.getConfig(
      ["src/manifest.json"],
      {
        parse: true,
      },
    );

    if (!result) {
      throw new Error("Could not get or parse src/manifest.json");
    }

    return result.contents;
  },

  async transform({ asset, config }) {
    if (!asset.filePath.endsWith("-manifest.json")) {
      return [asset];
    }

    let source = await asset.getCode();
    asset.setCode(
      JSON.stringify({
        ...config,
        // make sure the browser specific manifest takes precedence
        ...JSON.parse(source),
      }),
    );

    return [asset];
  },
});
