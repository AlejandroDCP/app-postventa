import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import showToastFuncionPura from "../../../../utilitis/showToastFuncionPura";
import {
  slicePostFormdataReportesFallas,
  slicePostMaestro,
} from "../slices/fallasSlice";

interface Reporte {
  descripcion: string;
  imagenes: File[];
  idpvPrereporteFallasMaestro?: number;
}

export const useFallas = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [files, setFiles] = useState<File[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [descripcion, setDescripcion] = useState<string>("");
  const [listaReportes, setListaReportes] = useState<Reporte[]>([]);

  const handleImgToWebp = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const img = new Image();

      // Leer el archivo como una URL de datos
      reader.onload = function (e) {
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        }
      };

      // Cuando la imagen ha sido cargada
      img.onload = function () {
        // Crear un canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Establecer el tamaño del canvas al de la imagen
          canvas.width = img.width;
          canvas.height = img.height;

          // Dibujar la imagen en el canvas
          ctx.drawImage(img, 0, 0);

          // Convertir el contenido del canvas a WebP
          const webpDataURL = canvas.toDataURL("image/webp");

          // Retornar el resultado (Base64 WebP)
          resolve(webpDataURL);
        } else {
          reject(new Error("Contexto del canvas no disponible"));
        }
      };

      // En caso de error en la carga
      img.onerror = function (err) {
        reject(err);
      };

      // Leer el archivo de entrada (debe ser un archivo tipo `File` o `Blob`)
      reader.readAsDataURL(file);
    });
  };

  function base64ToFile(base64String: {
    base64: string;
    name: string;
    mimeType: string;
  }) {
    const byteCharacters = atob(base64String.base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    return new File([blob], base64String.name, { type: base64String.mimeType });
  }

  const handleDeleteReporteFromLista = (index: number) => {
    setListaReportes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResetImage = () => {
    setFiles([]);
  };

  const handleResetFormulario = () => {
    setFiles([]);
    setDescripcion("");
    setLoadingFiles(false);
  };

  const handleResetAll = () => {
    setFiles([]);
    setDescripcion("");
    setListaReportes([]);
    setLoadingFiles(false);
  };

  const functPostReporte = async (handleResetAll: () => void) => {
    if (listaReportes.length === 0) {
      console.log("No hay reportes para enviar");
      return;
    }

    try {
      const getMaestro = {
        descripcion: "nuevo",
      };
      const response = await dispatch(slicePostMaestro(getMaestro)).unwrap();

      if (response.error) {
        showToastFuncionPura("🚨", "Error", response.message);
        return;
      }

      listaReportes.forEach(async (reporte) => {
        // agregamos el reporte el idpvPrereporteFallasMaestro
        reporte.idpvPrereporteFallasMaestro =
          response.data.idpvPrereporteFallasMaestro;

        // creamos el objeto FormData
        const dataFormdata = new FormData();
        dataFormdata.append(
          "idpvPrereporteFallasMaestro",
          reporte.idpvPrereporteFallasMaestro.toString()
        );
        dataFormdata.append("descripcion", reporte.descripcion);
        reporte.imagenes.forEach((imagen) => {
          dataFormdata.append("files", imagen);
        });

        // convertimos el FormData a un objeto
        const formDataObject: Record<string, unknown> = {};
        dataFormdata.forEach((value, key) => {
          formDataObject[key] = value;
        });

        // enviamos el reporte con trycatch
        try {
          const responseReporte = await dispatch(
            slicePostFormdataReportesFallas(formDataObject)
          ).unwrap();

          if (responseReporte.error) {
            showToastFuncionPura("🚨", "Error", responseReporte.message);
            return;
          }
        } catch (error: unknown) {
          const errorMessage = (error as { message: string }).message;
          showToastFuncionPura("🚨", "Error", errorMessage);
        }
      });

      showToastFuncionPura(
        "🎉",
        "Reportes enviados correctamente",
        "Envio exitoso"
      );
      handleResetAll();
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura("🚨", "Error", errorMessage);
    }
  };

  return {
    files,
    setFiles,
    loadingFiles,
    setLoadingFiles,
    descripcion,
    setDescripcion,
    listaReportes,
    setListaReportes,
    handleImgToWebp,
    base64ToFile,
    handleDeleteReporteFromLista,
    handleResetImage,
    handleResetFormulario,
    handleResetAll,
    functPostReporte,
  };
};
