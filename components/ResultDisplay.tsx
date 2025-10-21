import React from 'react';

interface ResultDisplayProps {
  resultContent: string;
  file: File | null;
  isPlainText: boolean;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultContent, file, isPlainText }) => {
  const handleDownload = () => {
    const blob = new Blob([resultContent], { type: isPlainText ? 'text/plain;charset=utf-8' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = file ? file.name.substring(0, file.name.lastIndexOf('.')) : 'subtitles';
    a.download = `${baseName}.${isPlainText ? 'txt' : 'srt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 animate-fade-in pt-6 border-t border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200">
        {isPlainText ? '生成的纯文本 (.txt)' : '生成的字幕 (.srt)'}
      </h3>
      <textarea
        readOnly
        value={resultContent}
        className="w-full h-48 p-3 bg-slate-900 border border-slate-700 rounded-md text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder={isPlainText ? "纯文本内容将显示在此处..." : "SRT 内容将显示在此处..."}
      />
      <button
        onClick={handleDownload}
        className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors duration-300"
      >
        <DownloadIcon />
        {isPlainText ? '下载 .txt 文件' : '下载 .srt 文件'}
      </button>
    </div>
  );
};
