import React from 'react'

const AvatarRow = ({element}) => {
  let color
  const estadosFraude = {
    pendiente: 0,
    asignado: 1,
    resuelto: 2,
  }
  if (element.STAFRA === estadosFraude.pendiente) {
    color = 'bg-red-lt'
  } else if (element.STAFRA === estadosFraude.asignado) {
    color = 'bg-blue-lt'
  } else {
    color = 'bg-green-lt'
  }

  return (    
    <td>
      <div className='w-4 align-items-center py-1'>
        <span className={`avatar avatar-rounded ${color}`}>
          <h6>{element.LIQFRA}</h6>
        </span>
      </div>
    </td>
  )
}

export default AvatarRow