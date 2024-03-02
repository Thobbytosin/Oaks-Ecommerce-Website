import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles'
import GoToTop from '../../components/GoToTop/GoToTop'
import { PageTag } from '../../components'
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import { AuthContext } from '../../context/AuthProvider'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { removeFromWishlist } from '../../features/wishlist/wishlistSlice'

const Wishlist = () => {
  const {user} = useContext(AuthContext)
  const [wishlist, setWishlist] = useState([])
  const dispatch = useDispatch()


  const userWishlist = useSelector((state) => state.wishlist.wishlist)
  // console.log(userWishlist)

    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
    }

    const handleRemoveFromWishlist = (product) => {
      dispatch(removeFromWishlist(product))

      const updateCart = async () => {
        const updatUser = doc(db, "users", user?.uid);
          
        try {
          await updateDoc(updatUser, {
            wishlists: arrayRemove(product)
             
          });
          // console.log("Removed")
          
        } catch (error) {
          console.log(error.message)
        }

      }

      updateCart()
    }


  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      <PageTag prevPage='Home' curPage='Wishlist' />
      {userWishlist.length < 1 
        ? <div className='w-full h-[50vh] flex justify-center items-center text-center font-poppins font-semibold text-neutral sm:text-[16px] text-[12px]'>You have no products yet in your Wishlist..</div>

        :
          <div className=' w-full border border-primaryGray'>
            <h2 className=' font-poppins text-[16px] md:text-[18px] font-medium m-4'>Wishlist</h2>
            <div className=' my-4 p-4 bg-[#E4E7E9] flex items-center text-left text-[10px] md:text-[12px] font-poppins font-semibold'>
              <p className=' sm:w-[40%] w-[20%]'>PRODUCTS</p>
              <p className='w-[20%]'>PRICE</p>
              <p className=' w-[20%]'>STOCK STATUS</p>
              <p className=' sm:w-[20%] w-[40%]'>ACTIONS</p>
            </div>
            <div className='mt-8'>
              {userWishlist?.map((item) => (
                <div key={item.id} className=' flex items-center p-4 my-4'>
                  {/* PRODUCTS */}
                  <div className='w-[20%] sm:w-[40%] flex items-center gap-4'>
                    <img src={item.imageProfile || item.img} className=' w-[50px]' />
                    <p className='sm:inline-block hidden font-poppins text-primaryBlack text-[10px]  md:text-[12px] max-w-[370px] md:max-w-[400px]'>{item.name}</p>
                  </div>
                  {/* PRICE */}
                  <div className=' w-[20%]'>
                    <p className=' font-poppins font-medium text-primaryBlack text-[10px] md:text-[12px]'>&#8358; {(item.price).toLocaleString()}</p>
                    <p className=' font-poppins font-medium text-primaryGray text-[10px] md:text-[12px] line-through'> &#8358; {(item.oldPrice).toLocaleString()}</p>
                  </div>
                  {/* STOCK STATUS */}
                  <div className=' w-[20%]'>
                    <p className={`${item.stock > 0 ? 'text-lightGreen' : 'text-primary'} font-poppins font-medium text-[10px] md:text-[12px]`}>{item.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}</p>
                  </div>
                  {/* ACTIONS */}
                  <div className=' w-[40%] sm:w-[20%] flex items-center gap-8'>
                    <button onClick={() => handleAddToCart(item)} className=' flex items-center gap-2 bg-primary text-primaryWhite font-poppins font-medium text-[8px] md:text-[12px] px-1 md:px-4 md:py-3 py-1'>
                      <span>ADD TO CART</span>
                      <span className='md:inline-block hidden'><ShoppingCartIcon style={{fontSize: 16}}  /></span>
                    </button>
                    <div onClick={() => handleRemoveFromWishlist(item)} className='hidden md:block text-neutral cursor-pointer'><HighlightOffIcon style={{fontSize: 22}} /></div>
                    <div onClick={() => handleRemoveFromWishlist(item)} className='md:hidden block text-neutral cursor-pointer'><HighlightOffIcon style={{fontSize: 18}} /></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
      }
    </div>
  )
}

export default Wishlist