import { useCallback } from "react";
import { FormValue } from "../../types";
import { emptyValue } from "./helpers";
import { InputLine } from "./InputLine";

interface FormProps {
  onSubmit?: (v: FormValue[]) => void;
  onDelete?: (rowId: FormValue["id"]) => void;
  onChange?: (newValues: FormValue[]) => void;
  onRowUpdate?: (newValue: FormValue) => void;
  values: FormValue[];
}

export const Form = ({ onSubmit, values, onChange, onRowUpdate, onDelete }: FormProps) => {
  const addNewValue = () => {
    onChange?.([...values, emptyValue()]);
  };

  const onDeleteInternal = useCallback((id: string) => {
    onDelete?.(id);
  }, []);

  const onChageRow = useCallback((newValue: FormValue) => {
    onRowUpdate?.(newValue);
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
          <InputLine key={v.id} {...v} onDelete={onDeleteInternal} onChange={onChageRow} />
        ))}
      </div>

      <div>
        <button onClick={addNewValue}>Use previous</button>
        <button onClick={addNewValue}>Add new</button>
        <button className="ml-2" onClick={() => onSubmit?.(values)}>
          Submit
        </button>
      </div>
    </div>
  );
};
