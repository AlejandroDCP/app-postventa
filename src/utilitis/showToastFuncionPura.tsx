import { toast } from "react-hot-toast";
import { ReactNode } from "react";
import TemplateToast from "../components/TemplateToast";

const showToastFuncionPura = (
  icon: ReactNode,
  title: string,
  subtitle?: string
) => {
  toast.custom((t) => (
    <TemplateToast
      icon={icon}
      title={title}
      subtitle={subtitle}
      toastId={t.id}
    />
  ));
};

export default showToastFuncionPura;
