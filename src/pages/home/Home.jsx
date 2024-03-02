import React, { useContext, useEffect, useState } from 'react'
import HeroBanner from './HeroBanner/HeroBanner'
import FlashSales from './FlashSales/FlashSales'
import styles from '../../styles'
import ProductCategories from './ProductCategories/ProductCategories'
import BestSelling from './BestSelling/BestSelling'
import MusicExperience from './MusicExperience/MusicExperience'
import Explore from './Explore/Explore'
import Arrivals from './Arrivals/Arrivals'
import DeliveryGuarantee from './DeliveryGuarantee/DeliveryGuarantee'
import Workshop from './Workshop/Workshop'

import { collection, getDocs, addDoc, setDoc, doc, getDoc, updateDoc, arrayUnion, query, where } from "firebase/firestore"; 
import { db } from '../../firebase/firebase.config'
import { AuthContext } from '../../context/AuthProvider'
import { allProducts } from '../../constants/allProducts'
import { gamePadConsole, keyboardItem, monitorItem } from '../../constants/products'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../features/cart/cartSlice'
import { updateProfile } from 'firebase/auth'
import { productSize } from '../../constants'
import { FeaturedProducts } from '../../components'

const Home = () => {
  const {id} = useParams()
  const [info, setInfo] = useState([])
  const [userParam, setUserParam] = useState({})
  const {user} = useContext(AuthContext)
  const dispatch = useDispatch()
  
  
  return (
    <div>
      <div>
        <HeroBanner />
        <FeaturedProducts />
        <FlashSales />
        <ProductCategories />
        <Workshop />
        <BestSelling />
        <MusicExperience />
        <Explore />
        <Arrivals />
        <DeliveryGuarantee section="hero" />
      </div>
    </div>
  )
}

export default Home