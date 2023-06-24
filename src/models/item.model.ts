import type { NoSerialize } from "@builder.io/qwik";
import type {
  CollectionReference,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";

export interface ItemModel<T> {
  __id: string;
  __name: string;
  __sort: number;
  __createdAt: NoSerialize<Timestamp>;
  __updatedAt?: NoSerialize<Timestamp>;
  __childrenRef?: CollectionReference<T>;
  __parentRef?: DocumentReference<T>;
}
