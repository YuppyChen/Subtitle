import React, { useState, useEffect } from 'react';

interface ApiKeyManagerProps {
  onKeyStatusChange: (isSet: boolean) => void;
  disabled: boolean;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeyStatusChange, disabled }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      setIsKeySet(true);
      onKeyStatusChange(true);
    } else {
      setIsKeySet(false);
      onKeyStatusChange(false);
    }
  }, [onKeyStatusChange]);

  const handleSaveKey = () => {
    const trimmedKey = apiKeyInput.trim();
    if (trimmedKey) {
      localStorage.setItem('gemini-api-key', trimmedKey);
      setIsKeySet(true);
      onKeyStatusChange(true);
      setApiKeyInput('');
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini-api-key');
    setIsKeySet(false);
    onKeyStatusChange(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">1. 配置 API 密钥</label>
      {isKeySet ? (
        <div className="flex items-center justify-between p-3 bg-green-900/50 border border-green-700 rounded-lg">
          <p className="text-green-300 text-sm flex items-center">
            <CheckIcon />
            API 密钥已保存。
          </p>
          <button onClick={handleClearKey} disabled={disabled} className="text-sm text-sky-400 hover:text-sky-300 disabled:opacity-50 font-semibold">
            更改密钥
          </button>
        </div>
      ) : (
        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 space-y-3">
          <p className="text-xs text-slate-400">
            您需要自己的 Google Gemini API 密钥才能使用此应用。
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline ml-1">
              在此处获取密钥
            </a>。
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="在此处粘贴您的 API 密钥"
              disabled={disabled}
              className="flex-grow w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Gemini API Key Input"
            />
            <button onClick={handleSaveKey} disabled={disabled || !apiKeyInput.trim()} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed">
              保存密钥
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
