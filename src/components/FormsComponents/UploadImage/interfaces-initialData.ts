// Initial-Values
const INITIAL_IS_VALID_IMAGE = {
  valid: true,
  message: "",
};

const INITIAL_FILE_DATA = {
  file: "",
  name: "",
  filename: "",
  description: "",
  principal: false,
  _id: "",
  url: ''
};

const initials = {
  INITIAL_IS_VALID_IMAGE,
  INITIAL_FILE_DATA,
};

//interfaces
interface TreatedDataTypes {
  url: string | undefined;
  file: string | object;
  _id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  principal: boolean | undefined;
  filename: string | undefined;
}

interface INITIAL_FILE_DATA_Types {
  url: string | undefined;
  file: string | object;
  _id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  principal: boolean | undefined;
  filename: string | undefined;
}

export { initials };
export type { TreatedDataTypes, INITIAL_FILE_DATA_Types };
