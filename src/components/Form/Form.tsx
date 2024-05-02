import { useCallback, useState } from "react";
import { uniqueId } from "lodash";
import { countResValue } from "../../helpers/countResValue";
import { FormValue } from "../../types";
import { emptyValue } from "./helpers";
import { InputLine } from "./InputLine";

const valuesMock: FormValue[] = [
  { id: uniqueId(), title: "SNP500", value: "1302", oldValue: "228322" },
  { id: uniqueId(), title: "MSCI", value: "542" },
  { id: uniqueId(), title: "AUR", value: "308" },
];

interface FormProps {
  onSubmit: (v: FormValue[]) => void;
  defaultValues?: FormValue[];
}

export const Form = ({ onSubmit, defaultValues }: FormProps) => {
  const [values, setValues] = useState<FormValue[]>(defaultValues || valuesMock || [emptyValue()]);

  const addNewValue = () => {
    setValues((v) => [...v, emptyValue()]);
  };

  const onDelete = useCallback((id: string) => {
    setValues((v) => {
      return v.filter((v) => v.id !== id);
    });
  }, []);

  const onChange = useCallback((newValue: FormValue) => {
    setValues((v) => {
      const inx = v.findIndex((v) => v.id === newValue.id);
      newValue.resValue = countResValue(newValue.value);
      v[inx] = newValue;

      return [...v];
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-my gap-2 mb-2">
        <div>name</div>
        <div>old</div>
        <div></div>
        <div>value</div>
        <div>res</div>
        <div></div>
        {values.map((v) => (
          <InputLine key={v.id} {...v} onDelete={onDelete} onChange={onChange} />
        ))}
      </div>

      <div>
        <button onClick={addNewValue}>Add new</button>
        <button className="ml-2" onClick={() => onSubmit(values)}>
          Submit
        </button>
      </div>
    </div>
  );
};
