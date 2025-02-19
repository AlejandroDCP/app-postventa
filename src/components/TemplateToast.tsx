import { FC, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface CustomToastProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  toastId: string;
}

const TemplateToast: FC<CustomToastProps> = ({
  icon,
  title,
  subtitle,
  toastId,
}) => {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
      <div className="flex-1 w-0 p-2">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
            {icon}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex border-l">
        <button
          onClick={() => toast.dismiss(toastId)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-black"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TemplateToast;
