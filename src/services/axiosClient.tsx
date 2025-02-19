import axios from "axios";
import Cookies from "js-cookie";
import showToastFuncionPura from "../utilitis/showToastFuncionPura";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_POSTVENTA_APP_API as string,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    Accept: "*/*",
  },
});

// Interceptores
axiosClient.interceptors.request.use(
  (request) => {
    const token = Cookies.get(
      import.meta.env.VITE_POSTVENTA_APP_NAME_TOKEN as string
    );
    if (token) {
      if (request.headers) {
        request.headers.Authorization = `Bearer ${token}`; // Asignamos directamente al header
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    // Validamos y transformamos el contenido de `response.data` si es necesario
    if (!response.data || typeof response.data !== "object") {
      response.data = {
        data: null,
        error: true,
        message: "Respuesta no estructurada correctamente",
      };
    }

    return response; // Devolvemos el `AxiosResponse` completo
  },
  (error) => {
    // Manejo de errores de red
    if (
      !error.response &&
      error.message?.toLowerCase().includes("network error")
    ) {
      showToastFuncionPura(
        "🌐",
        "Error de conexión",
        "Verifique su conexión a internet"
      );
    }

    // Manejo de errores de autenticación (401)
    if (error.response?.status === 401) {
      localStorage.clear();
      Cookies.remove(import.meta.env.VITE_POSTVENTA_APP_NAME_TOKEN as string);

      showToastFuncionPura(
        "🔒",
        "Sesión expirada",
        "Redirigiendo a la página de inicio de sesión"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }

    // Manejo de otros errores
    // handleAxiosError(error);

    return Promise.reject(error);
  }
);

// Funciones
export async function getRequest<T>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    // Extraemos `data` del objeto `AxiosResponse`
    const { data } = await axiosClient.get(url, { params });
    return data; // Devuelve `{ data, error, message }`
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function postRequest<T>(
  url: string,
  payload: Record<string, unknown>
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    // Extraemos `data` del objeto `AxiosResponse`
    const { data } = await axiosClient.post(url, payload);
    return data; // Devuelve `{ data, error, message }`
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function putRequest<T>(
  url: string,
  payload: Record<string, unknown>
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    // Extraemos `data` del objeto `AxiosResponse`
    const { data } = await axiosClient.put(url, payload);
    return data; // Devuelve `{ data, error, message }`
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function deleteRequest<T>(
  url: string
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    // Extraemos `data` del objeto `AxiosResponse`
    const { data } = await axiosClient.delete(url);
    return data; // Devuelve `{ data, error, message }`
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function postFormData<T>(
  url: string,
  payload: Record<string, unknown>
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    const { data } = await axiosClient.post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Error con respuesta del servidor
      const { message, error: errorFlag } = error.response.data || {};
      showToastFuncionPura(
        "🚨",
        "Error del servidor",
        message || "Error desconocido del servidor"
      );
      console.error("Error de respuesta:", errorFlag, message);
    } else if (error.request) {
      // Error sin respuesta del servidor
      showToastFuncionPura(
        "🚨",
        error?.message,
        "No se recibió respuesta del servidor"
      );
      console.error("Error de solicitud:", error.request);
    } else {
      // Otro tipo de error
      showToastFuncionPura(
        "🚨",
        "Error desconocido",
        error.message || "Error desconocido"
      );
      console.error("Error desconocido:", error);
    }
  } else {
    console.error("Error no identificado:", error);
  }
}

export default axiosClient;
