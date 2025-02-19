import { AxiosError } from "axios";
import createAppAsyncThunk from "../../../../slices/createAppAsyncThunk";
import {
  postRequest,
  getRequest,
  putRequest,
} from "../../../../services/axiosClient";

interface CreateInquilino {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
}

interface Inquilino {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  nombreUsuario: string;
  idUsuariosExternos: number;
  activo: number;
}

interface GetInquilinos {
  inquilinosActivos: Inquilino[];
  inquilinosInactivos: Inquilino[];
}

export const sliceGetInquilinos = createAppAsyncThunk<{
  data: GetInquilinos;
  error: boolean;
  message: string;
}>("inquilinos/GET_INQUILINOS", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequest<GetInquilinos>(
      "inquilinos/E/gestionInquilinos"
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

export const slicePutInquilino = createAppAsyncThunk<
  {
    data: Inquilino;
    error: boolean;
    message: string;
  },
  Inquilino // Aquí cambiamos el tipo para aceptar directamente un Inquilino
>("fallas/PUT_INQUILINO", async (data, { rejectWithValue }) => {
  try {
    const response = await putRequest<Inquilino>(
      `inquilinos/E/gestionInquilinos/${data.idUsuariosExternos}`,
      { ...data }
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

export const slicePostInquilinos = createAppAsyncThunk<
  {
    data: CreateInquilino;
    error: boolean;
    message: string;
  },
  Record<string, unknown>
>("fallas/POST_INQUILINO", async (data, { rejectWithValue }) => {
  try {
    const response = await postRequest<CreateInquilino>(
      `inquilinos/E/gestionInquilinos`,
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
