import React, { useRef, useState, useEffect, useContext } from 'react'
import { flashProducts } from '../../../constants/flashProducts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import Ratings from '../../../components/Ratings/Ratings';
import Button from '../../../components/Button/Button';
import styles from '../../../styles'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { Spinner } from '../../../components';
import { setToEnd } from '../../../features/countdownSales/countdownSlice';
import { addToWishlist, removeFromWishlist } from '../../../features/wishlist/wishlistSlice';
import { AuthContext } from '../../../context/AuthProvider';

const SalesCarousel = ({ ref }) => {
  const [info, setInfo] = useState([])
  const [isWishlist, setIsWishlist] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const dispatch = useDispatch()
  const {user} = useContext(AuthContext)
  
  const getInfo = async () => {
    const q = query(collection(db, "all"), where("flashSales", "==", true))
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
    }
    
    useEffect(() => {
      getInfo()
    }, [])
    

  const [timerDays, setTimerDays] = useState("00")
    const [timerHours, setTimerHours] = useState("00")
    const [timerMinutes, setTimerMinutes] = useState("00")
    const [timerSeconds, setTimerSeconds] = useState("00")

    const [timerEnd, setTimerEnd] = useState(false);
    
    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date("Jun 31, 2024 00:00:00").getTime();
   
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2,0);
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,0);
            const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60)).toString().padStart(2,0);
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2,0);

            if (distance < 0) {
                // stop timer
                clearInterval(interval.current)
                setTimerEnd(true)
                dispatch(setToEnd(true))
            } else {
                // update timer
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
             
        }, 1000);
    }
    
    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval.current)
        };
    })

    const [toggleFlash, setToggleFlash] = useState(false)

    const handleFlashToggle = () => {
      setToggleFlash(true)
    }
    
    const carouselWrapper = useRef()
    const navigation = (direction) => {
        const container = carouselWrapper.current
        console.log(container)

        const scrollAmount = direction === 'left' ? container?.scrollLeft - (container?.offsetWidth) : container?.scrollLeft + (container?.offsetWidth);

            container?.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            })
    } 


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
    <div className=' w-full relative'>
      {info?.length >= 1
        ?
          <div>
            <div className='flex justify-end gap-4 mb-8'>
                    <div className='md:w-[46px] md:h-[46px] w-[35px] h-[35px] bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white ' onClick={() => navigation('left')}><WestIcon style={{fontSize: 21}} /></div>
                    <div className='md:w-[46px] md:h-[46px] w-[35px] h-[35px] p-2 bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white' onClick={() => navigation('right')}><EastIcon style={{fontSize: 21}} /></div>
            </div>


            <div ref={carouselWrapper} className='slide-wrapper flex overflow-y-hidden  gap-6'>
                {info?.map((item) => (
                    <div key={item.id} className=' w-[150px] sm:w-[180px] h-[370px] flex-shrink-0'>
                                    
                        <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>
                            
                            <div className={`absolute left-2 top-2 bg-gold md:px-4 md:py-2 px-3 py-1 flex justify-center items-center`}>
                              <p className={`text-primaryBlack font-poppins text-[10px] md:text-[12px] font-normal`}>{item.discount}% OFF</p>
                            </div>

                            <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                                <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer hover:bg-primary`}>
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
                          <div className='flex items-center gap-4 mt-1'>
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
            <div className=' text-center mt-6'>
              <button onClick={handleFlashToggle} className=' text-primaryWhite bg-primary font-poppins text-[12px] md:text-[14px] text-center px-3 py-2'>
                    View All Products
                </button>
            </div>

            {toggleFlash 
              ? <div onClick={(prev) => setToggleFlash(!prev)} className='w-[100%] h-[100%] mx-auto bg-black opacity-40 z-20 fixed top-0 left-0 translate-x-0 ' />
              : <div onClick={(prev) => setToggleFlash(!prev)} className='w-[100%] h-[100%] mx-auto bg-black opacity-40 z-20 fixed top-0 left-0 translate-x-[100%]' /> 
            }

            {toggleFlash && <div className='md:w-[60%] w-[95%] h-[100%] mx-auto bg-primaryWhite z-30 fixed top-[0%] left-[2.5%] md:left-[20%] rounded-2xl p-4 text-center flex flex-col justify-center'>
              <h2 className='font-poppins md:text-[32px] text-[22px] font-semibold text-primaryBlack'>Hurry and Grab Amazing deals!</h2>
              <div className='w-full my-[1rem] flex flex-col justify-center'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='text-center'>
                            <p className={styles.dayParagraph}>Days</p>
                            <h3 className={styles.dayDetailsParagraph}>{timerDays}</h3>
                        </div>
                        <div className={`${styles.flexCenter} flex-col gap-1`}>
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            
                        </div>
                        <div className='text-center'>
                            <p className={styles.dayParagraph}>Hours</p>
                            <h3 className={styles.dayDetailsParagraph}>{timerHours}</h3>
                        </div>
                        <div className={`${styles.flexCenter} flex-col gap-1`}>
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            
                        </div>
                        <div className='text-center'>
                            <p className={styles.dayParagraph}>Minutes</p>
                            <h3 className={styles.dayDetailsParagraph}>{timerMinutes}</h3>
                        </div>
                        <div className={`${styles.flexCenter} flex-col gap-1`}>
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                            
                        </div>
                        <div className='text-center'>
                            <p className={styles.dayParagraph}>Seconds</p>
                            <h3 className={styles.dayDetailsParagraph}>{timerSeconds}</h3>
                        </div>
                    </div>

                    {timerEnd && <div className='w-full'><h3 className={styles.timerErrorText}>Flash Sales has expired!</h3></div>}

              </div>

              {timerEnd ? '' : 
                  <div className=' flex justify-center flex-wrap gap-6 mb-8'>
                    {info?.map((item) => (
                      <div key={item.id} className='flash-card w-[70px] h-[70px] sm:w-[100px]  sm:h-[100px] md:w-[120px] md:h-[120px] bg-primaryGray flex justify-center items-center cursor-pointer  relative'>
                        <Link to={`/product/${item.id}`}>
                          <div className='w-full h-full bg-black bg-opacity-20 flex items-center card-overlay' />
                        
                        </Link>
                        <div className={`absolute -left-2 -top-2 bg-primary h-[30px] w-[30px] md:h-[35px] md:w-[35px] rounded-full flex justify-center items-center`}>
                                  <p className={`text-white font-poppins text-[8px] sm:text-[10px] font-normal`}>-{item.discount}%</p>
                                </div>
                        <img src={item.img} alt="" className='w-[80%] h-[80%] object-contain' />
                      </div>
                    ))}
                  </div>
                }

                  <div onClick={(prev) => setToggleFlash(!prev)}>
                    <Button text="Continue Shopping" />

                  </div>    

            </div>}
          </div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
      
      }


    </div>
  )
} 

export default SalesCarousel