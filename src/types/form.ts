// types/form.ts
export type Field =
  | { type: "text"; label: string; value?: string }
  | { type: "number"; label: string; value?: number }
  | { type: "date"; label: string; value?: string }
  | { type: "boolean"; label: string; value?: boolean }
