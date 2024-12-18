import { Transformer } from "@parcel/plugin";

export default new Transformer({
  async loadConfig({ config }) {
    const result = await config.getConfig<{ version: string }>(
      ["package.json"],
      {
        parse: true,
        packageKey: "version",
      },
    );

    if (!result) {
      throw new Error("Could not get or parse package.json");
    }

    return result.contents;
  },

  async transform({ asset, config }) {
    if (!asset.filePath.endsWith("manifest.json")) {
      return [asset];
    }

    let source = await asset.getCode();
    let parsed = JSON.parse(source);

    parsed.version = config;
    asset.setCode(JSON.stringify(parsed));

    return [asset];
  },
});
