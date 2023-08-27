export interface validateFieldsInter {
  field: string;
  value: string;
  minLength?: number | undefined;
  minMessage?: string;
  maxLength?: number | undefined;
  maxMessage?: string;
  required?: boolean | undefined;
}

export interface validateErrors {
  field: string;
  message: string;
}
