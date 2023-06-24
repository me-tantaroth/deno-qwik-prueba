import { server$ } from "@builder.io/qwik-city";

export const PASS_DATA: { [x: string]: any } = {};

export const setPassData = server$((key, value) => {
  PASS_DATA[key] = value;
});
export const getPassData = server$((key) => {
  return PASS_DATA[key];
});
export const getPassAllData = server$(() => {
  return PASS_DATA;
});
export const deletePassData = server$((key) => {
  delete PASS_DATA[key];
});

export class PassDataUtil {
  data: { [x: string]: any } = {};

  getAll$() {
    return getPassAllData();
  }

  get(key: string) {
    return this.data[key];
  }

  get$(key: string) {
    return getPassData(key);
  }

  set(key: string, value: any) {
    setPassData(key, value);
    this.data[key] = value;
  }

  delete(key: string) {
    deletePassData(key);
    delete this.data[key];
  }
}

export const passDataInstance = new PassDataUtil();
