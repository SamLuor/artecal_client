/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";

import { initials } from "./interfaces-initialData";

import * as api from "../../../api";

import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const UploadImage = ({
  handleAddFile,
  handleDelFile,
  file,
  error,
  type,
  fieldObject,
  index,
  setImagesDelete,
}: any) => {
  //States
  const FileUploadRef = React.useRef(null);
  const [dataUploadImage, setDataUploadImage] = React.useState(
    initials.INITIAL_FILE_DATA
  );
  const [isValidImage, setIsValidImage] = React.useState(
    initials.INITIAL_IS_VALID_IMAGE
  );

  //Functions
  const treatDataFile = React.useCallback((data: any) => {
    const treatedData = {
      file: data.url || data.file,
      _id: data._id,
      name: data.name,
      description: data.description,
      principal: data.principal,
      filename: data.filename,
      url: data.url,
    };

    return treatedData;
  }, []);

  //Functions handle form upload-image
  const handleFileSelect = async (event: FileUploadSelectEvent) => {
    /* setIsValidImage((e) => ({
      ...e,
      message: "Adicione uma imagem que tenha a proporção 16/9",
    })); */
    const file = event.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);
    if (type == "background") {
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Verifica se a proporção está próxima de 16:9
        const aspectRatio = width / height;
        const minAspectRatio = 15.5 / 9;
        const maxAspectRatio = 16.5 / 9;

        const validImage =
          aspectRatio >= minAspectRatio && aspectRatio <= maxAspectRatio;

        setIsValidImage((e) => ({ ...e, valid: validImage }));

        if (validImage) {
          setDataUploadImage((e) => ({ ...e, file: file }));
          handleAddFile({ ...dataUploadImage, file: file }, fieldObject, type);
        } else {
          event.files.pop();
          setIsValidImage((e) => ({
            ...e,
            message: "Adicione uma imagem que tenha a proporção 16/9",
          }));
        }
      };
    } else if (type == "other") {
      setDataUploadImage((e) => ({ ...e, file: file }));
      handleAddFile(
        { ...dataUploadImage, file: file },
        fieldObject,
        type,
        index
      );
    }
  };

  const handleFileDelete = async () => {
    if (dataUploadImage._id) {
      setImagesDelete((prev: [string]) => [...prev, dataUploadImage._id]);
    }

    setDataUploadImage((e) => ({
      ...e,
      file: "",
    }));
    handleDelFile(initials.INITIAL_FILE_DATA, fieldObject, type, index);
  };

  const handleCheckBox = (value: any) => {
    setDataUploadImage((e) => ({ ...e, principal: value }));
    handleAddFile(
      { ...dataUploadImage, principal: value },
      fieldObject,
      type,
      index
    );
  };

  const handleInputs = (event: any) => {
    const field = event.target.name;
    const value = event.target.value;

    setDataUploadImage((e) => ({ ...e, [field]: value }));
    handleAddFile(
      { ...dataUploadImage, [field]: value },
      fieldObject,
      type,
      index
    );
  };

  React.useEffect(() => {
    if (file) {
      setDataUploadImage(() => treatDataFile(file));
    } else {
      setDataUploadImage(initials.INITIAL_FILE_DATA);
    }
    if (error) {
      setIsValidImage({
        valid: false,
        message: error,
      });
    }
  }, [file]);

  return (
    <div className="container-upload-upload">
      <div className="card-upload">
        {!dataUploadImage?.file ? (
          <FileUpload
            ref={FileUploadRef}
            id=""
            mode="basic"
            name="demo[]"
            accept="image/*"
            customUpload
            maxFileSize={1000000}
            onSelect={handleFileSelect}
          />
        ) : (
          <>
            <img
              src={
                typeof dataUploadImage?.file == "object"
                  ? URL.createObjectURL(dataUploadImage.file)
                  : dataUploadImage.file
              }
              className="w-full h-full image"
            />
            <i
              className="fa-solid fa-trash p-2 icon-card-trash"
              onClick={handleFileDelete}
            />
            {type == "image" && (
              <Checkbox
                className="checkbox-image"
                tooltip="Principal"
                checked={dataUploadImage.principal}
                onChange={(event) => handleCheckBox(event.target.checked)}
              />
            )}
          </>
        )}
        <InputText
          name="name"
          className="inputs-image p-inputtext-sm rounded-none border-none"
          value={dataUploadImage.name || ""}
          placeholder="Nome da imagem"
          onChange={handleInputs}
        />
        <InputText
          name="description"
          className="inputs-image p-inputtext-sm rounded-none border-none"
          value={dataUploadImage.description || ""}
          placeholder="Descrição da imagem"
          onChange={handleInputs}
        />
      </div>
      {!isValidImage.valid && <p className="error">{isValidImage.message}</p>}
    </div>
  );
};

export default UploadImage;
