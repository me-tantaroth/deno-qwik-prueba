import { noSerialize } from "@builder.io/qwik";
import { InputModel } from "~/models/input.model";

export const INPUTS_PROJECT = {
  inputName: noSerialize(
    new InputModel({
      name: "nombre",
      label: "Nombre del proyecto",
      sort: 0,
    })
  ),
  inputUID: noSerialize(
    new InputModel({
      name: "uid",
      label: "ID del proyecto",
      sort: 1,
    })
  ),
};
