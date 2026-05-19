'use client';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* Apex avatar */}
      <div
        aria-hidden="true"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-xs font-bold text-white shadow-sm"
      >
        A
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div role="status" aria-live="polite" aria-label="Apex is typing" className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0s]" />
          <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.15s]" />
          <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
}
