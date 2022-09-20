const localisation = {
   ru: require('./ru'),
   en: require('./en'),
};

const userLang = (lang) => {
   if (localisation[lang]) return localisation[lang];
   return localisation.en;
};

module.exports = {
   userLang,
   localisation,
};
