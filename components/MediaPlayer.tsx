import React, { useEffect, useState } from 'react';

interface MediaPlayerProps {
  file: File;
  trackUrl: string | null;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ file, trackUrl }) => {
  const [mediaUrl, setMediaUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!mediaUrl) {
    return null;
  }

  const isVideo = file.type.startsWith('video/');

  return (
    <div className="space-y-4 animate-fade-in">
       <h3 className="text-lg font-semibold text-slate-200">媒体预览</h3>
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        {isVideo ? (
          <video key={mediaUrl} controls className="w-full max-h-96" crossOrigin="anonymous">
            <source src={mediaUrl} type={file.type} />
            {trackUrl && <track key={trackUrl} kind="subtitles" src={trackUrl} srcLang="en" label="字幕" default />}
            您的浏览器不支持 video 标签。
          </video>
        ) : (
          <audio key={mediaUrl} controls className="w-full" crossOrigin="anonymous">
            <source src={mediaUrl} type={file.type} />
            {trackUrl && <track key={trackUrl} kind="subtitles" src={trackUrl} srcLang="en" label="字幕" default />}
            您的浏览器不支持 audio 标签。
          </audio>
        )}
      </div>
    </div>
  );
};
