import { noSerialize } from "@builder.io/qwik";
import { TranslateUtil } from "./translate.util";
import { MONTHS } from "../data/date.data";

export class Util {
  convertStringToUID(text: string) {
    return this.accentsTidy(
      text
        .replace(/([A-Z])/g, "_$1")
        .replace(/^(_)/, "")
        .replace(/ /g, "_")
    ).replace(/\//g, "");
  }
  UIDGenerator() {
    const S4: () => string = (): string => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  randomString(length: number, chars: string) {
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];

    return result;
  }
  accentsTidy(s: string): string {
    let r = s.toLowerCase();
    r = r.replace(new RegExp("\\s", "g"), "");
    r = r.replace(new RegExp("[àáâãäå]", "g"), "a");
    r = r.replace(new RegExp("æ", "g"), "ae");
    r = r.replace(new RegExp("ç", "g"), "c");
    r = r.replace(new RegExp("[èéêë]", "g"), "e");
    r = r.replace(new RegExp("[ìíîï]", "g"), "i");
    r = r.replace(new RegExp("ñ", "g"), "n");
    r = r.replace(new RegExp("[òóôõö]", "g"), "o");
    r = r.replace(new RegExp("œ", "g"), "oe");
    r = r.replace(new RegExp("[ùúûü]", "g"), "u");
    r = r.replace(new RegExp("[ýÿ]", "g"), "y");
    r = r.replace(new RegExp("\\W", "g"), "");
    return r;
  }
  noSerializeData(data: object) {
    const d = data as {
      [k: string]: any;
    };

    Object.keys(d).forEach((k: string) => {
      if (typeof d[k] === "object" || typeof d[k] === "function") {
        d[k] = noSerialize(d[k]);
      }
    });

    return d as object;
  }

  async naturalDateFormat(date: Date) {
    const translateInstance = new TranslateUtil();

    return `${date.getDate() || "--"} ${await translateInstance.exec("of")} ${
      date ? await translateInstance.exec(MONTHS[date.getMonth()]) : "--"
    } ${await translateInstance.exec("of")} ${date.getFullYear() || "--"}`;
  }
}

export const UTIL_INSTANCE = new Util();
