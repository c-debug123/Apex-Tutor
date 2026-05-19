// Server-compatible — no 'use client' needed (no hooks)

export default function SuggestedSources() {
  return (
    <aside
      className="hidden md:flex flex-col flex-shrink-0"
      style={{
        width: '280px',
        borderLeft: '1px solid #e2e8f0',
        background: '#ffffff',
      }}
    >
      <div
        className="flex-shrink-0 px-4"
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <p
          className="font-semibold uppercase tracking-wider"
          style={{ fontSize: '12px', color: '#94a3b8' }}
        >
          Suggested Sources
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 text-center">
        <p className="text-sm" style={{ color: '#94a3b8' }}>
          Sources will appear here as you chat.
        </p>
      </div>
    </aside>
  );
}
