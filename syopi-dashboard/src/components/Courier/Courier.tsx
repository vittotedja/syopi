import React, {useState} from 'react'

export default function Courier() {
    const [orders, setOrders] = useState(Array)

    function fetchData(){
        fetch("http://127.0.0.1:5000/order/")
    }


  return (
    <>
        <div>Courier</div>
        <div>
            See All Available Orders
        </div>
    </>

  )
}
