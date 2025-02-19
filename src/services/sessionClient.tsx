import axios from "axios";
import Cookies from "js-cookie";
import showToastFuncionPura from "../utilitis/showToastFuncionPura";

const sessionClient = axios.create({
  baseURL: import.meta.env.VITE_POSTVENTA_APP_API_URL_AUTH as string,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    Accept: "*/*",
  },
});

sessionClient.interceptors.request.use(
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

sessionClient.interceptors.response.use(
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

    // Manejo de otros errores
    // handleAxiosError(error);
    return Promise.reject(error);
  }
);

export async function getRequest<T>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<{ data: T; error: boolean; message: string }> {
  try {
    // Extraemos `data` del objeto `AxiosResponse`
    const { data } = await sessionClient.get(url, { params });
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
    const { data } = await sessionClient.post(url, payload);
    return data; // Devuelve `{ data, error, message }`
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
        message || "Error desconocido del servidor",
        "Error en el servidor"
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
        error.message || "Error desconocido",
        "Error desconocido"
      );
      console.error("Error desconocido:", error);
    }
  } else {
    console.error("Error no identificado:", error);
  }
}

export default sessionClient;
