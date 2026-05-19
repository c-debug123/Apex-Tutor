'use client';

import { useRef, KeyboardEvent } from 'react';
import AttachmentChip from './AttachmentChip';

interface ChatInputProps {
  input: string;
  attachment: File | null;
  isLoading: boolean;
  onboardingActive: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onAttachmentChange: (file: File | null) => void;
}

export default function ChatInput({
  input,
  attachment,
  isLoading,
  onboardingActive,
  onInputChange,
  onSend,
  onAttachmentChange,
}: ChatInputProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const inputDisabled = isLoading || onboardingActive;

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !inputDisabled && input.trim()) {
      e.preventDefault();
      onSend();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onAttachmentChange(file);
    e.target.value = '';
  }

  return (
    <div
      className="flex-shrink-0"
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '12px 24px',
      }}
    >
      {onboardingActive && (
        <p className="mb-2 text-center text-xs" style={{ color: '#94a3b8' }}>
          Complete the steps above to continue chatting
        </p>
      )}
      {attachment && (
        <div className="mb-2 flex items-center">
          <AttachmentChip file={attachment} onRemove={() => onAttachmentChange(null)} />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Photo upload button */}
        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          disabled={inputDisabled}
          aria-label="Attach an image"
          className="flex flex-shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: inputDisabled ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!inputDisabled)
              (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* PDF attach button */}
        <button
          type="button"
          onClick={() => pdfInputRef.current?.click()}
          disabled={inputDisabled}
          aria-label="Attach a PDF"
          className="flex flex-shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: inputDisabled ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!inputDisabled)
              (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Text input */}
        <div
          className="flex flex-1 items-center gap-2 transition-all"
          style={{
            borderRadius: '12px',
            border: '1.5px solid #62d0ff',
            padding: '8px 12px',
            background: '#ffffff',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            aria-label="Type your question"
            disabled={inputDisabled}
            className="flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed placeholder:text-[#94a3b8]"
            style={{ color: '#232323' }}
          />

          {/* Send button */}
          <button
            type="button"
            onClick={onSend}
            disabled={inputDisabled || !input.trim()}
            aria-label="Send message"
            className="flex flex-shrink-0 items-center justify-center transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#6163fe',
              border: 'none',
              cursor: inputDisabled || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
