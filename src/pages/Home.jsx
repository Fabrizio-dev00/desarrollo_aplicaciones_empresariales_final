import { useEffect } from 'react'
import CardList from '../components/CardList'
import useStore from '../store/Store'

const Home = () => {
  const { items, fetchItems, isLoading, apiConfig } = useStore()

  useEffect(() => {
    if (items.length === 0) {
      fetchItems(1)
    }
  }, [items.length, fetchItems])

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">{apiConfig.name}</h1>
        <p className="lead text-muted">
          Explora la colección de datos de {apiConfig.name}
        </p>
      </div>

      {/* CardList con 6 elementos */}
      <h2 className="mb-4">Elementos Destacados</h2>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <CardList items={items.slice(0, 6)} />
      )}
    </div>
  )
}

export default Home