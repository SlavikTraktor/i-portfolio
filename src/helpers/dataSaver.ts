import _ from "lodash";
import { FormValue, SavedFormValues } from "../types";

const CHART_DATA_KEY = "chart-data-key-";

const findAllData = (sort = true): SavedFormValues[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storage = window.localStorage as any;

  const data = _.toPairs<string>(storage).filter((v) => v[0].includes(CHART_DATA_KEY));

  sort &&
    data.sort((v1, v2) => {
      const v1val = +v1[0].replace(CHART_DATA_KEY, "");
      const v2val = +v2[0].replace(CHART_DATA_KEY, "");
      return v1val - v2val;
    });

  return data.map<SavedFormValues>((v) => JSON.parse(v[1]));
};

export const saveData = (values: FormValue[]) => {
  const data = findAllData(false);

  const valuesToSave: SavedFormValues = {
    date: new Date().toString(),
    values,
  };

  const stringifiedValues = JSON.stringify(valuesToSave);

  if (data.length === 0) {
    window.localStorage.setItem(`${CHART_DATA_KEY}0`, stringifiedValues);
  } else {
    window.localStorage.setItem(`${CHART_DATA_KEY}${data.length}`, stringifiedValues);
  }
};

export const getLastSavedData = (): SavedFormValues => {
  const values = findAllData();

  return values[values.length - 1];
};

export const getAll = () => {
  return findAllData();
};
