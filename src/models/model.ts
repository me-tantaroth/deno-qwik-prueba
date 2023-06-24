import type { NoSerialize } from "@builder.io/qwik";
import type { Timestamp } from "firebase/firestore";

export interface Model {
  id: string;
  name: string;
  sort: number;
  createdAt: NoSerialize<Timestamp>;
  updatedAt?: NoSerialize<Timestamp>;
}
