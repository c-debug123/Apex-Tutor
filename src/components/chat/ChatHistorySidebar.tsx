'use client';

import { type ChatSession } from '@/lib/firestore';

interface Props {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (session: ChatSession) => void;
  onNewChat: () => void;
}

function groupByDate(sessions: ChatSession[]): { label: string; items: ChatSession[] }[] {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const groups: Record<string, ChatSession[]> = {
    Today: [],
    Yesterday: [],
    'Last 7 days': [],
    Older: [],
  };

  for (const s of sessions) {
    const updatedAt = (s.updatedAt as { toDate?: () => Date } | null)?.toDate?.() ?? new Date();
    if (updatedAt >= new Date(today.toDateString())) {
      groups['Today'].push(s);
    } else if (updatedAt >= new Date(yesterday.toDateString())) {
      groups['Yesterday'].push(s);
    } else if (updatedAt >= lastWeek) {
      groups['Last 7 days'].push(s);
    } else {
      groups['Older'].push(s);
    }
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

const SUBJECT_COLORS: Record<string, string> = {
  math: '#6163fe',
  science: '#0ea5e9',
};

export default function ChatHistorySidebar({ sessions, activeSessionId, onSelect, onNewChat }: Props) {
  const groups = groupByDate(sessions);

  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        borderRight: '1px solid #e2e8f0',
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* New chat button */}
      <div style={{ padding: '12px' }}>
        <button
          onClick={onNewChat}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 14px',
            background: '#6163fe',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New chat
        </button>
      </div>

      {sessions.length === 0 ? (
        <div style={{ padding: '24px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            No previous conversations yet.
          </p>
        </div>
      ) : (
        <div style={{ padding: '0 8px 16px' }}>
          {groups.map(({ label, items }) => (
            <div key={label}>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '12px 8px 4px',
                margin: 0,
              }}>
                {label}
              </p>
              {items.map((session) => {
                const isActive = session.id === activeSessionId;
                const msgCount = session.messages.length;
                const lastMsg = session.messages[session.messages.length - 1];
                const preview = lastMsg?.content?.slice(0, 60) ?? '';

                return (
                  <button
                    key={session.id}
                    onClick={() => onSelect(session)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? '#ede9fe' : 'transparent',
                      cursor: 'pointer',
                      marginBottom: '2px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {session.subject && (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#fff',
                          background: SUBJECT_COLORS[session.subject] ?? '#94a3b8',
                          borderRadius: '4px',
                          padding: '1px 5px',
                          flexShrink: 0,
                        }}>
                          {session.subject}
                        </span>
                      )}
                      <span style={{
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#6163fe' : '#334155',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}>
                        {session.title || 'Conversation'}
                      </span>
                    </div>

                    {/* Preview */}
                    {preview && (
                      <span style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                      }}>
                        {preview}
                      </span>
                    )}

                    {/* Meta */}
                    <span style={{ fontSize: '11px', color: '#cbd5e1' }}>
                      {msgCount} message{msgCount !== 1 ? 's' : ''}
                      {session.topics?.length > 0 && ` · ${session.topics.slice(0, 2).join(', ')}`}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
