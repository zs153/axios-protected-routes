import { BsCheck2} from 'react-icons/bs'
import { FcTodoList, FcCheckmark } from 'react-icons/fc'

const ShowResueltos = ({showResueltos, setShowResueltos}) => {
  const handleClick = () => {
    setShowResueltos(!showResueltos)
  }

  return (
    <>
      <a href="#" className='btn btn-warning' onClick={handleClick}>
          {showResueltos ? 
            (
              <div>
                <FcTodoList className='opacity-70 me-2 icon-inline'/>
                Ver pendientes
              </div>
            )
          : 
            (
              <div>
                <FcCheckmark className='opacity-70 me-2 icon-inline'/>            
                Ver resueltos
              </div>
            )
          }
      </a>
    </>
  )
}

export default ShowResueltos