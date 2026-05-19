'use client';

import { type User } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import ReadAloudButton from './ReadAloudButton';
import VisualBlock from './VisualBlock';

export interface Visual {
  type: 'svg' | 'desmos';
  code?: string;       // for svg
  expression?: string; // for desmos
  caption?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  visual?: Visual;
  attachment?: {
    name: string;
    type: 'image' | 'pdf';
  };
}

interface MessageBubbleProps {
  message: Message;
  user?: User | null;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function MessageBubble({ message, user }: MessageBubbleProps) {
  async function getIdToken(): Promise<string | null> {
    if (!user) return null;
    try { return await user.getIdToken(); } catch { return null; }
  }
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end gap-2">
        <div className="flex flex-col items-end gap-1" style={{ maxWidth: '65%' }}>
          {message.attachment && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white"
              style={{ background: '#6163fe', borderRadius: '18px 18px 4px 18px' }}
            >
              <span
                className="px-1.5 py-0.5 text-xs font-bold tracking-wide"
                style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}
              >
                {message.attachment.type === 'image' ? 'IMG' : 'PDF'}
              </span>
              <span className="max-w-[160px] truncate">{message.attachment.name}</span>
            </div>
          )}
          <div
            className="px-4 py-3 text-white"
            style={{
              background: '#6163fe',
              borderRadius: '18px 18px 4px 18px',
            }}
          >
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex items-start gap-3">
      {/* Apex avatar */}
      <div
        aria-hidden="true"
        className="flex flex-shrink-0 items-center justify-center text-xs font-bold text-white"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
          fontSize: '11px',
        }}
      >
        A
      </div>
      <div className="flex flex-col gap-1" style={{ maxWidth: '65%' }}>
        <div
          className="px-4 py-3"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
          }}
        >
          <div
            className="break-words text-sm leading-relaxed"
            style={{ color: '#334155' }}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold" style={{ color: '#232323' }}>{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                ol: ({ children }) => <ol className="my-2 list-decimal pl-5 space-y-1">{children}</ol>,
                ul: ({ children }) => <ul className="my-2 list-disc pl-5 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                code: ({ children }) => <code className="rounded px-1 py-0.5 text-xs font-mono" style={{ background: '#f1f5f9', color: '#6163fe' }}>{children}</code>,
              }}
            >
              {message.content}
            </ReactMarkdown>
            {message.visual && (
              <div style={{ marginTop: '12px' }}>
                <VisualBlock visual={message.visual} />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            {formatTime(message.timestamp)}
          </span>
          <ReadAloudButton text={message.content} getIdToken={getIdToken} />
        </div>
      </div>
    </div>
  );
}
