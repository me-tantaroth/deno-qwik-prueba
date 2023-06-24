import type { NoSerialize } from "@builder.io/qwik";
import type { Timestamp } from "firebase/firestore";

export interface LogModel {
  createdAt: NoSerialize<Timestamp>;
  updatedAt?: NoSerialize<Timestamp>;
}
export interface UserModel extends LogModel {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: NoSerialize<Timestamp>;
  updatedAt?: NoSerialize<Timestamp>;
}
