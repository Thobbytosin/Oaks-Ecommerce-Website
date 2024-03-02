import React, { useState, useEffect, useContext } from 'react'
import styles from '../../styles'
import EastIcon from '@mui/icons-material/East';
import { featured } from '../../constants/images'
import SubHeading from '../SubHeading/SubHeading';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import Ratings from '../Ratings/Ratings';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../Spinner/Spinner';

const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const [isWishlist, setIsWishlist] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [info, setInfo] = useState([])
  const [wishlist, setWishlist] = useState([])
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
        
  const getInfo = async () => {
    const q = query(collection(db, "all"), where("featured", "==", true))
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
    }
    
    useEffect(() => {
      getInfo()
    }, [])

  const getWishlistInfo = async () => {
    const q = doc(db, "users", user?.uid)
    const docSnap = await getDoc(q)
    const info = docSnap.data() 
      
    setWishlist(info.wishlists)
    }
    
    useEffect(() => {
      getWishlistInfo()
    }, [])

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
      <SubHeading heading="Featured" />
        {info?.length >= 1
          ?
            <div className={` ${styles.flexItemsStart} md:gap-10 gap-8`}>
              <div className='hidden sm:w-[300px] md:w-[350px] bg-slate-500 sm:flex flex-col'>
                <div className=' w-full min-h-[200px] bg-[#F3DE6D] text-center md:px-0 px-6 py-8'>
                  <h2 className=' text-[10px] md:text-[12px] text-primary font-poppins'>COMPUTER & ACCESSORIES</h2>
                  <h2 className=' md:text-[26px] sm:text-[20px] font-poppins text-primaryBlack font-medium my-4'>32% Discount</h2>
                  <p className='text-[10px] md:text-[12px] text-primaryBlack font-medium font-poppins mb-2'>For all ellectronics products</p>
                  <p className=' mt-4 font-poppins text-[10px] md:text-[14px]'>Offers ends: <span className=' sm:block md:inline-block md:ml-2 md:bg-primaryWhite text-primaryBlack md:px-4 py-1 font-bold md:font-medium text-[10px]'>31st January 2024</span></p>
                  <button onClick={() => navigate('/category/computers') } className=' bg-primary text-primaryWhite px-4 py-2 mt-[3.5rem] font-poppins text-[12px]'>
                    SHOP NOW <span className=' ml-2'><EastIcon style={{fontSize: 18}} /></span>
                  </button>
                </div>

                <div className=' w-full  bg-green-400 overflow-hidden'>
                  <img src={featured} alt="" className=' object-cover w-full' />

                </div>

              </div>

              <div className=' w-full '>
                <h2 className={`font-inter text-primaryBlack font-semibold md:text-[24px] text-[22px]`}>Featured Products</h2>
                <div className=' w-full mt-8 md:mt-12 flex flex-wrap justify-center md:justify-start sm:gap-8 gap-4'>
                      {info?.map((item) => (
                      <div key={item.id} className=' w-[150px] sm:w-[180px] h-[370px] slide-left '>
                                                    
                        <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-dimWhite relative'>
                          {item.isNew &&
                                  <div className={`absolute left-2 top-2 bg-lightGreen md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                                  <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>NEW</p>
                                  </div>
                          }
                          {item.isHot &&
                                  <div className={`absolute left-2 top-2 bg-primary md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                                  <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>HOT</p>
                                  </div>
                          }
                          {item.bestDeal &&
                                  <div className={`absolute left-2 top-2 bg-primaryBlue md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                                  <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>BEST DEALS</p>
                                  </div>
                          }

                        <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                            <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer`}>
                                <FavoriteBorderIcon style={{fontSize: 21}} />
                            </div>
                        </div>
                        <Link className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' to={`/product/${item.id}`}>
                        
                            <img src={item.imageProfile || item.img} className=' object-cover cursor-pointer w-[100px]' />
                          
                        </Link>

                      </div>
                

                      <div className='mt-3'>
                        <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] max-w-[200px] text-primaryBlack truncate'>{item.name}</h3>
                        <div className='flex items-center gap-2 mt-1'>
                          <p className=' font-poppins font-medium text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                          <p className=' line-through font-poppins font-medium text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                        </div>
                        <div className='flex items-end gap-2'>
                          <Ratings ratings={item.ratings} color="#FFAD33" />
                          <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                        </div>
                      </div>
                    </div>
                    ))}

                </div>
              </div>
            </div>
          : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>

        }

    </div>
  )
}

export default FeaturedProducts