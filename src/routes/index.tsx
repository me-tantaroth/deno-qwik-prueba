import { component$ } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  useNavigate,
} from "@builder.io/qwik-city";
import { doc } from "firebase/firestore";
import { FIREBASE_INSTANCE } from "../utils/firebase.util";
import { UTIL_INSTANCE } from "../utils/util";

export const useSaveLink = routeAction$(
  async (data: { website: string }) => {
    const uid = UTIL_INSTANCE.randomString(
      12,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    const success = await FIREBASE_INSTANCE.write(
      "set",
      doc(FIREBASE_INSTANCE.firestore(), `__short_links/${uid}`),
      {
        website: data.website,
        uid,
      }
    );

    return {
      uid,
      success,
    };
  },
  zod$({
    website: z.string().url(),
  })
);

export default component$(() => {
  const nav = useNavigate();
  const action = useSaveLink();

  return (
    <div>
      <h1 class="text-4xl text-center font-semibold">Short Link</h1>
      <p class="my-5">
        Afroup's Short Link es una plataforma que te permite acortar y
        redireccionar tus enlaces web de forma sencilla y personalizada. Con
        nuestra herramienta, puedes crear enlaces compactos y atractivos que
        redirigen a tu dominio, facilitando la gestión y compartición de tus
        enlaces.
      </p>

      <Form
        action={action}
        class="my-10"
        onSubmit$={() => {
          if (action.status === 200 && action.value?.success) {
            nav("/convert/" + action.value?.uid);
          }
        }}
      >
        <div>
          <label
            for="website"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Ingrese el sitio web que quiere cortar
          </label>
          <div class="mt-2">
            <div class="flex px-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
              <input
                type="url"
                name="website"
                id="website"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="https://www.ejemplo.com"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 text-center">
          <button
            type="submit"
            class="bg-black py-4 px-10 text-white text-xl rounded-lg"
          >
            Convertir
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
