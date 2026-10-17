import React from 'react';

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const PROMPTS = [
  "Can I download Gerardo's CV?",
  'What is your strongest tech stack?',
  'Tell me about the SQLite Viewer extension',
  'What do you do at Ford Motor Company?',
  'Why transition from manufacturing to software?',
  'What projects use AI or LLMs?',
];

export const QuickPrompts: React.FC<QuickPromptsProps> = ({
  onSelectPrompt,
  disabled = false,
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="py-2 px-3 border-t border-white/5 bg-black-200/50">
      <p className="text-[11px] text-gray-400 mb-1.5 font-medium flex items-center gap-1">
        <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-4-4 4 4 0 017.91-1 4 4 0 013.91 4 4 4 0 01-3.82 4z" />
        </svg>
        Suggested Questions:
      </p>
      <div
        onWheel={handleWheel}
        className="flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar scroll-smooth"
      >
        {PROMPTS.map((prompt, index) => (
          <button
            key={index}
            disabled={disabled}
            onClick={() => onSelectPrompt(prompt)}
            className="whitespace-nowrap shrink-0 px-2.5 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-cyan-500/20 hover:border-cyan-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
