'use client';

import { type Visual } from './MessageBubble';

interface VisualBlockProps {
  visual: Visual;
}

function normalizeSvg(code: string): string {
  // Replace width/height attributes on the <svg> opening tag so the SVG scales responsively
  return code.replace(
    /(<svg\b[^>]*?)\s+width="[^"]*"/i,
    '$1 width="100%"'
  ).replace(
    /(<svg\b[^>]*?)\s+height="[^"]*"/i,
    '$1 height="auto"'
  );
}

export default function VisualBlock({ visual }: VisualBlockProps) {
  if (visual.type === 'svg' && visual.code) {
    const normalizedSvg = normalizeSvg(visual.code);
    return (
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          background: '#fafafa',
          overflow: 'hidden',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: normalizedSvg }} />
        {visual.caption && (
          <p
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              textAlign: 'center',
              marginTop: '8px',
              marginBottom: '0',
            }}
          >
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  if (visual.type === 'desmos' && visual.expression) {
    const expression = visual.expression;
    const desmosUrl = `https://www.desmos.com/calculator?${new URLSearchParams({
      state: JSON.stringify({
        version: 9,
        graph: { viewport: { xmin: -10, ymin: -10, xmax: 10, ymax: 10 } },
        expressions: {
          list: [{ type: 'expression', id: '1', latex: expression }],
        },
      }),
    }).toString()}`;

    return (
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          background: '#fafafa',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}
        >
          {/* Graph icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6163fe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            Function graph
          </span>
        </div>
        <code
          style={{
            display: 'block',
            background: '#f1f5f9',
            color: '#6163fe',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            marginBottom: '12px',
            wordBreak: 'break-all',
          }}
        >
          {expression}
        </code>
        <a
          href={desmosUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: '#6163fe',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          View graph
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        {visual.caption && (
          <p
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              marginTop: '10px',
              marginBottom: '0',
            }}
          >
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  return null;
}
