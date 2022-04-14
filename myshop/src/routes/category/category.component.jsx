import React, {useContext, useState, useEffect} from 'react'
import './category.styles.scss'
import {useParams} from 'react-router-dom'

import {CategoriesContext} from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'

export const Category = () => {
    
    const {category} = useParams()

    const {categoriesMap} = useContext(CategoriesContext)

    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[categoriesMap, category])

    return(
        <div className="category-container">
            {
               products && products.map((product) => {
                    return(
                        <ProductCard key={product.id} product={product} />
                    )
                })
            }
        </div>
    )
}

export default Category
