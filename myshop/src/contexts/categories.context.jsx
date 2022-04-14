import {createContext, useState, useEffect} from 'react'

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'


export const CategoriesContext = createContext({
    categoriesMap :{}
})

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setCategoriesMap] = useState({});


    useEffect(()=>{
        const getCategories = async () =>{
            const cateforyMap = await getCategoriesAndDocuments()
            console.log(cateforyMap)
            setCategoriesMap(cateforyMap)
        }
        getCategories()
    },[])

    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}