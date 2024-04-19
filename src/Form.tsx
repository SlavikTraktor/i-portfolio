import { useState } from "react";
import { uniqueId } from "lodash";

interface InputLineProps {
  title: string;
  value: string;
  onDelete: () => void;
  onChange: (newValue: Omit<FormValue, "id">) => void;
}

const InputLine = ({ title, value, onDelete, onChange }: InputLineProps) => {
  return (
    <div className="mb-2 flex">
      <input
        type="text"
        className="border rounded mr-2 py-1 px-3"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, value })}
      />
      <input
        type="text"
        className="border rounded mr-2 py-1 px-3"
        placeholder="Value"
        name="value"
        value={value}
        onChange={(e) => onChange({ title, value: e.target.value })}
      />
      <button onClick={onDelete}>x</button>
    </div>
  );
};

const emptyValue = (): FormValue => ({ id: uniqueId(), title: "", value: "" });

export interface FormValue {
  id: string;
  title: string;
  value: string;
}

interface FormProps {
  onSubmit: (v: FormValue[]) => void;
  defaultValues?: FormValue[];
}

const valuesMock: FormValue[] = [
  { id: uniqueId(), title: "SNP500", value: "1302" },
  { id: uniqueId(), title: "MSCI", value: "542" },
  { id: uniqueId(), title: "AUR", value: "308" },
];

export const Form = ({ onSubmit, defaultValues }: FormProps) => {
  const [values, setValues] = useState<FormValue[]>(defaultValues || valuesMock || [emptyValue()]);

  const addNewValue = () => {
    setValues((v) => [...v, emptyValue()]);
  };

  const onDelete = (id: string) => () => {
    setValues((v) => {
      const inx = v.findIndex((v) => v.id === id);

      return [...v.slice(0, inx), ...v.slice(inx + 1)];
    });
  };

  const onChange = (id: string) => (newValue: Omit<FormValue, "id">) => {
    setValues((v) => {
      const inx = v.findIndex((v) => v.id === id);

      return [...v.slice(0, inx), { id, ...newValue }, ...v.slice(inx + 1)];
    });
  };

  return (
    <div>
      {values.map((v) => (
        <InputLine key={v.id} {...v} onDelete={onDelete(v.id)} onChange={onChange(v.id)} />
      ))}

      <div>
        <button onClick={addNewValue}>Add new</button>
        <button className="ml-2" onClick={() => onSubmit(values)}>
          Submit
        </button>
      </div>
    </div>
  );
};
