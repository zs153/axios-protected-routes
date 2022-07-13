import FraudeRow from './FraudeRow'
import useSortableTable from '../hooks/useSortableTable'
import { VisuallyHidden, BlankButton } from './styles'

const FraudeList = ({lista, user}) => {
  const {items, requestSort, sortConfig} = useSortableTable(lista, props.config)

  const SortButton = ({direction,id,onClick,sortBy}) => {
    const arrows = {asc: '↓', des: '↑'}
    const arrow = sortBy === id ? arrows[direction] : ' '

    return (
      <BlankButton id={id} onClick={onClick}>
        {arrow}
        <VisuallyHidden>Sort {direction}</VisuallyHidden>
      </BlankButton>
    )
  }

  return (
    <>
      <table className="table table-vcenter table-striped">
        <thead>
          <tr className="header">
            <th className="w-4"></th>            
            <th className="w-8" direction={sortConfig?.direction} id='desofi' onClick={() => requestSort('desofi')} sortBy={sortConfig?.key}>Oficina</th>
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
            items.map((element) => {
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