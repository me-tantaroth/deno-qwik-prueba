import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { doc, getDoc } from "@firebase/firestore";
import { FIREBASE_INSTANCE } from "../../../../utils/firebase.util";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  const data: Signal<
    | {
        website: string;
        uid: string;
      }
    | undefined
  > = useSignal();

  useTask$(async () => {
    const snap = await getDoc(
      doc(FIREBASE_INSTANCE.firestore(), `__short_links/${loc.params?.uid}`)
    );

    if (snap.exists()) {
      const responseData = FIREBASE_INSTANCE.processDocumentSnapshot(snap);

      data.value = {
        website: responseData.website,
        uid: responseData.uid,
      };
    }
  });

  return (
    <>
      <h1 class="text-3xl overflow-auto whitespace-break-spaces">
        Se creó correctamente tu link ahora tu link{" "}
        <b>
          <a href={`https://afrup.us/${data.value?.uid}`} class="underline">
            https://afrup.us/{data.value?.uid}
          </a>
        </b>{" "}
        redireccionará a{" "}
        <b>
          <a href={data.value?.website} class="underline">
            {data.value?.website}
          </a>
        </b>
      </h1>

      <div class="text-center my-16">
        <a href="/" class="bg-black py-4 px-10 text-white text-xl rounded-lg">
          Volver a generar otro link
        </a>
      </div>
    </>
  );
});
