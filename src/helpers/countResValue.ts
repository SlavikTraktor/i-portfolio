export const countResValue = (value: string): number => {
  if (value.indexOf("*") !== -1) {
    const res = value
      .split("*")
      .filter((v) => v.length !== 0)
      .reduce((acc, v) => acc * +v, 1);

    return res;
  }

  return +value;
};
