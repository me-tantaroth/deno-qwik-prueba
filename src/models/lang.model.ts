import type { ItemModel } from "./item.model";

export type LangCode = "es" | "en" | "default" | string;
export type LangValue = {
  [key: LangCode]: string;
};
export interface LangModel extends ItemModel<LangModel> {
  name: string;
}
