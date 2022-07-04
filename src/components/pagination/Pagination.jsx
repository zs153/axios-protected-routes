const Pagination = ({nPages,currentPage,setCurrentPage}) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    const nextPage = () => {
      if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
      if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    
    return (
      <nav>
        <ul className='pagination py-1'>
          <li className="page-item">
            <a className="page-link" 
              onClick={prevPage} 
              href='#'>
              Anterior
            </a>
          </li>
          {/* {pageNumbers.map(pgNumber => (            
            <li key={pgNumber} 
              className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
              <a onClick={() => setCurrentPage(pgNumber)}  
                className='page-link' 
                href='#'>
                {pgNumber}
              </a>
            </li>          
          ))} */}
          <li className="page-item">
            <a className="page-link"
              onClick={nextPage}
              href='#'>
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    )
}

export default Pagination