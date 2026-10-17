import React from 'react';
import { ChatMessage } from '../../hooks/useAiChat';
import CV from '../../assets/CV8.pdf';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const PdfDownloadCard: React.FC<{ label?: string }> = ({ label = "Download Gerardo's CV (PDF)" }) => {
  return (
    <a
      href={CV}
      download="Juan_Gerardo_Medellin_CV.pdf"
      className="my-2.5 flex items-center gap-3 p-3 rounded-xl bg-black-200/90 border border-white/10 hover:border-red-500/50 hover:bg-black-100/90 transition-all group cursor-pointer shadow-lg no-underline block"
      title="Download Gerardo's CV (PDF)"
    >
      {/* Red PDF Icon badge */}
      <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 group-hover:bg-red-500/25 transition-all shrink-0">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v-1h2c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-3v5h1.5v-1.5h1c.28 0 .5-.22.5-.5zm5 0h-2v-3h2c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zm4.5-2.5h-2v1h1.5v1H19v1.5h-1.5V13h-1.5v-5h3.5v1.5zm-5 .5v-1h-1v1h1z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0 text-left">
        <div className="text-xs font-semibold text-white group-hover:text-red-300 transition-colors flex items-center gap-1.5">
          <span className="truncate">Gerardo_Medellin_CV.pdf</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono uppercase shrink-0">
            PDF
          </span>
        </div>
        <div className="text-[11px] text-gray-400 mt-0.5 truncate">
          {label && label !== "Download Gerardo's CV (PDF)" ? label : 'Click to download official resume'}
        </div>
      </div>

      {/* Download action icon */}
      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/20 text-gray-400 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
    </a>
  );
};

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Simple, safe Markdown parser for bold, italics, links, and line breaks
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold: **text**
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
      return (
        <React.Fragment key={lineIdx}>
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={partIdx} className="italic text-gray-300">
                  {part.slice(1, -1)}
                </em>
              );
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              const [, label, url] = linkMatch;
              const isCv =
                url === '#download-cv' ||
                url.toLowerCase().includes('cv8.pdf') ||
                url.toLowerCase().includes('cv.pdf') ||
                url === '#cv';

              if (isCv) {
                return <PdfDownloadCard key={partIdx} label={label} />;
              }

              const isInternal = url.startsWith('#');
              return (
                <a
                  key={partIdx}
                  href={url}
                  target={isInternal ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
                >
                  {label}
                </a>
              );
            }
            return part;
          })}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const hasCvDownloadTag = message.content?.includes('#download-cv') || message.content?.toLowerCase().includes('.pdf)');
  const shouldShowFallbackCvCard =
    !isUser &&
    !hasCvDownloadTag &&
    Boolean(
      (message.content?.toLowerCase().includes('cv') || message.content?.toLowerCase().includes('resume')) &&
      (message.content?.toLowerCase().includes('download') ||
        message.content?.toLowerCase().includes('pdf') ||
        message.content?.toLowerCase().includes('file'))
    );

  return (
    <div className={`flex gap-3 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
      )}

      <div
        className={`relative max-w-[85%] rounded-2xl p-3.5 text-sm transition-all shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none'
            : 'bg-black-300/90 text-gray-200 border border-white/10 backdrop-blur-md rounded-bl-none'
        }`}
      >
        <div className="leading-relaxed break-words">
          {message.content ? (
            <>
              {renderFormattedContent(message.content)}
              {shouldShowFallbackCvCard && <PdfDownloadCard />}
            </>
          ) : (
            <div className="flex items-center gap-1.5 py-1 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
