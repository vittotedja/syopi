

function User(props: any) {
  return (
    <div className='cart-item'>
        <p className='Email'>{props.Email}</p>
        <p className='Username'>{props.Username}</p>
        <p className='ProductId'>{props.ProductId}</p>
        <p className='Qty'>{props.Quantity}</p>
        <button>Checkout</button>
    </div>
  )
}

export default User