import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";
import { NOMBRES, useNombres } from "./layout";

export const useSave = routeAction$(
  (data: { nombre: string }) => {
    NOMBRES.push(data.nombre);

    return {
      nombres: NOMBRES,
    };
  },
  zod$({
    nombre: z.string(),
  })
);

export default component$(() => {
  const action = useSave();
  const list = useNombres();

  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>

      <pre>{JSON.stringify(action, null, 2)}</pre>
      <pre>{JSON.stringify(list.value, null, 2)}</pre>

      <Form action={action}>
        <input type="text" name="nombre" placeholder="Tu nombre" />

        <button type="submit">Guardar</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
