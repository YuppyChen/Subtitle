/**
 * Converts a string in SRT format to VTT format.
 * VTT is required for displaying subtitles in HTML5 video/audio track elements.
 * @param srtText The SRT formatted string.
 * @returns A VTT formatted string.
 */
export const srtToVtt = (srtText: string): string => {
  if (!srtText) {
    return '';
  }
  
  // VTT files must start with WEBVTT, followed by a blank line.
  const vttHeader = 'WEBVTT\n\n';

  // Replace the SRT timestamp comma separator with a period for VTT compatibility.
  // e.g., 00:00:01,234 --> 00:00:01.234
  const vttTimestamps = srtText.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');

  return vttHeader + vttTimestamps;
};
