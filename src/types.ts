export interface FormValue {
  id: string;
  title: string;
  value: string;
  resValue?: number;
  oldValue?: string;
}

export interface SavedFormValues {
  date: string;
  values: FormValue[];
}
