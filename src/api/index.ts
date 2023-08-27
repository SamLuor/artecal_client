import axios from "axios";
import { cleanLocalStorageLogin } from "../helper";

const instanceAxiosLocal = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instanceAxiosLocal.interceptors.request.use((config) => {
  // Obtenha o token de autorização do local desejado
  const token: string | null = JSON.parse(
    localStorage.getItem("artecal:token")
  );

  // Verifique se o token está disponível e, em seguida, adicione-o aos cabeçalhos
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instanceAxiosLocal.interceptors.response.use(
  function (response) {
    // Faça algo com a resposta de sucesso
    return response;
  },
  function (error) {
    if (error.response.data.name == "TokenExpiredError") {
      window.location.assign("/login");
      cleanLocalStorageLogin();
    }
    // Faça algo com a resposta de erro
    return Promise.reject(error);
  }
);

async function postMethodJSON(url: string, data: unknown) {
  try {
    const response = await instanceAxiosLocal.post(url, data);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function postImageMethodForm(url: string, data: any, field?: string) {
  try {
    const bodyForm = new FormData();
    if (field) {
      bodyForm.append("image", data[field].file);
      bodyForm.append("name", data[field].name);
      bodyForm.append("description", data[field].description);
      bodyForm.append("principal", data[field].principal);
    } else {
      bodyForm.append("image", data.file);
      bodyForm.append("name", data.name);
      bodyForm.append("description", data.description);
      bodyForm.append("principal", data.principal);
    }
    const response = await instanceAxiosLocal.postForm(url, bodyForm);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error: any) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function putMethodJSON(url: string, data: unknown) {
  try {
    const response = await instanceAxiosLocal.patch(url, data);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function getPage(url: string) {
  try {
    const response = await instanceAxiosLocal.get(url);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function uploadImages(data: []) {
  try {
    const imageResponse: [] | any = [];
    data.forEach(async (image) => {
      await instanceAxiosLocal
        .postForm("/images-upload", image)
        .then((response: any) => {
          imageResponse.push(response);
        });
    });

    return {
      //status,
      imageResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function uploadImage(data: any) {
  try {
    const response = await instanceAxiosLocal.postForm("/images-upload", data);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

async function deleteImage(id) {
  try {
    const response = await instanceAxiosLocal.delete("/images-upload/" + id);

    const { status, data: dataResponse } = response;

    return {
      status,
      dataResponse,
    };
  } catch (error) {
    const errorData = error?.response.data;
    const status = error?.response.status;

    return {
      status,
      errorData,
    };
  }
}

export {
  postMethodJSON,
  putMethodJSON,
  getPage,
  postImageMethodForm,
  uploadImages,
  uploadImage,
  deleteImage,
};
