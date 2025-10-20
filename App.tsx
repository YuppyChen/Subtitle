import React, { useState, useCallback, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { MediaPlayer } from './components/MediaPlayer';
import { transcribeAudio, translateSubtitles } from './services/geminiService';
import { srtFormatter } from './utils/srtFormatter';
import { srtToVtt } from './utils/vttFormatter';
import type { Language, Status, SubtitleEntry } from './types';
import { LANGUAGES } from './constants';

const HeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v2H4V4zm0 3h16v2H4V7zm0 3h16v2H4v-2zm0 3h10v2H4v-2zm0 3h10v2H4v-2zm12 0h4v2h-4v-2zM4 19h16v2H4v-2z" />
    <path d="M16.5 13.5l-3 3-1.5-1.5L14 13l1 1 2-2 1.5 1.5-2 2z" />
  </svg>
);

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<Language>(LANGUAGES[0]);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [srtContent, setSrtContent] = useState('');
  const [trackUrl, setTrackUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // This effect cleans up the object URL when the trackUrl state changes or the component unmounts.
    return () => {
      if (trackUrl) {
        URL.revokeObjectURL(trackUrl);
      }
    };
  }, [trackUrl]);


  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setStatus('idle');
    setSrtContent('');
    setError(null);
    setTrackUrl(null); // Resetting will trigger the useEffect cleanup for the old URL
  };

  const handleLanguageChange = (language: Language) => {
    setTargetLanguage(language);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!file) {
      setError('请先选择一个文件。');
      return;
    }

    setStatus('processing');
    setError(null);
    setSrtContent('');
    setTrackUrl(null); // Reset track URL before generating a new one

    try {
      setStatusMessage('转换文件中...');
      const base64Data = await fileToBase64(file);
      const mimeType = file.type;

      setStatusMessage('转录音频中...');
      let subtitles: SubtitleEntry[] = await transcribeAudio(base64Data, mimeType);

      if (targetLanguage.code !== 'original') {
        setStatusMessage(`翻译为 ${targetLanguage.name} 中...`);
        subtitles = await translateSubtitles(subtitles, targetLanguage.name);
      }

      setStatusMessage('格式化字幕中...');
      const formattedSrt = srtFormatter(subtitles);
      setSrtContent(formattedSrt);

      // Create VTT content and URL for the media player track
      const vttContent = srtToVtt(formattedSrt);
      const blob = new Blob([vttContent], { type: 'text/vtt' });
      const url = URL.createObjectURL(blob);
      setTrackUrl(url);

      setStatus('success');
      setStatusMessage('字幕生成成功！');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError(err instanceof Error ? err.message : '发生未知错误。');
    }
  }, [file, targetLanguage]);

  const isProcessing = status === 'processing';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl shadow-sky-900/50 p-6 sm:p-8 space-y-8 border border-slate-700">
        <header className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <HeaderIcon />
            <h1 className="text-3xl sm:text-4xl font-bold text-sky-400">
              AI 字幕生成器
            </h1>
          </div>
          <p className="text-slate-400">
            即时为您的音频/视频文件生成和翻译字幕。
          </p>
        </header>

        <main className="space-y-6">
          <FileUpload onFileChange={handleFileChange} disabled={isProcessing} />
          <LanguageSelector
            selectedLanguage={targetLanguage}
            onLanguageChange={handleLanguageChange}
            disabled={isProcessing}
          />
          
          {file && <MediaPlayer file={file} trackUrl={trackUrl} />}

          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={!file || isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50"
            >
              {isProcessing ? '生成中...' : '生成字幕'}
            </button>
          </div>

          {isProcessing && <Spinner message={statusMessage} />}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-bold">错误</p>
              <p>{error}</p>
            </div>
          )}

          {status === 'success' && srtContent && (
            <ResultDisplay srtContent={srtContent} file={file} />
          )}
        </main>
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>由 Gemini API 强力驱动</p>
      </footer>
    </div>
  );
};

export default App;
