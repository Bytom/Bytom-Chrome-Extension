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

export function getLanguage() {
  if (have(localStorage.lang)) {
    return localStorage.lang;
  } 
  return defaultLang;
}

export default messages;