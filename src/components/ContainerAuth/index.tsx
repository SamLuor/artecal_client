import "./style.css";

import LogoArtecal from "../../assets/logos/logo-cinza-azul-artecal.png";

export const ContainerAuth = ({ children }) => {
  return (
    <div className="div-border-container-auth">
      <div className="container-auth">
        <img className="logo" src={LogoArtecal} alt="Logo Artecal" />
        <div className="container-children">{children}</div>
      </div>
    </div>
  );
};
