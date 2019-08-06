import cn from "./cn"
import en from "./en"

const messages = {
  cn: cn,
  en: en,
};

const langSet = ["cn", "en"];
const defaultLang = "cn";

export function have(lang) {
  if (typeof lang == "undefined" || lang == "") {
    return false;
  }
  for (let i = 0; i < langSet.length; i++) {
    if (lang == langSet[i]) {
      return true;
    }
  }
  return false;
};

export function getLanguage(lang) {
  if (have(lang)) {
    return lang;
  }
  return defaultLang;
}

export default messages;
