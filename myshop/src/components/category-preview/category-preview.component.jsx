import React from 'react'
import './category-preview.styles.scss'
import {Link} from 'react-router-dom'

import ProductCard from '../product-card/product-card.component'


const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">

            <Link to={title}>
                <h2>
                    <span className="title" >{title.toUpperCase()}</span>
                </h2>
            </Link>
            <div className="preview">
                {
                    products.filter((_, idx) => idx < 4).
                    map((product)=> 
                    <ProductCard key={product.id} product={product} />
                    )
                }
            </div>
            
        </div>
    )
}

export default CategoryPreview

