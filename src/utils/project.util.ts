import { noSerialize } from "@builder.io/qwik";
import { Timestamp } from "firebase/firestore";
import type {
  FirebaseConfigDataModel,
  FirebaseConfigModel,
} from "~/models/firebase-config.model";

export class ProjectUtil {
  convertToData(data: {
    [key: string]: string | Timestamp;
  }): FirebaseConfigDataModel {
    const response: FirebaseConfigDataModel = {
      id: data.id as string,
      name: data.name as string,
      createdAt: noSerialize((data.createdAt as Timestamp) || Timestamp.now()),
      updatedAt: noSerialize((data.updatedAt as Timestamp) || Timestamp.now()),
      apiKey: data.apiKey as string,
      authDomain: data.authDomain as string,
      databaseURL: data.databaseURL as string,
      projectId: data.projectId as string,
      storageBucket: data.storageBucket as string,
      messagingSenderId: data.messagingSenderId as string,
      appId: data.appId as string,
      measurementId: data.measurementId as string,
    };

    if (data.updatedAt) {
      response.updatedAt = noSerialize(
        (data.updatedAt as Timestamp) || Timestamp.now()
      );
    }

    return response;
  }
  convertToConfig(config: FirebaseConfigDataModel): FirebaseConfigModel {
    return {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId,
    };
  }
}
