// --- File: components/ui/GenericTable.jsx ---

/**
 * Generic Table Component
 * Props:
 *  - columns: Array<{ label: string, accessor: string, className?: string }>
 *  - data: Array<object>
 *  - renderCell?: (row: object, accessor: string) => ReactNode
 */

const GenericTable = ({ columns = [], data = [], renderCell }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
      <table className="table-fixed min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className={`px-6 py-3 text-sm text-gray-900 truncate max-w-[200px] ${col.cellClass || ""}`}
                  >
                    {renderCell ? renderCell(row, col.accessor) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-400">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
