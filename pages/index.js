import React from 'react'
import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({products, banners}) => {
  return (
    <>
      <HeroBanner herobanner={banners.length && banners[0]}/>
      { console.log(banners)}
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers</p>
      </div>
      <div className='products-container'>
        {/* {products.map((prod) => console.log(prod.slug?.current))} */}
        { products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerbanner={banners && banners[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)
  const bannerQuery = '*[_type == "banner"]'
  const banners = await client.fetch(bannerQuery)

  return {
    props: {
      products, banners
    }
  }
}

export default Home
