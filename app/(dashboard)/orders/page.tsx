const Orders = async () => {
  const res = await fetch("http://localhost:3000/api/orders")
  const orders = await res.json()

  console.log(orders)
  return (
    <div>Orders</div>
  )
}

export default Orders