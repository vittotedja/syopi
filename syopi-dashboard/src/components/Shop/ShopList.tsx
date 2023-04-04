import { useState, useEffect } from 'react'
import Shop from './Shop'
import './Shop.css'

function ShopList() {
  const [shopList, setShopList] = useState([]);

  async function fetchShops() {
    try {
      const response = await fetch("http://localhost:5005/shop/");
      const data = await response.json();
      setShopList(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchShops()
    console.log(shopList)
  }, []);
  return (
    <>
      <div>Nyari Toko Disini</div>
      <div className="shop-list">
        {shopList.map((shop, index) => (
          <Shop shop={shop} key={index} />
        ))}
      </div>
    </>
  )
}

export default ShopList