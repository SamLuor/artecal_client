import React from "react";
import { Button } from "primereact/button";
import Logo from "../../assets/logos/logo-cinza-azul-artecal.png";
import LogoMobile from "../../assets/logos/logo-mobile.png";
import "./style.css";
import { useAuth } from "../../hooks/Auth";
import { Menu } from "primereact/menu";
import { unmountComponentAtNode } from "react-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ onClickFunction }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const menuUser = React.useRef(null);
  const menuConfig = React.useRef(null);

  const itemsUser = [
    {
      label: "Usuário",
      items: [
        {
          label: user.user,
          icon: "fa-solid fa-user",
          disabled: true,
        },
        {
          label: user.email,
          icon: "fa-solid fa-envelope",
          disabled: true,
        },
      ],
    },
  ];

  const itemsConfig = [
    {
      label: "Logout",
      icon: "fa-solid fa-right-from-bracket",
      command: (e) => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <div className="header-container">
      <div className="header-left">
        <img className="img-mobile" src={LogoMobile} />
        <img className="img-desk" src={Logo} />
        <Button
          rounded
          icon="fa-solid fa-bars"
          className="btn-side-bar"
          onClick={onClickFunction}
        />
      </div>
      <div className="header-right">
        <Button
          rounded
          icon="fa-regular fa-user"
          className="btn-side-bar"
          onClick={(event) => menuUser?.current.toggle(event)}
        />
        <Menu
          className="menu-user"
          model={itemsUser}
          popup
          ref={menuUser}
          id="popup_menu_left"
        />
        <Button
          rounded
          icon="fa-solid fa-gear"
          className="btn-side-bar"
          onClick={(event) => menuConfig?.current.toggle(event)}
        />
        <Menu model={itemsConfig} popup ref={menuConfig} id="popup_menu_left" />
      </div>
    </div>
  );
};

export default Header;
