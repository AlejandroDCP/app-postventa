import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  sliceGetDocumentByID,
  sliceGetDocumentos,
} from "../slices/manualesSlice";
import showToastFuncionPura from "../../../../utilitis/showToastFuncionPura";

interface Documentos {
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

export const useManuales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [documentos, setDocumentos] = useState<Documentos[]>([]);
  const [loadingDocumentos, setLoadingDocumentos] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const functionToGetDocumentos = async () => {
    try {
      setLoadingDocumentos(true);
      const response = await dispatch(sliceGetDocumentos()).unwrap();
      const { data, message, error } = response;

      if (error) {
        console.log("message: ", message);
        showToastFuncionPura(
          <i className="fas fa-exclamation-triangle text-red-600"></i>,
          message,
          "Error al obtener los manuales"
        );
        setLoadingDocumentos(false);
        return;
      }

      setDocumentos(data);
      setLoadingDocumentos(false);
    } catch (error: unknown) {
      setDocumentos([]);
      setLoadingDocumentos(false);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-triangle text-red-600"></i>,
        errorMessage,
        "Error al obtener los manuales"
      );
      console.log("errorMessage: ", errorMessage);
    }
  };

  const functionToGetById = useCallback(
    async (id: number): Promise<DocumentoByID | null> => {
      try {
        setLoadingDownload(true);
        const response = await dispatch(sliceGetDocumentByID(id)).unwrap();
        const { data, message, error } = response;

        if (error) {
          console.log("message: ", message);
          showToastFuncionPura(
            <i className="fas fa-exclamation-triangle text-red-600"></i>,
            message,
            "Error al obtener el manual"
          );
          setLoadingDownload(false);
          return null;
        }

        showToastFuncionPura(
          <i className="fas fa-check-circle text-green-600"></i>,
          "Descarga exitosa",
          message
        );
        setLoadingDownload(false);
        return data;
      } catch (error: unknown) {
        setLoadingDownload(false);
        const errorMessage = (error as { message: string }).message;
        showToastFuncionPura(
          <i className="fas fa-exclamation-triangle text-red-600"></i>,
          errorMessage,
          "Error al obtener el manual"
        );
        console.log("errorMessage: ", errorMessage);
        return null;
      }
    },
    [dispatch]
  );

  return {
    loadingDocumentos,
    documentos,
    functionToGetDocumentos,

    loadingDownload,
    functionToGetById,
  };
};
