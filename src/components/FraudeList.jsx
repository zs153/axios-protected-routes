import FraudeRow from './FraudeRow'
import { useSortableTable } from '../hooks/useSortableTable'
import { useState } from 'react'

const FraudeList = ({lista, user}) => {
  const [tableData, handleSorting] = useSortableTable(lista)
  const [order, setOrder] = useState('des')

  const handleSortingChange = (accessor) => {
    setOrder(!order)

  }

  return (
    <>
      <table className="table table-vcenter table-striped sortable" id='tblFraudes'>
        <thead>
          <tr className="header">
            <th className="w-4"></th>
            <th className="w-8" onClick={handleSorting}>Oficina</th>
            <th className="w-6">Fecha</th>
            <th className="w-5">Ejerc</th>
            <th className="w-8">NIF</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Observaciones</th>
            <th className="w-4"></th>
          </tr>
        </thead>
        <tbody>
          {
            lista.map((element) => {
            if (element) {
              return (
                <tr key={element.IDFRAU}>
                  <FraudeRow element={element} user={user}/>
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