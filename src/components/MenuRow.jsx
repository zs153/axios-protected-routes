import { useState } from 'react'
import {BsPencil,BsTrash,BsHeart,BsXSquare,BsChatSquareText,BsCalendar,BsFlag,BsCheck2,BsThreeDotsVertical} from 'react-icons/bs'

const MenuRow = ({element, user}) => {
  const estadosFraude = {
    pendiente: 0,
    asignado: 1,
    resuelto: 2,
  }
  const tiposRol = {
    usuario: 1,
    responsable: 2,
    admin: 3,
  }

  const [estado, setEstado] = useState(element.STAFRA)
  let menu = []

  if (estado === estadosFraude.pendiente) {
    menu = [
      {id: 1, des: 'Editar fraude', icon: <BsPencil className='dropdown-item-icon' />}, 
      {id: 2, des: 'Borrar fraude', icon: <BsTrash className='dropdown-item-icon' />}, 
      {id: 3, des: 'Asignar fraude', icon: <BsHeart className='dropdown-item-icon' />},
    ]
  } else if (estado === estadosFraude.resuelto) {
    menu = [
      {id: 1, des: 'Editar fraude', icon: <BsPencil className='dropdown-item-icon' />}, 
      {id: 2, des: 'Desasignar fraude', icon: <BsXSquare className='dropdown-item-icon' />}, 
      {id: 3, des: 'Enviar sms', icon: <BsChatSquareText className='dropdown-item-icon' />},
    ]
  } else {
    if (element.LIQFRA === user.userId || user.rol === tiposRol.admin) {
      menu = [
        {id: 1, des: 'Editar fraude', icon: <BsPencil className='dropdown-item-icon' />},
        {id: 2, des: 'Resolver fraude', icon: <BsCheck2 className='dropdown-item-icon' />},
        {id: 3, des: 'Desasignar fraude', icon: <BsXSquare className='dropdown-item-icon' />},
        {id: 4, des: 'Nuevo ejercicio', icon: <BsCalendar className='dropdown-item-icon' />},
        {id: 5, des: 'Hitos/Eventos', icon: <BsFlag className='dropdown-item-icon' />},
        {id: 6, des: 'Enviar sms', icon: <BsChatSquareText className='dropdown-item-icon' />},
      ]
    }
  }

  const editClick = () => {
    setEstado()
  }

  return (
    <td>
      <div className='w-4'>
        <ul className='dots-menu'>
          <li className='nav-item drop-right'>
            <a href="#" className='nav-link'><i><BsThreeDotsVertical /></i></a>
            <ul>
              {menu.map((item) => {
                return (
                  <li key={item.id} className='nav-item'>
                    <a href="#" className='nav-link'>
                      {item.icon}{item.des}
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    </td>
  )
}



export default MenuRow