import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: number | string }>({
  columns,
  data,
  actions,
  emptyMessage = 'No hay datos para mostrar',
}: DataTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as ReactNode;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>
                {column.header}
              </th>
            ))}
            {actions && <th className="text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8">
                <div className="text-base-content/60">{emptyMessage}</div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover">
                {columns.map((column, index) => (
                  <td key={index} className={column.className}>
                    {getCellValue(row, column)}
                  </td>
                ))}
                {actions && <td className="text-right">{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
