import React, { useContext } from 'react'
import styles from '../../../styles'
import { Button, Spinner, SubHeading } from '../../../components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Ratings from '../../../components/Ratings/Ratings';
import { allProducts } from '../../../constants/allProducts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToWishlist, removeFromWishlist } from '../../../features/wishlist/wishlistSlice';
import { AuthContext } from '../../../context/AuthProvider';

const Explore = () => {
    const [info, setInfo] = useState([])
    const [isWishlist, setIsWishlist] = useState(false)
    const [activeItem, setActiveItem] = useState(null)
    const navigation = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch();
    const {user} = useContext(AuthContext)

    const getInfo = async () => {
    const q = query(collection(db, "all"), where("explore", "==", true))
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
    }
    
    useEffect(() => {
      getInfo()
    }, [])


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product))
        setIsWishlist(true)
        setActiveItem(product?.name)
  
        
          
          const updateCart = async () => {
            const updatUser = doc(db, "users", user?.uid);
            
            try {
              await updateDoc(updatUser, {
                wishlists: arrayUnion({...product, added: true})
                
              });
              
            } catch (error) {
              console.log(error.message)
            }
            
          }
          
          updateCart()
        
  
  
      }
  
      const handleRemoveFromWishlist = (product) => {
        dispatch(removeFromWishlist(product))
        setIsWishlist(false)
        setActiveItem(product?.name)
  
        const updateCart = async () => {
          const updatUser = doc(db, "users", user?.uid);
            
          try {
            await updateDoc(updatUser, {
              wishlists: arrayRemove(product)
               
            });
            console.log("Removed")
            
          } catch (error) {
            console.log(error.message)
          }
  
        }
  
        updateCart()
      }

  return (
    <div className={`${styles.section} ${styles.padding}`}>
        <SubHeading heading="Our Products" />
        <h2 className={styles.heading}>Explore Our Products</h2>

        {info?.length >=1 
            ?
                <div>

                    <div className={`flex gap-4 md:gap-[3rem] justify-center flex-wrap mt-[4rem]`}>
                        {info?.map((item) => (
                            <div key={item.id} className=' w-[150px] sm:w-[180px] h-[370px] mb-9'>
                                        
                                <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                                    {item.isNew ? 
                                        <div className={`absolute left-2 top-2 bg-lightGreen md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                                        <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>NEW</p>
                                        </div>
                                        : ''
                                    
                                    
                                    }


                                    <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                                        <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer hover:bg-primary`}>
                                            <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                                        </div>
                                    </div>
                                    <Link className='flex justify-center items-center mt-4 w-full' to={`/product/${item.id}`}>
                                    <div className='w-[50%] h-[50%] cursor-pointer'>
                                        <img src={item.img || item.image || item.imageProfile} className=' object-cover w-[100px]' />
                                    </div>
                                    </Link>

                                    <div className='bg-primaryBlack w-full text-center mt-2'>
                                    <button onClick={() => handleAddToCart(item)} className='font-poppins w-full md:text-[14px] text-[12px] py-2 text-primaryWhite font-medium'>Add to Cart</button>
                                    </div>
                                </div>
                                
                        

                                <div className='mt-3'>
                                    <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                                    <div className='flex items-center gap-2 mt-1'>
                                    <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                                    <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                                    </div>
                                    <div className='flex items-end gap-2'>
                                    <Ratings ratings={item.ratings} color="#FFAD33" />
                                    <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                                    </div>
                                </div>
                            </div>
                        ))}


                          
                    </div>

                    <div onClick={() => navigation('/shop')} className='flex justify-center'>
                        <Button text="View All Products" />
                    </div>
                </div>
            :   <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>

        }


    </div>
  )
}

export default Explore