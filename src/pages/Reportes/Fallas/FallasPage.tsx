import showToastFuncionPura from "../../../utilitis/showToastFuncionPura";
import { useFallas } from "./hooks/useFallas";

const FallasPage = () => {
  const {
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
  } = useFallas();

  return (
    <section className="w-full h-full bg-transparent overflow-auto p-4 sm:p-4 flex flex-col gap-4">
      <div className="flex flex-row text-center lg:text-left mb-2">
        <span className="text-lg text-black font-normal">
          <i className="fas fa-house-circle-exclamation text-red-600 pr-1"></i>
          Reporte de detalles en la vivienda
        </span>
      </div>

      <div id="fallas" className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-base text-black font-medium">
            <i className="fas fa-info-circle text-blue-600 pr-1"></i>
            Descripción del detalle en la vivienda
          </span>
          <textarea
            placeholder="Escriba aquí la descripción del detalle en la vivienda"
            rows={2}
            className="w-full p-2 rounded-lg focus:outline-none focus:border-transparent bg-white/90 shadow-lg shadow-black/10"
            style={{
              width: "100%",
              resize: "none",
            }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base text-black font-medium">
            <i className="fas fa-camera text-blue-600 pr-1"></i>
            Añadir fotografía del detalle en la vivienda
          </span>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={async (e) => {
              try {
                if (!e.target.files) return;
                setLoadingFiles(true);
                const files = Array.from(e.target.files);
                const imagenesPromises = files.map(async (element) => {
                  const img2 = (await handleImgToWebp(element)) as string;

                  const base64 = img2.split(",")[1];
                  const mimeType = "image/webp";
                  const newName = element.name.split(".")[0] + ".webp";

                  return base64ToFile({
                    base64: base64,
                    name: newName,
                    mimeType: mimeType,
                  });
                });
                const imagenes = await Promise.all(imagenesPromises);
                console.log("imagenes: ", imagenes);

                setFiles(imagenes);
                setLoadingFiles(false);
              } catch (error) {
                console.log("error al procesar la imagen: ", error);
                showToastFuncionPura(
                  <i className="fas fa-exclamation-triangle text-red-600"></i>,
                  "Error al procesar la imagen",
                  "Por favor, intente de nuevo o utilice otra imagen"
                );
                setLoadingFiles(false);
              }
            }}
            className="hidden"
          />
          <div className="flex flex-col justify-center w-full bg-white/90 rounded-md px-4 py-4">
            <button
              className="text-black/70 rounded-lg bg-trasnparent w-full py-5 hover:bg-black/10 hover:text-black"
              onClick={() => {
                if (descripcion === "") {
                  showToastFuncionPura(
                    <i className="fas fa-circle-info text-blue-600"></i>,
                    "Escriba la descripción del detalle en la vivienda",
                    "Por favor, complete todos los campos"
                  );
                  console.log("Por favor, complete todos los campos");
                  return;
                }

                const fileInput = document.querySelector(
                  "input[type='file']"
                ) as HTMLInputElement | null;
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              <i className="fas fa-camera"></i>
              <span className="pl-2">
                Arrastra la imagen o Seleccionalo de tu galeria
              </span>
            </button>
            {loadingFiles ? (
              <div className="relative flex flex-row justify-center items-center gap-2 bg-black/70 overflow-auto w-full max-h-[350px] min-h-[350px] rounded-lg">
                <div className="absolute h-11 top-0 left-0 flex flex-row gap-2 w-full p-2 z-50  bg-gradient-to-b from-black via-black/90 to-transparent">
                  <button className="px-[9px] py-1 text-sm bg-black text-white rounded-full hover:ring-2 hover:ring-white">
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                </div>
                <span className="leading-none mt-2 text-lg text-white">
                  Estamos procesando la imagen, por favor espere...
                </span>
              </div>
            ) : (
              files.length > 0 && (
                <div className="relative flex flex-row justify-center gap-2 bg-black/70 overflow-auto w-full max-h-[350px] min-h-[350px] rounded-lg">
                  <div className="absolute top-0 left-0 flex flex-row gap-2 w-full p-2 z-50  bg-gradient-to-b from-black via-black/90 to-transparent">
                    <button
                      className="px-[9px] py-1 text-sm bg-black text-white rounded-full hover:ring-2 hover:ring-white"
                      onClick={() => handleResetImage()}
                    >
                      <i className="fas fa-xmark"></i>
                    </button>
                    <span className="leading-none mt-2 text-sm text-white">
                      {files[0].name}
                    </span>
                  </div>
                  {files.map((file, index) => {
                    return (
                      <div
                        key={index}
                        className="relative flex justify-center items-center"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="imagen"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}

                  {files.length === 0 && (
                    <span className="text-black text-sm">No hay imágenes</span>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
            onClick={() => {
              if (descripcion === "" || files.length === 0) {
                showToastFuncionPura(
                  <i className="fas fa-circle-info text-blue-600"></i>,
                  "Complete todos los campos",
                  "Descripcion o imagen faltante"
                );
                console.log("Por favor, complete todos los campos");
                return;
              }
              setListaReportes((prev) => [
                ...prev,
                {
                  descripcion: descripcion,
                  imagenes: files,
                },
              ]);
              handleResetFormulario();
            }}
          >
            Agregar reporte <i className="fas fa-circle-plus"></i>
          </button>
        </div>
      </div>

      {listaReportes.length > 0 && (
        <div className="flex flex-col gap-2 w-full h-full bg-white/50 p-2 rounded-lg">
          <div id="titulo" className="flex justify-start text-start w-full">
            <span className="text-base text-black font-medium">
              <i className="fas fa-list-check text-blue-600 pr-1"></i>
              Listado de reportes
            </span>
          </div>
          <div id="titulo" className="flex justify-start text-start w-full">
            <button
              className="bg-green-700 hover:bg-green-700 text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
              onClick={() => {
                functPostReporte(handleResetAll);
              }}
            >
              Confirmar envio de {listaReportes.length} reporte(s)
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <table className="table-auto w-full border-collapse bg-white rounded-md">
            <thead className="bg-red-200 text-black text-[12px]">
              <tr>
                <th className="py-2 text-center w-1/12 rounded-tl-md">ID</th>
                <th className="py-1 text-start w-10/12">Descripcion</th>
                <th className="py-1 text-center w-1/12 rounded-tr-md">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px] bg-transparent">
              {listaReportes.map((reporte, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 != 0 ? "bg-red-100" : "bg-transparent"
                  }`}
                >
                  <td className="py-1 text-center">{index + 1}</td>
                  <td className="py-1 text-start">{reporte.descripcion}</td>
                  <td className="py-1 text-center flex justify-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
                      onClick={() => {
                        handleDeleteReporteFromLista(index);
                      }}
                    >
                      <i className="fas fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FallasPage;
