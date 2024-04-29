import { memo } from "react";
import { FormValue } from "./types";

type InputLineProps = FormValue & {
  onDelete: (id: string) => void;
  onChange: (newValue: FormValue) => void;
};

export const InputLine = memo(({ id, title, value, resValue, onDelete, onChange }: InputLineProps) => {
  return (
    <div className="mb-2 flex">
      <input
        type="text"
        className="border rounded mr-2 py-1 px-3"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, value, id })}
      />
      <input
        type="text"
        className="border rounded mr-2 py-1 px-3"
        placeholder="Value"
        name="value"
        value={value}
        onChange={(e) => onChange({ title, value: e.target.value, id })}
      />

      <div className="border bg-slate-100 rounded mr-2 min-w-24 flex items-center px-3">{resValue || value}</div>
      <button onClick={() => onDelete(id)}>x</button>
    </div>
  );
});
