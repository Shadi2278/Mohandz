
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('mohandz_lang') || 'ar');

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('mohandz_lang', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'ar' ? 'en' : 'ar');
    };

    const t = (translations) => {
      if (!translations) return '';
      return translations[language] || translations['en'] || '';
    };

    const value = {
        language,
        toggleLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
