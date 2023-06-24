import { noSerialize } from "@builder.io/qwik";
import { type FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  type AddPrefixToKeys,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  type Query,
  type QuerySnapshot,
  type UpdateData,
  type WithFieldValue,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { FirebaseConfigModel } from "~/models/firebase-config.model";
import type { FirebaseResponseDataModel } from "~/models/firebase.model";

export const DATA_DB: {
  [key: string]: {
    [key: string]: any;
  }[];
} = {};
export const FIREBASE_APPS: { [key: string]: FirebaseApp } = {};

export const FIREBASE_DEFAULT_CONFIG: FirebaseConfigModel = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_CONFIG_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
};

export class Firebase {
  private _config: FirebaseConfigModel;

  constructor(config: FirebaseConfigModel = FIREBASE_DEFAULT_CONFIG) {
    this._config = config;
  }

  init(config?: FirebaseConfigModel, appName?: string | undefined) {
    appName = appName || "default";

    FIREBASE_APPS[appName] =
      FIREBASE_APPS[appName] ||
      initializeApp(
        config || this._config,
        appName === "default" ? undefined : appName
      );

    return FIREBASE_APPS[appName];
  }

  testConnection(app: FirebaseApp = this.init()): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const _doc = doc(this.firestore(app), "test/success");
        setDoc(_doc, {
          status: true,
        })
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  firestore(app: FirebaseApp = this.init()) {
    return getFirestore(app);
  }

  auth(app: FirebaseApp = this.init()) {
    return getAuth(app);
  }

  processDocumentSnapshot(doc: DocumentData): {
    [key: string]: any;
  } {
    const data = doc.data();
    const result: {
      [key: string]: any;
    } = {};

    Object.keys(data).forEach(async (key) => {
      let value = data[key];

      if (typeof value === "object" || typeof value === "function") {
        value = noSerialize(value);
      }

      result[key] = value;
    });

    result.id = doc.id;

    return result;
  }

  processCollectionSnapshot(snap: QuerySnapshot<DocumentData>): {
    [key: string]: any;
  }[] {
    return snap.docs.map((doc) => this.processDocumentSnapshot(doc));
  }

  snapData(query: Query<DocumentData>) {
    return {
      ssr: async () => {
        return this.processCollectionSnapshot(await getDocs(query));
      },
      client: (callback: (response: FirebaseResponseDataModel) => void) => {
        onSnapshot(query, (snap) =>
          callback(this.processCollectionSnapshot(snap))
        );
      },
    };
  }

  write<T>(
    process: "add" | "set" | "update",
    reference: CollectionReference<T> | DocumentReference<T>,
    data:
      | WithFieldValue<T>
      | ({
          [x: string]: any;
        } & AddPrefixToKeys<string, any>)
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let fn: Promise<any>;

      switch (process) {
        case "add":
          fn = (<unknown>(
            addDoc(
              reference as CollectionReference<T>,
              data as WithFieldValue<T>
            )
          )) as Promise<DocumentReference<T>>;
          break;
        case "set":
          fn = (<unknown>(
            setDoc(reference as DocumentReference<T>, data as WithFieldValue<T>)
          )) as Promise<void>;
          break;
        case "update":
          fn = (<unknown>(
            updateDoc(reference as DocumentReference<T>, data as UpdateData<T>)
          )) as Promise<void>;
          break;
      }

      if (fn) {
        fn.then(() => {
          resolve(true);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  delete(reference: DocumentReference<unknown>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      deleteDoc(reference)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
          console.error(error);
        });
    });
  }
}

export const FIREBASE_INSTANCE = new Firebase();
