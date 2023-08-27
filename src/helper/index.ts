/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateFieldsInter, validateErrors } from "./interface";

export function validationFields(dataValidate: validateFieldsInter[]) {
  const errors: validateErrors[] = [];

  dataValidate.forEach((item: validateFieldsInter) => {
    if (
      (item?.required && item?.value?.length == 0) ||
      (item?.required && typeof item?.value == "undefined")
    ) {
      errors.push({
        field: item.field,
        message: `Campo obrigatório`,
      });
      return;
    }
    if (item?.minLength && item.value.length < item.minLength) {
      errors.push({
        field: item.field,
        message: item.minMessage || `Mínimo ${item.minLength} caracteres`,
      });
      return;
    }
    if (item?.maxLength && item.value.length > item?.maxLength) {
      errors.push({
        field: item.field,
        message: item.maxMessage || `Máximo ${item.maxLength} caracteres`,
      });
      return;
    }
  });

  return errors;
}

export function cleanErrorField(state: any, setState: any, field: any) {
  const stateClone = { ...state };
  delete stateClone[field];

  setState(stateClone);
  return null;
}

export function toastShowLoading(refToast?: any) {
  refToast?.current.clear();
  refToast?.current.show({
    severity: "info",
    summary: "Atualizando...",
    detail: "Dados estão sendo salvos",
    life: 2000,
  });
}

export function toastShowRequest(
  status?: number,
  message?: string,
  refToast?: any
) {
  if (status !== 200 && status !== 201) {
    refToast?.current.clear();
    refToast?.current.show({
      severity: "error",
      summary: "Não foi possível salvar",
      detail: message,
      life: 2000,
    });
  } else {
    refToast?.current.clear();
    refToast?.current.show({
      severity: "success",
      summary: "Salvo com sucesso!",
      detail: "Os dados foram salvos!",
      life: 2000,
    });
  }
}

export function cleanLocalStorageLogin() {
  localStorage.removeItem("artecal:user");
  localStorage.removeItem("artecal:token");
}

export function insertLocalStorageLogin(user, token) {
  localStorage.setItem("artecal:user", JSON.stringify(user));
  localStorage.setItem("artecal:token", JSON.stringify(token));
}
