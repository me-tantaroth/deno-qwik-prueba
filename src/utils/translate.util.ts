export class TranslateUtil {
  private _default = "es";

  constructor(
    data: { default: string } = {
      default: "es",
    }
  ) {
    this._default = data.default;
  }

  use(lang: string) {
    this._default = lang;
  }

  async getDictionary(code: string = "es"): Promise<{
    [key: string]: string;
  }> {
    if (this._default) {
      const data = await import(
        /* @vite-ignore */ `../data/langs/${code || this._default}.data`
      );

      return data;
    }

    return {};
  }

  async exec(key: string) {
    return (await this.getDictionary())[key] || "";
  }
}
