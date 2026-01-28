type BaseField<T = any> = {
  label: string
  name: keyof T
}

export type Field<T = any> =
  | ({ type: "text" } & BaseField<T>)
  | ({ type: "number" } & BaseField<T>)
  | ({ type: "checkbox" } & BaseField<T>)
