import React from "react";
import ModuloButton from "./ModuloButton";

interface navigation {
  expandSidebar: boolean;
  verifyRoute: (route: string) => boolean;
  navigate: (route: string) => void;
  nombreUsuario: string;
}

const RutasPermitidasButtons: React.FC<navigation> = ({
  expandSidebar,
  verifyRoute,
  navigate,
  nombreUsuario,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <ModuloButton
        title={nombreUsuario || "Inicio"}
        subtitle="Datos personales"
        icon="fas fa-address-card text-black/70 fa-xl pl-5 px-2"
        onClick={() => navigate(`/inicio`)}
        isExpanded={expandSidebar}
        noSubtitle={false}
        noText={false}
      />
      {verifyRoute("/usuarios") && (
        <ModuloButton
          title="Usuarios"
          subtitle="ver Detalles"
          icon="fas fa-users text-green-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/usuarios`)}
          isExpanded={expandSidebar}
          noSubtitle={false}
          noText={false}
        />
      )}
      {verifyRoute("/reportes") && (
        <ModuloButton
          title="Fallas"
          subtitle="Reportar detalles"
          icon="fas fa-house-circle-exclamation text-red-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/reportes`)}
          isExpanded={expandSidebar}
          noSubtitle={false}
          noText={false}
        />
      )}
      {verifyRoute("/inquilinos") && (
        <ModuloButton
          title="Inquilinos"
          subtitle="Gestion de inquilinos"
          icon="fas fa-users-gear text-blue-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/inquilinos`)}
          isExpanded={expandSidebar}
          noSubtitle={false}
          noText={false}
        />
      )}
      {verifyRoute("/documentos") && (
        <ModuloButton
          title="Documentacion"
          subtitle="Ver manuales"
          icon="fas fa-folder-open text-black/70 fa-lg pl-5 px-2"
          onClick={() => navigate(`/documentos`)}
          isExpanded={expandSidebar}
          noSubtitle={false}
          noText={false}
        />
      )}
      {verifyRoute("/encuestas") && (
        <ModuloButton
          title="Encuesta"
          subtitle="Calidad del servicio"
          icon="fas fa-heart text-pink-600 fa-lg pl-5 px-2"
          onClick={() => navigate(`/encuestas`)}
          isExpanded={expandSidebar}
          noSubtitle={false}
          noText={false}
        />
      )}
    </div>
  );
};

export default RutasPermitidasButtons;
