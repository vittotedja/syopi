import { useEffect, useState } from "react";
import Shipping from './Shipping'

function ShippingList() {
  const [shipping, setShipping] = useState(Array())

  function fetchData() {  
    fetch("http://127.0.0.1:5000/shipping")
    .then((response) => response.json())
    .then((data) => setShipping(data))
  }

  function addShipping() {
    const id = 'Vincent Lewi Bangsat'
    const from_port = 'a'
    const to_port = 'b'
    const status = 'c'
    const current_port = 'd'
    const order_id = 'e'
    const courier = 'f'
    const data = {
        id: id,
        from_port: from_port,
        to_port: to_port,
        status: status,
        current_port: current_port,
        order_id: order_id,
        courier: courier
    }
    fetch('http://127.0.0.1:5000/shipping', {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
      setShipping((shipping) => [...shipping, data[0]])
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Discover Your Recomended Products!
      <br/>
      <button onClick={() => addShipping()}>add ship</button>
      <div className="product-list">
        {shipping.map((ship) => {return <Shipping key={ship.id} from_port={ship.from_port} to_port = {ship.to_port} status={ship.status} order_id={ship.order_id} current_port={ship.current_port} courier={ship.courier}/>})}
      </div>
    </div>
  );
}

export default ShippingList;
