import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ProductsList from './ProductsList/ProductsList'
import Promotions from './Promotions'
import ShopList from './Shop/ShopList'

function LandingPage() {
    return (
        <>
            <Navbar />
            <Promotions />
            <ProductsList />
            <ShopList />
        </>
    )
}

export default LandingPage