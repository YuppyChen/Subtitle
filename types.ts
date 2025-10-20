
export interface Language {
  code: string;
  name: string;
}

export type Status = 'idle' | 'processing' | 'success' | 'error';

export interface SubtitleEntry {
  startTime: string;
  endTime: string;
  text: string;
}
