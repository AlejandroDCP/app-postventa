import { AxiosError } from "axios";
import createAppAsyncThunk from "../../../../slices/createAppAsyncThunk";
import { getRequest, postRequest } from "../../../../services/axiosClient";

interface EncuestasInterface {
  idcatEncuestaMaestro: number;
  nombreEncuesta: string;
  preguntas: number;
  respondido: number;
  respuestas: number;
}

interface PreguntasInterface {
  categoria: string;
  concepto: string;
  idCategoria: number;
  idConcepto: number;
  idcatEncuestaMaestro: number;
}

interface RespuestasInterface {
  idcatRespuestasEncuestas: number;
  respuesta: string;
}

interface CalificacionInterface {
  idConcepto: number;
  idcatRespuestasEncuestas: number;
}

export const sliceGetEncuestas = createAppAsyncThunk<{
  data: EncuestasInterface[];
  error: boolean;
  message: string;
}>("encuestas/GET_ENCUESTAS", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequest<EncuestasInterface[]>(
      "encuestas/E/misEncuestas"
    );

    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});

export const sliceGetPreguntasByID = createAppAsyncThunk<
  {
    data: PreguntasInterface[];
    error: boolean;
    message: string;
  },
  number
>("encuestas/GET_PREGUNTAS_BY_ID", async (id, { rejectWithValue }) => {
  try {
    const response = await getRequest<PreguntasInterface[]>(
      `encuestas/E/misEncuestas/${id}`
    );

    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});

export const sliceGetDropdownsRespuestas = createAppAsyncThunk<{
  data: RespuestasInterface[];
  error: boolean;
  message: string;
}>("encuestas/GET_DROPDOWNS_RESPUESTAS", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequest<RespuestasInterface[]>(
      "dropdowns/E/respuestasEncuestas"
    );

    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});

export const slicePostEncuestas = createAppAsyncThunk<
  {
    data: CalificacionInterface;
    error: boolean;
    message: string;
  },
  Record<string, unknown>
>("fallas/POST_INQUILINO", async (data, { rejectWithValue }) => {
  try {
    const response = await postRequest<CalificacionInterface>(
      `encuestas/E/misEncuestas`,
      data
    );

    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});
