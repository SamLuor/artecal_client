/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";

interface PropsInterface {
  setDataPage: (state: any) => void;
  handleSubmit: () => void;
  INITIAL_DATA_PAGE: any;
}

const ContainerSaveForm = ({
  setDataPage,
  handleSubmit,
  INITIAL_DATA_PAGE,
}: PropsInterface) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        label="Limpar"
        className="btn-clear"
        onClick={() =>
          setDataPage((e: any) => ({ ...INITIAL_DATA_PAGE, _id: e._id }))
        }
      />
      <Button label="Salvar" className="btn-save" onClick={handleSubmit} />
    </div>
  );
};

export default ContainerSaveForm;
