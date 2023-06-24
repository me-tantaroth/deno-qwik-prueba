import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  useNavigate,
  useLocation,
} from "@builder.io/qwik-city";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { FIREBASE_INSTANCE } from "../../../utils/firebase.util";

export const useSaveLink = routeAction$(
  async (data: { uid: string; website: string; from: string }) => {
    deleteDoc(doc(FIREBASE_INSTANCE.firestore(), `__short_links/${data.uid}`));

    const success = await FIREBASE_INSTANCE.write(
      "set",
      doc(FIREBASE_INSTANCE.firestore(), `__short_links/${data.from}`),
      {
        uid: data.from,
        website: data.website,
      }
    );

    return {
      uid: data.from,
      success,
    };
  },
  zod$({
    uid: z.string(),
    website: z.string(),
    from: z.string(),
  })
);

export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();
  const action = useSaveLink();
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
    <div>
      <p class="mb-5">
        Se ha convertido tu enlace correctamente, ahora debe crear una nueva
        ruta desde donde se redireccionará
      </p>

      <Form
        action={action}
        class="my-10"
        onSubmit$={() => {
          if (action.status === 200 && action.value?.success) {
            nav("/convert/" + action.value?.uid + "/response");
          }
        }}
      >
        <div>
          <label
            for="from"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Nuevo sitio web
          </label>
          <div class="mt-2">
            <div class="flex px-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                {"http://afrup.us/"}
              </span>
              <input
                type="text"
                name="from"
                id="from"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="link"
                value={loc.params?.uid || ""}
              />
            </div>
          </div>
        </div>

        <h1 class="my-8 mb-6 text-sm font-semibold bg-amber-100 overflow-auto whitespace-break-spaces">
          Redireccionará a{" "}
          <a
            href={data.value?.website || "https://"}
            class="font-normal underline"
          >
            {data.value?.website || "https://"}
          </a>
        </h1>

        <div class="mt-10 text-center">
          <input type="hidden" name="uid" value={loc.params?.uid} />
          <input type="hidden" name="website" value={data.value?.website} />
          <button
            type="submit"
            class="bg-black py-4 px-10 text-white text-xl rounded-lg"
          >
            Guardar
          </button>
        </div>
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "AfroUp :: Short Link",
  meta: [
    {
      name: "description",
      content:
        "Simplifica tus enlaces y mejora la apariencia de tu marca con nuestra plataforma intuitiva y poderosa.",
    },
  ],
};
