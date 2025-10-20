
import React from 'react';

interface SpinnerProps {
    message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3" aria-live="polite" aria-busy="true">
      <div className="w-8 h-8 border-4 border-slate-500 border-t-sky-400 rounded-full animate-spin"></div>
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
};
