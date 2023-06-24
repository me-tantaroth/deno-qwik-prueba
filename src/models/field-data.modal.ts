import type { NoSerialize } from "@builder.io/qwik";
import type { Timestamp } from "firebase/firestore";
import type { FieldType } from "~/utils/dynamic-form.util";

export interface FieldDataModel {
  id: string;
  type: FieldType;
  label?: string;
  sort: number;
  placeholder?: string;
  value?: string;
  createdAt: NoSerialize<Timestamp>;
  updatedAt?: NoSerialize<Timestamp>;
}
