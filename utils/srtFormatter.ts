
import type { SubtitleEntry } from '../types';

export const srtFormatter = (subtitles: SubtitleEntry[]): string => {
  return subtitles
    .map((entry, index) => {
      const { startTime, endTime, text } = entry;
      return `${index + 1}\n${startTime} --> ${endTime}\n${text}\n`;
    })
    .join('\n');
};
