import Card from './Card'

const CardList = ({ items }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {items.map((item) => (
        <div className="col" key={item.id}>
          <Card item={item} />
        </div>
      ))}
    </div>
  )
}

export default CardList