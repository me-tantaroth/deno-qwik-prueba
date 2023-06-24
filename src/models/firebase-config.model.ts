import type { NoSerialize } from "@builder.io/qwik";
import type { Timestamp } from "firebase/firestore";

export interface FirebaseConfigModel {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
  measurementId: string;
}
export interface FirebaseConfigDataModel extends FirebaseConfigModel {
  id: string;
  name?: string;
  sort?: number;
  createdAt: NoSerialize<Timestamp>;
  updatedAt?: NoSerialize<Timestamp>;
}
