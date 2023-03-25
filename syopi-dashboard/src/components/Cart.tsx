import { useEffect, useState } from 'react'

function Cart() {
  const [data, setData] = useState(Array)
  const [product, setProduct] = useState(Array)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/getcartsproduct/1`)
    .then((response) => response.json())
    .then((data) => setData(data))
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  }, [])

  return (
    <div>
      Your Cart
      {data.map((item:any) => {return <div key= {item.ProductId}>{item.ProductName}</div>})}
    </div>
  )
}

export default Cart