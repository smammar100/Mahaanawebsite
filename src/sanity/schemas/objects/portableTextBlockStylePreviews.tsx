import React from "react";

/** In-Studio preview for blockquote style (chosen via the block type menu, not a toolbar icon). */
export function BlockquoteStylePreview(props: { children?: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: "3px solid #7042d2",
        margin: "0.35em 0",
        paddingLeft: "0.85rem",
        fontStyle: "italic",
      }}
    >
      {props.children}
    </blockquote>
  );
}

export function PullquoteStylePreview(props: { children?: React.ReactNode }) {
  return (
    <aside
      style={{
        margin: "0.35em 0",
        padding: "0.65rem 0.85rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        fontStyle: "italic",
      }}
    >
      {props.children}
    </aside>
  );
}
