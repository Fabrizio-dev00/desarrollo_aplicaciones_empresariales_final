import { useEffect } from 'react'
import { c as _c } from "react/compiler-runtime";
import useStore from '../store/Store'
import CardList from '../components/CardList'

const Entities = () => {
  const { 
    items, 
    currentPage, 
    totalPages, 
    fetchItems, 
    setPage, 
    isLoading, 
    apiConfig 
  } = useStore()

  useEffect(() => {
    fetchItems(1)
  }, [])

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      if (apiConfig.manualPagination) {
        setPage(newPage)
      } else {
        fetchItems(newPage)
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      if (apiConfig.manualPagination) {
        setPage(newPage)
      } else {
        fetchItems(newPage)
      }
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Todos los {apiConfig.name}</h1>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <CardList items={items} />
          ) : (
            <p className="text-center">No hay elementos para mostrar</p>
          )}

          {/* Paginación - SIEMPRE visible si hay más de 1 página */}
          <nav className="mt-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  ← Anterior
                </button>
              </li>

              {/* Números de página */}
              {totalPages > 0 && [...Array(Math.min(totalPages, 5))].map((_, index) => {
                // Mostrar máximo 5 páginas centradas en la actual
                let pageNum
                if (totalPages <= 5) {
                  pageNum = index + 1
                } else if (currentPage <= 3) {
                  pageNum = index + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index
                } else {
                  pageNum = currentPage - 2 + index
                }

                return (
                  <li 
                    key={pageNum} 
                    className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => {
                        if (apiConfig.manualPagination) {
                          setPage(pageNum)
                        } else {
                          fetchItems(pageNum)
                        }
                      }}
                    >
                      {pageNum}
                    </button>
                  </li>
                )
              })}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Siguiente →
                </button>
              </li>
            </ul>

            {/* Indicador de página actual */}
            <p className="text-center text-muted mt-2">
              Página {currentPage} de {totalPages}
            </p>
          </nav>
        </>
      )}
    </div>
  )
}

export default Entities