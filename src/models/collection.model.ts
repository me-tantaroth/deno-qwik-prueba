import { noSerialize } from "@builder.io/qwik";
import type { ItemModel } from "./item.model";
import type { LangCode, LangValue } from "./lang.model";
import { Timestamp } from "firebase/firestore";
import { UTIL_INSTANCE } from "~/utils/util";

export interface DataOpcional {
  collectionPath: string;
  name: string;
  langCode?: LangCode;
  sort: number;
}
export interface CollectionModel extends ItemModel<CollectionModel> {
  __path: string;
  name: LangValue;
}
export class CollectionModel {
  constructor(defaultData: DataOpcional, data?: CollectionModel) {
    const __id: string = UTIL_INSTANCE.convertStringToUID(defaultData.name);
    const __name: string = defaultData.name;

    const name: LangValue = {};

    name[defaultData.langCode || "default"] = defaultData.name;

    const collection: CollectionModel = {
      ...data,
      __id,
      __name,
      __path: `${defaultData.collectionPath}/${__id}`,
      __sort: defaultData.sort,
      __createdAt: noSerialize(Timestamp.now()),
      name,
    };

    return collection;
  }
}
