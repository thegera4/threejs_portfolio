import React, { useState, useRef, useEffect } from 'react';
import { useAiChat } from '../../hooks/useAiChat';
import { ChatMessageItem } from './ChatMessageItem';
import { QuickPrompts } from './QuickPrompts';

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, setInput, sendMessage, isLoading, clearChat } =
    useAiChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-generalsans">
      {/* Floating Trigger Button with Google-style RGB animated border */}
      {!isOpen && (
        <div className="relative group inline-flex items-center justify-center">
          {/* Ambient Google RGB glowing halo */}
          <div className="absolute -inset-1 rounded-full blur-md opacity-45 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] aspect-square google-border-gradient animate-google-spin" />
            </div>
          </div>

          {/* Pill button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-[1.5px] rounded-full overflow-hidden cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/80 focus:outline-none"
            aria-label="Open AI Assistant"
          >
            {/* Rotating Google RGB conic gradient border */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] aspect-square google-border-gradient animate-google-spin pointer-events-none" />

            {/* Inner dark pill surface matching Google Gemini / Dark theme */}
            <span className="relative z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#161618] group-hover:bg-[#1e1f23] text-white font-medium transition-colors">
              {/* Sparkles Icon */}
              <svg
                className="w-4 h-4 fill-white animate-pulse pointer-events-none"
                viewBox="0 0 24 24"
              >
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>

              <span className="text-sm tracking-wide font-semibold select-none pointer-events-none text-white">
                Ask AI
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[540px] max-h-[85vh] flex flex-col bg-black-200/95 border border-white/10 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black-300/80 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Gerardo's AI
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </h4>
                <p className="text-[11px] text-gray-400">Online • Portfolio Assistant</p>
              </div>
            </div>


            <div className="flex items-center gap-1">
              {/* Clear chat button */}
              <button
                onClick={clearChat}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Close/Minimize button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 custom-scrollbar">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <QuickPrompts onSelectPrompt={handlePromptSelect} disabled={isLoading} />

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-black-300/90 border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, Ford, projects..."
              disabled={isLoading}
              className="flex-1 bg-black-200 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
