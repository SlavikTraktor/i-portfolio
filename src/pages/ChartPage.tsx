import { Chart } from "../components/Chart";
import { FormValue } from "../components/Form";

interface ChartPageProps {
  onReturn: () => void;
  values: FormValue[];
}

export const ChartPage = ({ onReturn, values }: ChartPageProps) => {
  return (
    <>
      <Chart values={values} />
      <div>
        <button onClick={onReturn}>Return</button>
        <button className="ml-2" onClick={() => null}>
          Save
        </button>
      </div>
    </>
  );
};
