import { useState } from "react";
import { useMemo } from "react";

const sortTableData = (array, {key, direction}) => {
  return array.sort((a,b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1:1;
    if (a[key] > b[key]) return direction === 'asc' ? 1:-1;

    return 0
  })
}

const useSortableTable = (items = [], config) => {
  const [sortConfig, setSortConfig] = useState(config)
  
  const sortedItems = useMemo(() => {
    if (!sortConfig) return items

    return sortTableData(items, {...sortConfig})
  }, [items, sortConfig])

  const requestSort = key => {
    let direction = 'des'

    if (sortConfig && sortConfig.key === key && sortConfig?.direction === 'des') {
      direction = 'asc';
    }

    setSortConfig({key,direction})
  }

  return {items: sortedItems, requestSort, sortConfig}
}

export default useSortableTable