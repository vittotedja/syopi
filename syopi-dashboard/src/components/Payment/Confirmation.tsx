import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Stripe from './Stripe'

function Confirmation() {
  const [searchParams] = useSearchParams()
  const data = searchParams.get('data') || [];
  const result = JSON.parse(data)

  return (
    <>
    <div>Confirmation</div>
    <div>{(data)}</div>
    <Stripe data = {result}/>
    </>
  )
}

export default Confirmation