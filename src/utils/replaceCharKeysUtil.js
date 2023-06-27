import { camelCaseUtil } from "./camelCaseUtil";

const replaceCharKeysUtil = (object) => {
  Object.keys(object).forEach(function (key) {
    const newKey = camelCaseUtil(
      key
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\//g, "_")
        .replace(/º/g, "_")
    );
    if (object[key] && typeof object[key] === "object") {
      replaceCharKeysUtil(object[key]);
    }
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  });
  return object;
};

export { replaceCharKeysUtil };
