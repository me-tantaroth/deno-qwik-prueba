export type FieldType = "text" | "number" | "date" | "hidden";
export interface FieldModel {
  id?: string;
  name?: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  sort?: number;
  value?: string | number | Date;
  required?: boolean;
}

export class DynamicFormUtil {
  createField(attr: FieldModel): FieldModel {
    const attrs: FieldModel = {
      type: "text",
    };

    attrs.id = attr.id;
    attrs.name = attr.name;
    attrs.value = attr.value;
    attrs.placeholder = attr.placeholder;
    attrs.type = attr.type;
    attrs.name = attr.name;
    attrs.label = attr.label;

    return attrs;
  }

  jsonToFields(json: {
    [key: string]: any | string | number | undefined;
  }): FieldModel[] {
    const fields: FieldModel[] = [];

    for (const key in json) {
      if (!Object.prototype.hasOwnProperty.call(json, key)) {
        continue;
      }

      if (json[key].toDate) {
        json[key] = json[key].toDate();
      }

      const attr = this.valueToFieldModel(json[key]);

      attr.id = key;
      attr.name = key;
      attr.type = /^___([a-z A-Z 0-9])*___$/.test(key) ? "hidden" : attr.type;
      attr.label = attr.type === "hidden" ? "" : attr.label || key;
      attr.placeholder = attr.type === "hidden" ? "" : attr.placeholder || "";

      fields.push(this.createField(attr));
    }

    return fields;
  }

  valueToFieldModel(value: string | number | Date | undefined): FieldModel {
    const attrs: FieldModel = {
      type: "text",
      value: "",
    };

    if (value instanceof Date) {
      attrs.type = "date";
      attrs.value = [
        value.getFullYear(),
        (value.getMonth() + 1).toString().padStart(2, "0"),
        value.getDate().toString().padStart(2, "0"),
      ].join("-");
    } else if (typeof value === "number") {
      attrs.type = "number";
      attrs.value = value;
    } else {
      attrs.type = "text";
      attrs.value = value;
    }

    return attrs;
  }

  checkFieldModel(currentFieldModel: FieldModel): FieldModel {
    if (currentFieldModel.value instanceof Date) {
      currentFieldModel.type = "date";
      currentFieldModel.value = [
        currentFieldModel.value.getFullYear(),
        (currentFieldModel.value.getMonth() + 1).toString().padStart(2, "0"),
        currentFieldModel.value.getDate().toString().padStart(2, "0"),
      ].join("-");
    } else if (typeof currentFieldModel.value === "number") {
      currentFieldModel.type = "number";
    } else {
      currentFieldModel.type = "text";
    }

    return currentFieldModel;
  }

  inputDateToValue(date: Date): string {
    return [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("-");
  }
}

export const FORM_DYNAMIC_INSTANCE = new DynamicFormUtil();
