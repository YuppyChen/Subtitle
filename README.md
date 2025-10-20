# AI 字幕生成器 (AI Subtitle Generator)

这是一个使用 Google Gemini API 驱动的 Web 应用程序，可以为音频和视频文件自动生成字幕。用户可以上传文件，生成原始语言的字幕，选择将字幕翻译成多种目标语言，并预览带字幕的媒体文件，最后下载 SRT 格式的字幕文件。

This is a web application powered by the Google Gemini API that automatically generates subtitles for audio and video files. Users can upload a file, generate subtitles in the original language, choose to translate them into various target languages, preview the media with subtitles, and download the result as an SRT file.

## ✨ 功能 (Features)

-   **文件上传**: 支持拖放或点击选择常见的音频和视频文件格式。
-   **自动转录**: 利用 Gemini Pro 模型将音频内容转录成带时间戳的文本。
-   **多语言翻译**: 可将生成的字幕翻译成十多种语言。
-   **媒体预览**: 在应用内直接播放上传的音频或视频，并实时显示生成的字幕。
-   **SRT 文件下载**: 一键下载行业标准的 `.srt` 字幕文件，方便在各种播放器和编辑软件中使用。
-   **响应式设计**: 界面在桌面和移动设备上均有良好体验。

-   **File Upload**: Supports drag-and-drop or click-to-select for common audio and video formats.
-   **Automatic Transcription**: Uses the Gemini Pro model to transcribe audio content into timestamped text.
-   **Multi-Language Translation**: Can translate the generated subtitles into over a dozen languages.
-   **Media Preview**: Play the uploaded audio/video directly in the app with the generated subtitles displayed in real-time.
-   **SRT File Download**: One-click download of industry-standard `.srt` subtitle files for use in various players and editing software.
-   **Responsive Design**: The interface works well on both desktop and mobile devices.

## 🚀 如何使用 (How to Use)

1.  **上传文件**: 点击上传区域或将您的音频/视频文件拖放到该区域。
2.  **选择语言 (可选)**: 从下拉菜单中选择您希望将字幕翻译成的目标语言。如果想保留原始语言，请选择“原始语言”。
3.  **生成字幕**: 点击“生成字幕”按钮。应用将处理文件，这可能需要一些时间，具体取决于文件大小和长度。
4.  **预览和下载**: 处理完成后，您可以在媒体播放器中预览结果。生成的 SRT 内容会显示在文本框中，您可以点击“下载 .srt 文件”按钮将其保存到本地。

1.  **Upload File**: Click the upload area or drag and drop your audio/video file into it.
2.  **Select Language (Optional)**: Choose a target language from the dropdown menu to translate the subtitles into. Select "Original Language" to keep the transcribed language.
3.  **Generate Subtitles**: Click the "Generate Subtitles" button. The application will process the file, which may take some time depending on its size and duration.
4.  **Preview and Download**: Once processing is complete, you can preview the result in the media player. The generated SRT content will be displayed in the text area, and you can click the "Download .srt file" button to save it locally.

## 🛠️ 技术栈 (Tech Stack)

-   **前端 (Frontend)**: React, TypeScript, Tailwind CSS
-   **AI 模型 (AI Model)**: Google Gemini API (`gemini-2.5-pro`)
