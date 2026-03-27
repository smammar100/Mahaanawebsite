export interface ContentTableValue {
  caption?: string;
  firstRowIsHeader?: boolean;
  rows?: Array<{ _key?: string; cells?: string[] }>;
}

function rowKey(row: { _key?: string } | undefined, index: number) {
  return row?._key ? String(row._key) : `row-${index}`;
}

export function ContentTableBlock({ value }: { value: ContentTableValue }) {
  const rows = value.rows || [];
  const firstRowIsHeader = value.firstRowIsHeader !== false;
  if (rows.length === 0) return null;

  const bodyRows = firstRowIsHeader ? rows.slice(1) : rows;
  const headerRow = firstRowIsHeader ? rows[0] : null;
  const headerCells = headerRow?.cells || [];

  return (
    <figure className="my-8 w-full">
      {value.caption ? (
        <figcaption className="mb-3 text-body-sm font-medium text-text-secondary">
          {value.caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-surface-stroke bg-surface-card">
        <table className="w-full min-w-[16rem] border-collapse text-left text-body-sm text-text-tertiary">
          {headerCells.length > 0 ? (
            <thead>
              <tr className="border-b border-surface-stroke bg-surface-bg">
                {headerCells.map((cell, i) => (
                  <th
                    key={`h-${i}`}
                    scope="col"
                    className="px-4 py-3 font-semibold text-text-primary"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr
                key={rowKey(row, ri)}
                className="border-b border-surface-stroke last:border-b-0"
              >
                {(row.cells || []).map((cell, ci) => (
                  <td key={`c-${ri}-${ci}`} className="px-4 py-3 align-top text-text-tertiary">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
