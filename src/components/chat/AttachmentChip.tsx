'use client';

interface AttachmentChipProps {
  file: File;
  onRemove: () => void;
}

export default function AttachmentChip({ file, onRemove }: AttachmentChipProps) {
  const isPdf = file.type === 'application/pdf';
  const label = isPdf ? 'PDF' : 'IMG';

  return (
    <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5">
      <span className="rounded bg-orange-500 px-1.5 py-0.5 text-xs font-bold tracking-wide text-white">
        {label}
      </span>
      <span className="max-w-[180px] truncate text-sm text-gray-700">{file.name}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove attachment ${file.name}`}
        className="ml-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-orange-200 hover:text-orange-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  );
}
