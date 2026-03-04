import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export default function Table<T>({ columns, data, isLoading }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl border border-zinc-100 italic text-zinc-400">
        Yüklənir...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border border-zinc-100 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/50">
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-4 text-sm font-semibold text-zinc-900">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-zinc-50/50 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-zinc-600">
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-zinc-400 italic">
                Məlumat tapılmadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
