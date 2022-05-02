import './category-item.styles.scss'
import {useNavigate} from 'react-router-dom'

const CategoryItem = ({category}) =>{
    const {imageUrl, title} = category
    const navigate = useNavigate()

    const handleShopItem = (title) =>{
        console.log(title)
        navigate(`shop/${title}`)
    }

    return(
        <div className="category-item-container">
            
            <div className="background-image" style={{backgroundImage: `url(${imageUrl})` }}/>
                 <div onClick={() => handleShopItem(title)} className="category-item-body-container">
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </div>
               
    
        </div>
    )
}

export default CategoryItem