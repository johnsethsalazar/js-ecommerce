const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`)

  const { orderDetails, customer } = await res.json()
  const {street, city, state, postalCode, country} = orderDetails.shippingAddress
  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer Name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping Address: <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping Rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
    </div>
  )
}

export default OrderDetails