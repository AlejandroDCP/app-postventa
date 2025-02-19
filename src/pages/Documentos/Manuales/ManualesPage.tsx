import { useCallback, useEffect } from "react";
import { useManuales } from "./hooks/useManuales";
import { motion } from "framer-motion";

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

const ManualesPage = () => {
  const {
    loadingDocumentos,
    documentos,
    functionToGetDocumentos,

    loadingDownload,
    functionToGetById,
  } = useManuales();

  useEffect(() => {
    functionToGetDocumentos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const downloadFile = useCallback((file: DocumentoByID) => {
    const element = document.createElement("a");
    const fileData = file.base64;
    const fileName = file.nombreArchivo;
    const fileType = file.mimetype;

    const fileURL = `data:${fileType};base64,${fileData}`;
    element.href = fileURL;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();

    setTimeout(() => {
      document.body.removeChild(element);
    }, 100);

    return;
  }, []);

  return (
    <section className="w-full h-full bg-transparent overflow-auto p-4 sm:p-4 flex flex-col gap-4">
      <div className="flex flex-row text-center lg:text-left mb-2">
        <span className="text-lg text-black font-normal">
          <i className="fas fa-folder-open text-black/70 pr-1"></i>
          Manuales de usuario
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-base text-black font-medium flex flex-row items-center">
          <i className="fas fa-circle text-blue-600/70 pr-1 text-[8px]"></i>
          Manuales disponibles
        </span>

        {loadingDocumentos ? (
          <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
            <i className="fas fa-spinner fa-spin text-blue-600 text-4xl"></i>
            <span className="text-base text-black font-medium">
              Cargando manuales...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documentos.map((documento, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, delay: index * 0.1 }}
                key={documento.idpvDocumentosPropietarios}
                className="flex flex-col px-2 py-4 rounded-lg bg-white/50 shadow-xl shadow-black/10"
              >
                <div className="flex flex-row items-start justify-between">
                  <span className="text-xs text-black/70 font-normal">
                    #{documento.idpvDocumentosPropietarios}
                  </span>
                  <div className="flex flex-row items-center justify-center gap-2 col-span-2 md:col-span-4 lg:col-span-1">
                    <button
                      className="bg-green-700/90 hover:bg-green-700 text-white flex flex-row items-center justify-center text-xs gap-2 rounded-lg px-3 py-2"
                      onClick={async () => {
                        const response = await functionToGetById(
                          documento.idpvDocumentosPropietarios
                        );
                        if (response) downloadFile(response);
                      }}
                      disabled={loadingDownload}
                    >
                      Descargar archivo
                      <i className="fas fa-angles-down"> </i>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start my-2 gap-2">
                  <i className="fas fa-book text-black/50 text-sm"></i>
                  <span className="text-sm text-black font-medium">
                    {documento.nombreArchivo}
                  </span>
                </div>
                <span className="text-xs text-black/50 font-medium text-center">
                  {documento.tipoDocumento}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManualesPage;
