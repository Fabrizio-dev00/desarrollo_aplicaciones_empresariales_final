const Card = ({ item }) => {
  return (
    <div className="card h-100 shadow-sm">
      {item.image && (
        <img
          src={item.image}
          className="card-img-top"
          alt={item.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        {item.subtitle && (
          <p className="card-text mb-1">
            <strong>Tipo:</strong> {item.subtitle}
          </p>
        )}
        {item.badge && (
          <p className="card-text mb-1">
            <span className="badge bg-primary">{item.badge}</span>
          </p>
        )}
        {item.extra && (
          <p className="card-text text-muted small">{item.extra}</p>
        )}
      </div>
    </div>
  )
}

export default Card