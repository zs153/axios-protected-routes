import AvatarRow from './AvatarRow'
import MenuRow from './MenuRow'

const FraudeRow = ({element, user}) => {
  if (element.OBSFRA === null) {
    element.OBSFRA = ''
  }

  return (
    <>
      <AvatarRow element={element} />
      <td>
        <div className='w-8 d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.DESOFI}</div>
        </div>
      </td>
      <td>
        <div className='w-6 d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.STRFEC}</div>
        </div>
      </td>
      <td>
        <div className='w-5 d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.EJEFRA}</div>
        </div>
      </td>
      <td>
        <div className='w-8 d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.NIFCON}</div>
        </div>
      </td>
      <td>
        <div className='d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.NOMCON}</div>
        </div>
      </td>
      <td>
        <div className='d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.DESTIP}</div>
        </div>
      </td>
      <td>
        <div className='d-flex py-1 align-items-center'>
          <div className='font-weight-medium'>{element.OBSFRA.length > 30 ? element.OBSFRA.slice(0,30) + '...': element.OBSFRA}</div>
        </div>
      </td>
      <MenuRow element={element} user={user}/>
    </>
  )
}

export default FraudeRow