import {FiSearch} from 'react-icons/fi'

const Search = ({texto, setTexto}) => {
  return (
    <div className="input-icon me-3">
      <span className='input-icon-addon'><FiSearch className='opacity-70'/></span>
      <input 
        type="text" 
        className="form-control me-3" 
        value={texto}
        placeholder={'Buscar fraude...'}
        onChange={(e) => setTexto(e.target.value)}
      />
    </div>
  )
}

export default Search