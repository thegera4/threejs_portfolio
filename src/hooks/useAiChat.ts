import { useState, useEffect, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-msg',
    role: 'assistant',
    content:
      "👋 Hi! I'm **Gerardo's AI Assistant**.\n\nI can answer questions about Gerardo's software engineering background at **Ford Motor Company**, his **36,000+ download** VSCode extension, his **100+ GitHub repos**, or his skills across React, Flutter, Go, and TypeScript.\n\nWhat would you like to know?",
    timestamp: Date.now(),
  },
];


export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('gerardo_ai_chat');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string>('gemini-1.5-flash');
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('gerardo_ai_chat', JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (textToSend?: string) => {
      const query = (textToSend ?? input).trim();
      if (!query || isLoading) return;

      setInput('');
      setError(null);

      // Track interest from user query
      const lower = query.toLowerCase();
      let detectedCategory: string | null = null;
      if (lower.includes('ai') || lower.includes('llm') || lower.includes('bot') || lower.includes('gpt')) {
        detectedCategory = 'ai';
      } else if (lower.includes('mobile') || lower.includes('flutter') || lower.includes('react native') || lower.includes('android')) {
        detectedCategory = 'mobile';
      } else if (lower.includes('backend') || lower.includes('go') || lower.includes('node') || lower.includes('api') || lower.includes('database')) {
        detectedCategory = 'backend';
      } else if (lower.includes('sqlite') || lower.includes('tool') || lower.includes('extension') || lower.includes('vscode')) {
        detectedCategory = 'devtools';
      } else if (lower.includes('react') || lower.includes('ui') || lower.includes('css') || lower.includes('frontend')) {
        detectedCategory = 'frontend';
      }

      if (detectedCategory) {
        window.dispatchEvent(
          new CustomEvent('record-interest', {
            detail: { category: detectedCategory, weight: 0.5 },
          })
        );
      }

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: Date.now(),
      };

      const assistantMsgId = `assistant-${Date.now()}`;
      const placeholderAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      const newMessages = [...messages, userMsg];
      setMessages([...newMessages, placeholderAssistantMsg]);
      setIsLoading(true);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        const modelHeader = response.headers.get('x-ai-model');
        if (modelHeader) {
          setActiveModel(modelHeader);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
            )
          );
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error('AI chat error:', err);
        setError('Failed to get answer. Please check connection or try again.');
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    "Sorry, I encountered a temporary network issue. Please feel free to try again or reach out directly through the Contact form below!",
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const clearChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setError(null);
    try {
      sessionStorage.removeItem('gerardo_ai_chat');
    } catch {
      // ignore
    }
  }, []);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    error,
    clearChat,
    activeModel,
  };
}
