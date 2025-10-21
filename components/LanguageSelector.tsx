import React from 'react';
import { LANGUAGES } from '../constants';
import type { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  disabled: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangCode = event.target.value;
    const language = LANGUAGES.find(lang => lang.code === selectedLangCode) || LANGUAGES[0];
    onLanguageChange(language);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="language-select" className="block text-sm font-medium text-slate-300">
        选择翻译语言（可选）
      </label>
      <div className="relative">
        <select
          id="language-select"
          value={selectedLanguage.code}
          onChange={handleChange}
          disabled={disabled}
          className="w-full pl-3 pr-10 py-2 text-base bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-md appearance-none text-white disabled:opacity-50"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
