import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";

export const useSave = routeAction$(
  ({ name }: { name: string }) => {
    console.log("Your name is", name);
    return {
      newName: name,
    };
  },
  zod$({
    name: z.string(),
  })
);

export default component$(() => {
  const action = useSave();

  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>

      <pre>{JSON.stringify(action, null, 2)}</pre>

      <Form action={action}>
        <input type="text" name="name" placeholder="Enter your name..." />
        <button type="submit">Save</button>
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
