import { useSortableData } from "../hooks/useSortableData";
import FraudeRow from './FraudeRow'

const FraudeList = ({lista, firstRecord, lastRecord, user}) => {
  const { items, requestSort } = useSortableData(lista);

  return (
    <>
      <table className="table table-vcenter table-striped sortable">
        <thead>
          <tr className="header">
            <th className="w-4"></th>
            <th className="w-8" onClick={() => requestSort("DESOFI")}>Oficina</th>
            <th className="w-6" onClick={() => requestSort("FECFRA")}>Fecha</th>
            <th className="w-5" onClick={() => requestSort("EJEFRA")}>Ejerc</th>
            <th className="w-8" onClick={() => requestSort("NIFCON")}>NIF</th>
            <th onClick={() => requestSort("NOMCON")}>Nombre</th>
            <th>Tipo</th>
            <th>Observaciones</th>
            <th className="w-4"></th>
          </tr>
        </thead>
        <tbody>
          {
            items.slice(firstRecord, lastRecord).map((element) => {
              if (element) {
                return (
                  <tr key={element.IDFRAU}>
                    <FraudeRow element={element} user={user} />
                  </tr>
                )
              }            
              return null
            }) 
          }
        </tbody>
      </table>
    </>
  )
}

export default FraudeList