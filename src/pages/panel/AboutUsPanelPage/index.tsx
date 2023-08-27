import React from "react";
import "./style.css";

import * as api from "../../../api";
import ToastSingleton from "../../../singletons/toast";
import {
  toastShowLoading,
  toastShowRequest,
  validationFields,
} from "../../../helper";
import { OutletContext } from "../../../Contexts/layoutContext";
import { initials } from "./interfaces-initialData";

import * as Container from "../../../components/Containers";
import { InputText } from "../../../components/FormInputs";
import UploadImage from "../../../components/FormsComponents/UploadImage";
import CardIconRegister from "../../../components/cardIconRegister";
import ViewAboutUsPage from "../../../components/frames/ViewAboutUsPage";

const AboutUsPanelPage = () => {
  const states = React.useContext(OutletContext);
  const toast = ToastSingleton.toastRef;

  const [dataPage, setDataPage] = React.useState({});
  const [dataPageErrors, setDataPageErrors] = React.useState({});
  const [imagesDelete, setImagesDelete] = React.useState([]);

  //Handle Files Upload
  const handleAddFile = (
    file: object,
    fieldObject: string,
    type?: string,
    index?: number
  ) => {
    if (type == "other") {
      setDataPage((prev) => {
        prev[fieldObject][index] = file;
        return { ...prev };
      });
    } else {
      setDataPage((e) => {
        return { ...e, [fieldObject]: file };
      });
    }
  };

  const handleDelFile = React.useCallback(
    (
      INITIAL_DATA: object,
      fieldObject: string,
      type: string,
      index?: number
    ) => {
      if (type == "background")
        setDataPage((e) => ({ ...e, [fieldObject]: INITIAL_DATA }));
      else
        setDataPage((e) => {
          e[fieldObject]?.splice(index, 1);

          return { ...e };
        });
    },
    []
  );

  const handleUpdateCardPolicies = React.useCallback(
    (data: any, index: number) => {
      setDataPage((e) => {
        const cardsUpdated = [...e.quality_policies_cards];
        cardsUpdated[index] = data;
        return { ...e, quality_policies_cards: cardsUpdated };
      });
    },
    []
  );
  const handleSubmit = React.useCallback(async () => {
    const templateValidation = [
      {
        field: "home_background_img",
        value: dataPage.home_background_img,
        required: true,
      },
      {
        field: "home_title",
        value: dataPage.home_title,
        minLength: 4,
        maxLength: 66,
        required: true,
      },
      {
        field: "home_img_video",
        value: dataPage.home_img_video,
        minLength: 4,
        required: true,
      },
      {
        field: "home_link_video",
        value: dataPage.home_link_video,
        minLength: 4,
        required: true,
      },
      {
        field: "home_link_video",
        value: dataPage.home_link_video,
        minLength: 4,
        required: true,
      },
      {
        field: "home_description",
        value: dataPage.home_description,
        minLength: 4,
        required: true,
      },
      {
        field: "quality_policies_section",
        value: dataPage.quality_policies_section,
        minLength: 4,
        required: true,
      },
      {
        field: "quality_policies_title",
        value: dataPage.quality_policies_title,
        minLength: 4,
        required: true,
      },
      {
        field: "quality_policies_center_word",
        value: dataPage.quality_policies_center_word,
        minLength: 4,
        required: true,
      },
      {
        field: "card-icon-0",
        value: dataPage.quality_policies_cards[0].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-0",
        value: dataPage.quality_policies_cards[0].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-0",
        value: dataPage.quality_policies_cards[0].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-1",
        value: dataPage.quality_policies_cards[1].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-1",
        value: dataPage.quality_policies_cards[1].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-1",
        value: dataPage.quality_policies_cards[1].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-2",
        value: dataPage.quality_policies_cards[2].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-2",
        value: dataPage.quality_policies_cards[2].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-2",
        value: dataPage.quality_policies_cards[2].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-3",
        value: dataPage.quality_policies_cards[3].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-3",
        value: dataPage.quality_policies_cards[3].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-3",
        value: dataPage.quality_policies_cards[3].description,
        minLength: 10,
        required: true,
      },
      {
        field: "company_values_section",
        value: dataPage.company_values_section,
        minLength: 4,
        required: true,
      },
      {
        field: "company_values_title",
        value: dataPage.company_values_title,
        minLength: 4,
        required: true,
      },
    ];

    const errors = validationFields(templateValidation);

    const body = {
      home: {
        title: dataPage.home_title,
        background_img: dataPage.home_background_img._id,
        img_video: dataPage.home_img_video._id,
        link_video: dataPage.home_link_video,
        description: dataPage.home_description,
      },
      quality_policies: {
        section: dataPage.quality_policies_section,
        title: dataPage.quality_policies_title,
        center_word: dataPage.quality_policies_center_word,
        cards: dataPage.quality_policies_cards,
      },
      company_values: {
        section: dataPage.company_values_section,
        title: dataPage.company_values_title,
      },
    };

    if (errors.length > 0) {
      errors.forEach((item) => {
        setDataPageErrors((previousState) => ({
          ...previousState,
          [item.field]: item.message,
        }));
      });
    } else {
      toastShowLoading(toast);

      ["home_background_img", "home_img_video"].forEach(
        async (item: string) => {
          if (dataPage[item]._id.length == 0 && dataPage[item].file) {
            const responseIMG = await api.postImageMethodForm(
              "images-upload",
              dataPage,
              item
            );
            if (item == "home_background_img") {
              body.home.background_img = responseIMG.dataResponse._id;
            } else {
              body.home.img_video = responseIMG.dataResponse._id;
            }
          }
        }
      );

      const response = await api.putMethodJSON(
        "/about-us-page/" + dataPage._id,
        body
      );

      toastShowRequest(
        response.status,
        response?.errorData?.message || "",
        toast
      );
    }
  }, [dataPage]);
  //Function handle receive data
  const treatData = React.useCallback((data: any) => {
    const treatedData = {
      home_title: data.home.title,
      home_background_img: {
        ...data?.home?.background_img,
        url:
          process.env.REACT_APP_API_URL + "/" + data?.home?.background_img?.url,
      },
      home_img_video: {
        ...data?.home?.img_video,
        url: process.env.REACT_APP_API_URL + "/" + data?.home?.img_video?.url,
      },
      home_link_video: data.home.link_video,
      home_description: data.home.description,
      quality_policies_section: data.quality_policies.section,
      quality_policies_title: data.quality_policies.title,
      quality_policies_center_word: data.quality_policies.center_word,
      quality_policies_cards: data.quality_policies.cards,
      company_values_section: data.company_values.section,
      company_values_title: data.company_values.title,
      _id: data._id,
    };

    return treatedData;
  }, []);

  const loadData = React.useCallback(async () => {
    const response = await api.getPage("about-us-page");
    const treatedData = treatData(response.dataResponse);

    setDataPage(treatedData);
  }, []);

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container.LayoutRegisterPage>
        <Container.ColInputsRegisterPage>
          <h2 className="text-slate-800 font-semibold">Home</h2>
          <div className="p-2 grid gap-2">
            <div>
              <p className="text-label">Background Image</p>
              <UploadImage
                file={dataPage?.home_background_img}
                handleAddFile={handleAddFile}
                handleDelFile={handleDelFile}
                setImagesDelete={setImagesDelete}
                type="background"
                fieldObject="home_background_img"
              />
            </div>
            <InputText
              label="Titulo"
              field="home_title"
              placeholder="Digite o nome do titulo da página"
              value={dataPage.home_title || ""}
              setValue={setDataPage}
              error={dataPageErrors.home_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <div>
              <p className="text-label">Imagem do Video</p>
              <UploadImage
                file={dataPage?.home_img_video}
                handleAddFile={handleAddFile}
                handleDelFile={handleDelFile}
                setImagesDelete={setImagesDelete}
                type="background"
                fieldObject="home_img_video"
              />
            </div>
            <InputText
              label="Link do Video"
              field="home_link_video"
              placeholder="Digite o link do video da página"
              value={dataPage.home_link_video || ""}
              setValue={setDataPage}
              error={dataPageErrors.home_link_video}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Descrição"
              field="home_description"
              placeholder="Digite a descrição da sessão da página"
              value={dataPage.home_description || ""}
              setValue={setDataPage}
              error={dataPageErrors.home_description}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
          </div>
          <h2 className="text-slate-800 font-semibold">
            Politicas de Qualidade
          </h2>
          <div className="p-2">
            <InputText
              label="Seção"
              field="quality_policies_section"
              placeholder="Digite o nome do seção da página"
              value={dataPage.quality_policies_section || ""}
              setValue={setDataPage}
              error={dataPageErrors.quality_policies_section}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Titulo"
              field="quality_policies_title"
              placeholder="Digite o nome do titulo da página"
              value={dataPage.quality_policies_title || ""}
              setValue={setDataPage}
              error={dataPageErrors.quality_policies_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Palavra central"
              field="quality_policies_center_word"
              placeholder="Digite o nome do titulo da página"
              value={dataPage.quality_policies_center_word || ""}
              setValue={setDataPage}
              error={dataPageErrors.quality_policies_center_word}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            {Array.isArray(dataPage.quality_policies_cards) &&
              dataPage.quality_policies_cards.map((item, index) => {
                return (
                  <div
                    className="grid mt-2"
                    key={index.toString().concat("-card-register-policies")}
                  >
                    <p className="text-label">Card {index}</p>
                    <CardIconRegister
                      functionChangeCard={handleUpdateCardPolicies}
                      stateError={dataPageErrors}
                      setStateError={setDataPageErrors}
                      index={index}
                      data={item}
                    />
                  </div>
                );
              })}
          </div>
          <h2 className="text-slate-800 font-semibold">Valores</h2>
          <div className="p-2">
            <InputText
              label="Seção"
              field="company_values_section"
              placeholder="Digite o nome do seção da página"
              value={dataPage.company_values_section || ""}
              setValue={setDataPage}
              error={dataPageErrors.company_values_section}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Titulo"
              field="company_values_title"
              placeholder="Digite o nome do titulo da página"
              value={dataPage.company_values_title || ""}
              setValue={setDataPage}
              error={dataPageErrors.company_values_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
          </div>
          <Container.SaveForm
            setDataPage={setDataPage}
            handleSubmit={handleSubmit}
            INITIAL_DATA_PAGE={initials.INITIAL_DATA_PAGE}
            disableButton={false}
          />
        </Container.ColInputsRegisterPage>
        {/* ViewProducts Page */}
        <ViewAboutUsPage dataPage={dataPage} active={states.active} />
      </Container.LayoutRegisterPage>
    </>
  );
};

export default AboutUsPanelPage;
