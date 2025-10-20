import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-5l-2-2H4zm0 2v10h12V5H9l-2-2H4z" clipRule="evenodd" />
    </svg>
);


export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, disabled }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File | undefined) => {
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName(null);
      onFileChange(null);
      alert('请选择有效的音频或视频文件。');
    }
  }, [onFileChange]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="space-y-2">
       <label className="block text-sm font-medium text-slate-300">2. 上传文件</label>
        <label
            htmlFor="file-upload"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full h-40 px-4 transition bg-slate-900 border-2 ${isDragging ? 'border-sky-500' : 'border-slate-700'} border-dashed rounded-lg cursor-pointer hover:border-sky-600 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                {fileName ? (
                    <div className="flex items-center gap-2 text-slate-300">
                        <FileIcon />
                        <span className="font-semibold">{fileName}</span>
                    </div>
                ) : (
                    <>
                        <UploadIcon />
                        <p className="mb-2 text-sm text-slate-400">
                            <span className="font-semibold text-sky-400">点击上传</span> 或拖放文件
                        </p>
                        <p className="text-xs text-slate-500">音频或视频 (MP3, WAV, MP4 等)</p>
                    </>
                )}
            </div>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} accept="audio/*,video/*" disabled={disabled} />
        </label>
    </div>
  );
};
