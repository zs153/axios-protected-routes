import { usePagination, DOTS } from "../../hooks/usePaginationRange"
import classnames from 'classnames'
import './pagination.css'

const Pagination = ({ totalCount, pageSize, className, currentPage, setCurrentPage }) => {
    const paginationRange = usePagination ({
      currentPage,
      totalCount,
      pageSize,
    })
    
    const nextPage = () => {
      setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
      setCurrentPage(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length -1]
    return (
      <nav>
        <ul className={classnames('pagination-container', {[className]: className})}>          
          <li className={classnames("pagination-item", {disable: currentPage === 1})}
            onClick={prevPage} 
          >
            <div className="arrow left" />
          </li>

          {paginationRange.map(pgNumber => {
            if (pgNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }

            return (
              <li key={pgNumber} 
                className= {classnames('pagination-item', {selected: pgNumber === currentPage})}
                  onClick={() => setCurrentPage(pgNumber)}
                >
                  {pgNumber}
              </li>
            )
          })}

          <li className={classnames('pagination-item', {disable: currentPage === lastPage})}
            onClick={nextPage}
          >
            <div className="arrow right" />
          </li>
        </ul>
      </nav>
    )
}

export default Pagination