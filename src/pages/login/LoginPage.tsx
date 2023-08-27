/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ContainerAuth } from "../../components/ContainerAuth";
import "./style.css";

import { Navigate, useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { validationFields } from "../../helper";
import { validateErrors } from "../../helper/interface";
import { useAuth } from "../../hooks/Auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const Auth: any = useAuth();

  //INITIAL_STATES
  const INITIAL_STATE_ERROR_VALIDATION = {
    email: "",
    password: "",
  };

  //States
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [errorReq, setErrorReq] = React.useState("");
  const [errorValidation, setErrorValidation] = React.useState(
    INITIAL_STATE_ERROR_VALIDATION
  );

  //Function handler controlled inputs and clean erro field
  const handlerChange = async (
    value: string | boolean | undefined,
    field: string
  ) => {
    setErrorValidation((e) => ({ ...e, [field]: "" }));
    setErrorReq("");

    const treatData = {
      [field]: value,
    };

    setLoginData((e) => ({ ...e, ...treatData }));
  };

  //Function handler validation fields and login
  const Submit = async () => {
    setLoading(true);
    setErrorValidation(INITIAL_STATE_ERROR_VALIDATION);

    const validationConfig = [
      {
        field: "email",
        value: loginData.email,
        minLength: 5,
        required: true,
      },
      {
        field: "password",
        value: loginData.password,
        minLength: 5,
        maxLength: 10,
        required: true,
      },
    ];

    const isValidate = validationFields(validationConfig);

    isValidate.forEach((item: validateErrors) => {
      setErrorValidation((e) => ({ ...e, [item.field]: item.message }));
    });

    if (isValidate.length == 0) {
      const response = await Auth.login(loginData);

      if (response.error) {
        if (response.error.type == "string") {
          setErrorReq(response.error.errorData);
        }
        if (response.error.type == "object") {
          Array.from(response.error.errorData).forEach((item: any) => {
            const [field, message] = item.split(":");

            setErrorValidation((e) => ({ ...e, [field]: message }));
          });
        }
      }
      if (response.success) {
        navigate("/panel/products-page");
      }
    }

    setLoading(false);
  };

  return (
    <>
      {Auth?.user && Auth?.token && (
        <Navigate to="/panel/products-page" replace={true} />
      )}
      <div style={{ backgroundColor: "#EFF3F8" }} className="screen">
        <ContainerAuth>
          <div className={`errorNotification ${errorReq ? "active" : ""}`}>
            Login Invalido
          </div>
          <div className="grid flex-column gap-2 w-full p-inputtext-sm">
            <label htmlFor="username">Email</label>
            <InputText
              id="username"
              value={loginData.email}
              onChange={(event) => handlerChange(event.target.value, "email")}
            />
            {errorValidation.email && (
              <p className="errorValidate">{errorValidation.email}</p>
            )}
          </div>
          <div className="grid flex-column gap-2 w-full p-inputtext-sm">
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              inputClassName="w-full"
              toggleMask
              feedback={false}
              value={loginData.password}
              onChange={(event) =>
                handlerChange(event.target.value, "password")
              }
            />
            {errorValidation.password && (
              <p className="errorValidate">{errorValidation.password}</p>
            )}
          </div>
          <div className="flex gap-2 justify-self-start">
            <Checkbox
              checked={loginData.rememberMe}
              onChange={(event) => handlerChange(event.checked, "rememberMe")}
            />
            <p className="text-gray-600">Mantenha conectado</p>
          </div>
          <div className="flex justify-end w-full">
            <Button
              className="btn-auth"
              label="Entrar"
              severity="info"
              size="small"
              icon="fa-solid fa-right-to-bracket"
              onClick={Submit}
              loading={loading}
            ></Button>
          </div>
        </ContainerAuth>
      </div>
    </>
  );
};
