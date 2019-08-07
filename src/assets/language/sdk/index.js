import cn from './cn'

const sdkLang = {
    cn: cn
};

function getLang(str, lang) {
    if (sdkLang[lang] && sdkLang[lang][str]) {
        return sdkLang[lang][str];
    }
    return str;
}

export default getLang;
