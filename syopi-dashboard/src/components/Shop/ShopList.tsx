import { useState, useEffect } from 'react'
import Shop from './Shop'
import './Shop'

function ShopList() {
  const [shopList, setShopList] = useState([]);

  async function fetchShops() {
    try {
      const response = await fetch("http://127.0.0.1:5001/shop");
      const data = await response.json();
      setShopList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchShops()
  }, []);

  return (
    <>
      <div>Nyari Toko Disini</div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {shopList.map((shop, index) => (
          <Shop shop={shop} key={index} />
        ))}
      </div>
    </>
  )
}

export default ShopList