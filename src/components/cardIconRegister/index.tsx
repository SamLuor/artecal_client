/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputText } from "primereact/inputtext";
import React from "react";

import "./style.css";

import { cleanErrorField } from "../../helper";

const CardIconRegister = ({
  functionChangeCard,
  index,
  data,
  stateError,
  setStateError,
}: any) => {
  const [dataCard, setDataCard] = React.useState(data);

  const handleCard = (value: string, field: string) => {
    setDataCard(() => ({ ...data, [field]: value }));
  };

  React.useEffect(() => {
    functionChangeCard(dataCard, index);
  }, [dataCard]);

  return (
    <div className="container-register-cardIcon">
      <div>
        <InputText
          name={`card-icon-${index}`}
          value={data.icon}
          className={`p-inputtext-sm w-full ${
            stateError[`card-icon-${index}`] ? "p-invalid" : ""
          }`}
          placeholder="Digite o nome do icone"
          onClick={(e) =>
            cleanErrorField(stateError, setStateError, e.currentTarget.name)
          }
          onChange={(event) => handleCard(event.target.value, "icon")}
        />
        {stateError[`card-icon-${index}`] && (
          <p className="errorValidate">{stateError[`card-icon-${index}`]}</p>
        )}
      </div>
      <div>
        <InputText
          name={`card-title-${index}`}
          value={data.title}
          className={`p-inputtext-sm w-full ${
            stateError[`card-title-${index}`] ? "p-invalid" : ""
          }`}
          placeholder="O Titulo do card"
          onClick={(e) =>
            cleanErrorField(stateError, setStateError, e.currentTarget.name)
          }
          onChange={(event) => handleCard(event.target.value, "title")}
          maxLength={28}
        />
        {stateError[`card-title-${index}`] && (
          <p className="errorValidate">{stateError[`card-title-${index}`]}</p>
        )}
      </div>
      <div>
        <InputText
          name={`card-description-${index}`}
          value={data.description}
          className={`p-inputtext-sm w-full ${
            stateError[`card-description-${index}`] ? "p-invalid" : ""
          }`}
          placeholder="Breve descrição card"
          onClick={(e) =>
            cleanErrorField(stateError, setStateError, e.currentTarget.name)
          }
          onChange={(event) => handleCard(event.target.value, "description")}
          maxLength={82}
        />
        {stateError[`card-description-${index}`] && (
          <p className="errorValidate">
            {stateError[`card-description-${index}`]}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardIconRegister;
