import React, {useContext} from 'react'
import {ProductsContext} from '../../contexts/products.context'
import ProductCard from '../../components/product-card/product-card.component'

import './shop.styles.scss'

const Shop = () => {

    const {products} = useContext(ProductsContext)
    return (
        <div className="products-container">
            {products.map((val)=>{
                return(
                    <ProductCard key={val.id} product={val} />
                )
            })}
        </div>  
    )
}

export default Shop
