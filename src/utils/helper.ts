export const getEnumValueByKey = (enumObject: Object, value: string) => {
  return Object.entries(enumObject).find(([key, val]) => key === value)?.[1];
};
