import React, { useState, useEffect } from 'react'
import styles from '../../../styles'
import { Button, SubHeading, Ratings, Spinner } from '../../../components'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link } from 'react-router-dom'
import { bestsellingProducts } from '../../../constants/bestsellingProducts'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { addToWishlist, removeFromWishlist } from '../../../features/wishlist/wishlistSlice';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';


const BestSelling = () => {
    const [info, setInfo] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const [isWishlist, setIsWishlist] = useState(false)
    const [activeItem, setActiveItem] = useState(null)
    const {user} = useContext(AuthContext)

    const getInfo = async () => {
    const q = query(collection(db, "all"), where("bestSelling", "==", true))
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
        <SubHeading heading="This Month" />
        <div className={styles.flexBetween}>
            <h2 className={`w-full ${styles.heading}`}>Best Selling Products</h2>
        </div>

        {info?.length >= 1
            ?
        
                <div className={`flex flex-wrap justify-center md:justify-start mt-[4rem] gap-4 sm:gap-10`}>
                    {info?.map((item) => (
                        <div key={item.id} className=' w-[150px] sm:w-[180px] h-[370px] mb-8'>
                                    
                            <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                                <div className={`absolute left-2 top-2 bg-primaryBlue md:px-4 md:py-2 px-3 py-1 flex justify-center items-center`}>
                                <p className={`text-primaryWhite font-poppins text-[10px] md:text-[12px] font-normal`}>BEST DEALS</p>
                                </div>

                                <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                                    <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary`}>
                                        <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                                    </div>
                                </div>
                                <Link className='flex justify-center items-center mt-4 w-full' to={`/product/${item.id}`}>
                                <div className='w-[50%] h-[50%] cursor-pointer'>
                                    <img src={item.img} className=' object-cover w-[100px]' />
                                </div>
                                </Link>

                                <div className='bg-primaryBlack w-full text-center mt-2'>
                                <button onClick={() => handleAddToCart(item)} className='font-poppins w-full md:text-[12px] text-[10px] py-2 text-primaryWhite font-medium'>Add to Cart</button>
                                </div>
                            </div>
                    

                            <div className='mt-3'>
                                <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                                <div className='flex items-center gap-2 mt-1'>
                                <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                                <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                                </div>
                                <div className='flex items-end gap-2'>
                                <Ratings ratings={item.ratings} size='15px' color="#FFAD33" />
                                <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
        }

    </div>
  )
}

export default BestSelling