import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { doc, getDoc } from "@firebase/firestore";
import { FIREBASE_INSTANCE } from "~/utils/firebase.util";

export const onGet: RequestHandler = async ({ redirect, params }) => {
  const responseData = await getDoc(
    doc(FIREBASE_INSTANCE.firestore(), `__short_links/${params?.uid}`)
  );

  if (responseData.exists()) {
    const data = FIREBASE_INSTANCE.processDocumentSnapshot(responseData);

    redirect(302, data.website);
  }
};

export default component$(() => {
  return <div>Redirecting...</div>;
});
