import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  title: string;
  subtitle: string;
  icon: string; // Clase del ícono (por ejemplo, "fas fa-bars")
  onClick: () => void;
  isExpanded?: boolean; // Controla si se muestra el subtítulo o no
  noSubtitle: boolean; // Controla si se muestra el subtítulo o no
  noText: boolean; // Controla si se muestra el texto o no
}

const SidebarButton: React.FC<ButtonProps> = ({
  title,
  subtitle,
  icon,
  onClick,
  isExpanded,
  noSubtitle,
  noText,
}) => {
  return (
    <button
      className={`w-full min-w-12 h-12 rounded-lg flex items-center ${
        noText ? "justify-center" : " justify-start"
      }`}
      onClick={onClick}
    >
      <i className={icon}></i>
      <motion.div
        className={`flex flex-col items-start h-12 overflow-hidden ${
          noSubtitle ? "justify-center" : "justify-center"
        }`}
        style={{ display: isExpanded ? "flex" : "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        {!noText && (
          <>
            <span className="leading-5 text-ellipsis overflow-hidden whitespace-nowrap text-[16px] font-normal">
              {title}
            </span>
            {!noSubtitle && (
              <span className="leading-5 text-ellipsis overflow-hidden whitespace-nowrap text-black/60 text-[14px]">
                {subtitle}
              </span>
            )}
          </>
        )}
      </motion.div>
    </button>
  );
};

export default SidebarButton;
