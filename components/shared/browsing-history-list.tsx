'use client'

import useBrowsingHistory from '@/hooks/use-browsing-history'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import ProductSlider from './product/product-slider'

export default function BrowsingHistoryList({
  className,
}: {
  className?: string
}) {
  const { products } = useBrowsingHistory()
  return (
    products.length !== 0 && (
      <div className='bg-background'>
        <Separator className={cn(className)} />
        <ProductList title={'Your Browsing History'} type='related' />
        <Separator className='mb-4' />
        <ProductList
          title={'Your Browsing History'}
          hideDetails
          type='history'
        />
      </div>
    )
  )
}

function ProductList({
  title,
  type = 'history',
  hideDetails = false,
}: {
  title: string
  type?: 'history' | 'related'
  hideDetails?: boolean
}) {
  const { products } = useBrowsingHistory()
  const [data, setData] = React.useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${products
          .map((product) => product.category)
          .join(',')}&ids=${products.map((product) => product.id).join(',')}`
      )
      const data = await res.json()
      setData(data)
    }
    fetchProducts()
  }, [products, type])

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  )
}
