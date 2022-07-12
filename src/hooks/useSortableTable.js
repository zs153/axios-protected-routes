import { useState } from "react";

function useSortableTable(data) {
  const [tableData, setTableData] = useState(data);

  const handleSorting = (sortField, dir) => {
    const sorted = [...tableData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      return aValue > bValue ? (1 * dir) : (-1 * dir)
    });

    setTableData(sorted)
  }

  return [tableData, handleSorting];
}
