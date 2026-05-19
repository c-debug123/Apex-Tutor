'use client';

interface SuggestedRepliesProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function SuggestedReplies({ suggestions, onSelect }: SuggestedRepliesProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="ml-10 flex flex-wrap gap-2">
      {suggestions.map((text, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(text)}
          className="transition-all duration-150 active:scale-95"
          style={{
            background: '#f8f7ff',
            border: '1px solid #c7c6fd',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '13px',
            color: '#6163fe',
            cursor: 'pointer',
            fontWeight: 500,
            lineHeight: '1.4',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#6163fe';
            (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#6163fe';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f8f7ff';
            (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#c7c6fd';
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
