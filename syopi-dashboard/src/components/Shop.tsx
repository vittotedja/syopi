import React from 'react'
import shoppics from '../assets/logofornow.jpg'

function Shop() {
  return (
    <div className='shop-card'>
        <img src = {shoppics} alt="shop pic" width={"80px"}/>
        <p className='shop-title'>Sanur Mangga Dua PIK</p>
        <p className='address'>Ruko Garden, Jl. Pantai Indah Kapuk No.10, RW.2, Kamal Muara, Kec. Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14470, Indonesia</p>
        <p className='phone-number'>9005 7237</p>
        <p className='status'>Active</p>
        <button>View Shop</button>
    </div>
  )
}

export default Shop