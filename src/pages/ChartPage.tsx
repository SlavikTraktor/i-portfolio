import { Chart } from "../components/Chart";
import { FormValue } from "../components/Form";
import * as dataSaver from "../helpers/dataSaver";

interface ChartPageProps {
  onReturn: () => void;
  values: FormValue[];
}

export const ChartPage = ({ onReturn, values }: ChartPageProps) => {
  const onSave = () => {
    dataSaver.saveData(values);
  };

  const onGet = () => {
    console.log(dataSaver.getAll());
    console.log(dataSaver.getLastSavedData());
  };

  const onClear = () => {
    window.localStorage.clear();
  };

  return (
    <>
      <Chart values={values} />
      <div>
        <button onClick={onReturn}>Return</button>
        <button className="ml-2" onClick={onSave}>
          Save
        </button>
        <button className="ml-2" onClick={onGet}>
          Get
        </button>
        <button className="ml-2" onClick={onClear}>
          Clear
        </button>
      </div>
    </>
  );
};
