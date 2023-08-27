import './style.css'

import { ToggleButton } from "primereact/togglebutton";

interface PropsToggleView {
  view: string;
  setView: (value: any) => void;
}

const ToggleView = ({ view, setView }: PropsToggleView) => {
  return (
    <div className="flex flex-col h-20">
      <p className="text-slate-200">
        Esta na visão de{" "}
        <span
          className={`${
            view == "mobile" ? "text-lime-400" : "text-blue-400"
          } font-bold`}
          style={{ textTransform: "capitalize" }}
        >
          {view}
        </span>
      </p>
      <ToggleButton
        onLabel="Mobile"
        offLabel="Desktop"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        checked={view == "mobile"}
        onChange={() =>
          setView((e: string) => (e == "mobile" ? "desktop" : "mobile"))
        }
      />
    </div>
  );
};

export default ToggleView;
