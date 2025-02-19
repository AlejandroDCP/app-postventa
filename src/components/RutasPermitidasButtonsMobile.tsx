import React from "react";
import ModuloButton from "./ModuloButton";

interface navigation {
  expandSidebar: boolean;
  verifyRoute: (route: string) => boolean;
  navigate: (route: string) => void;
}

const RutasPermitidasButtonsMobile: React.FC<navigation> = ({
  expandSidebar,
  verifyRoute,
  navigate,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <ModuloButton
        title="Inicio"
        subtitle="Datos personales"
        icon="fas fa-address-card text-black/70 fa-xl pl-5 px-2"
        onClick={() => navigate(`/inicio`)}
        isExpanded={expandSidebar}
        noSubtitle={true}
        noText={true}
      />

      {verifyRoute("/reportes") && (
        <ModuloButton
          title="Fallas"
          subtitle="Reportar detalles"
          icon="fas fa-house-circle-exclamation text-red-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/reportes`)}
          isExpanded={expandSidebar}
          noSubtitle={true}
          noText={true}
        />
      )}
      {verifyRoute("/inquilinos") && (
        <ModuloButton
          title="Inquilinos"
          subtitle="Gestion de inquilinos"
          icon="fas fa-users-gear text-blue-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/inquilinos`)}
          isExpanded={expandSidebar}
          noSubtitle={true}
          noText={true}
        />
      )}
      {verifyRoute("/documentos") && (
        <ModuloButton
          title="Documentacion"
          subtitle="ver Manuales"
          icon="fas fa-folder-open text-black/70 fa-lg pl-5 px-2"
          onClick={() => navigate(`/documentos`)}
          isExpanded={expandSidebar}
          noSubtitle={true}
          noText={true}
        />
      )}
      {verifyRoute("/encuestas") && (
        <ModuloButton
          title="Encuesta"
          subtitle="Calidad del servicio"
          icon="fas fa-heart text-pink-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/encuestas`)}
          isExpanded={expandSidebar}
          noSubtitle={true}
          noText={true}
        />
      )}
    </div>
  );
};

export default RutasPermitidasButtonsMobile;
