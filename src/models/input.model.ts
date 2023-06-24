import { noSerialize } from "@builder.io/qwik";
import { Timestamp } from "firebase/firestore";
import { UTIL_INSTANCE } from "~/utils/util";
import type { QRL } from "@builder.io/qwik";
import type { ItemModel } from "./item.model";
import type { LangCode, LangValue } from "./lang.model";

export type DataOptional = {
  id?: string;
  name: string;
  type?: InputType;
  value?: InputValue;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  sort: number;
  langCode?: LangCode;
  onChange$?: QRL<(event: Event) => void>;
};
export type InputValue = string | number | boolean | null | undefined;
export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "to-json"
  | "url"
  | "week";
export type InputAttr = {
  id: string;
  name: string;
  type: InputType;
  value?: InputValue;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  src?: string;
};
export type InputEvent = {
  id: string;
  name: string;
  type?: InputType;
  value?: InputValue;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  src?: string;
};
export interface InputModel extends ItemModel<InputModel> {
  name: LangValue;
  attr: InputAttr;
}
export class InputModel {
  constructor(defaultData: DataOptional, data?: InputModel) {
    const __name: string =
      data?.__name || defaultData.name || UTIL_INSTANCE.UIDGenerator();
    const __id: string =
      data?.__id || defaultData.id || UTIL_INSTANCE.convertStringToUID(__name);

    const _attr: InputAttr = {
      ...data?.attr,
      id: __id,
      name: __name,
      label: data?.attr.label || defaultData.label || "",
      placeholder: data?.attr.placeholder || defaultData.placeholder || "",
      disabled: data?.attr.disabled || defaultData.disabled || false,
      required: data?.attr.required || defaultData.required || false,
      type: data?.attr.type || defaultData.type || "text",
      value: data?.attr.value || defaultData.value || "",
    };

    const name: LangValue = {};

    name[defaultData.langCode || "default"] = __name;

    const input: InputModel = {
      __id,
      __name,
      __sort: data?.__sort || defaultData.sort,
      __createdAt: data?.__createdAt || noSerialize(Timestamp.now()),
      __updatedAt: data?.__updatedAt || noSerialize(Timestamp.now()),
      __childrenRef: data?.__childrenRef,
      __parentRef: data?.__parentRef,
      name,
      attr: _attr,
    };

    return input;
  }
}
