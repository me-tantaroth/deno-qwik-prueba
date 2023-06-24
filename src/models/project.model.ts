import { noSerialize } from "@builder.io/qwik";
import type { ItemModel } from "./item.model";
import { Timestamp } from "firebase/firestore";
import { UTIL_INSTANCE } from "~/utils/util";
import type { LangCode, LangValue } from "./lang.model";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL: string;
  measurementId: string;
}
export interface DataOpcional {
  id?: string;
  collectionPath: string;
  name: string;
  langCode?: LangCode;
  sort: number;
  config?: FirebaseConfig;
}
export interface ProjectModel extends ItemModel<ProjectModel> {
  __path: string;
  name: LangValue;
  config?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL: string;
    measurementId: string;
  };
}
export class ProjectModel {
  constructor(defaultData: DataOpcional, data?: ProjectModel) {
    const __id: string =
      defaultData?.id ||
      UTIL_INSTANCE.convertStringToUID(
        defaultData.name.trim().replace(/\s/g, "_")
      );
    const __name: string = defaultData.name;

    const name: LangValue = {};

    name[defaultData.langCode || "default"] = defaultData.name;

    return {
      ...data,
      __id,
      __name,
      __path: `${defaultData.collectionPath}/${__id}`,
      __sort: defaultData.sort,
      __createdAt: data?.__createdAt || noSerialize(Timestamp.now()),
      __updatedAt: noSerialize(Timestamp.now()),
      name,
    };
  }
}
