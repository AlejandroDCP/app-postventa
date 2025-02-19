import { AxiosError } from "axios";
import createAppAsyncThunk from "../../../../slices/createAppAsyncThunk";
import { getRequest } from "../../../../services/axiosClient";

interface Documento {
  idpvDocumentosPropietarios: number;
  nombreArchivo: string;
  fkIdcatTipoDocumento: number;
  idUsuarioExterno: number;
  tipoDocumento: string;
}

interface DocumentoByID {
  idpvDocumentosPropietarios: number;
  nombreArchivo: string;
  mimetype: string;
  rutaArchivo: string;
  fkIdcatTipoDocumento: number;
  idUsuarioExterno: number;
  tipoDocumento: string;
  base64: string;
}

export const sliceGetDocumentos = createAppAsyncThunk<{
  data: Documento[];
  error: boolean;
  message: string;
}>("manuales/GET_DOCUMENTOS", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequest<Documento[]>(
      "documentos/E/misDocumentos"
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

export const sliceGetDocumentByID = createAppAsyncThunk<
  {
    data: DocumentoByID;
    error: boolean;
    message: string;
  },
  number
>("manuales/GET_DOCUMENTOS", async (id, { rejectWithValue }) => {
  try {
    const response = await getRequest<DocumentoByID>(
      `documentos/E/misDocumentos/${id}`
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
