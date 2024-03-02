import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../../styles'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { allProducts } from '../../constants/allProducts'
import { PageTag, PreviousButton, Ratings, Spinner, SubHeading } from '../../components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { productColor, productSize, productTags } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseCounter, increaseCounter, } from '../../features/cart/cartSlice'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { icondelivery, payments, returnIcon } from '../../constants/images'
import Description from './description/Description'
import Reviews from './reviews/Reviews'
import { db } from '../../firebase/firebase.config'
import { doc, getDoc, setDoc, updateDoc, getDocs, where, collection, query } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthProvider'
import { updateProfile } from 'firebase/auth'
import GoToTop from '../../components/GoToTop/GoToTop'


const ProductDetails = () => {
  const { id } = useParams()
  
  const [info, setInfo] = useState([])
  const [info2, setInfo2] = useState([])
  const [activeItem, setActiveItem] = useState([])
  const [productReviews, setProductReviews] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeDisplayImg, setActiveDisplayImg] = useState(1)
  
  
  const getInfo = async () => {
    const q = query(collection(db, "all"), where("all", "==", true))
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
      doc.data()
      ))
      
      setInfo(info)
      // console.log(info)
      const product =  info?.filter((item) => item.id === id)
      setActiveItem(product)
      setProductReviews(product[0].reviews)
      
      const related = info?.filter((item) => item.category === product[0]?.category && item.id !== id )
      setRelatedProducts(related)
  } 
    
    useEffect(() => {
      getInfo()
    }, [id])

  const getInfoSize = async () => {
    const q = query(collection(db, "all"), where("sub", "==", true))
    const querySnapshot = await getDocs(q)
    const info2 = querySnapshot.docs.map((doc) => (
      doc.data().data
      ))
      
      setInfo2(info2)

    }
    
    
    useEffect(() => {
      getInfoSize()
    }, [])
     
  const [activeColor, setActiveColor] = useState('Black')
  const [activeImg, setActiveImg] = useState(1)
  
  const [activeSize, setActiveSize] = useState('S')
  const [activeShoeSize, setActiveShoeSize] = useState(44)
  const [activeWomenShoeSize, setActiveWomenShoeSize] = useState(38)
  const [activeTitle, setActiveTitle] = useState("description")
  const {user} = useContext(AuthContext)  
  const cartCounter = useSelector((state) => state.cart.cartCounter)
  const productSizes = useSelector((state) => state.cart.productSize)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const handleDecreaseCart = () => {
    dispatch(decreaseCounter())
  };

  const handleIncreaseCart = () => {
    dispatch(increaseCounter())
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const goToPage = (item) => {
    navigate(`/product/${item.id}`)
    location.reload()
  }  
  
  return (
    <div>
      
        <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
          <GoToTop />
          <PreviousButton /> 

          {info?.length >= 1 
            ?
              <div>

                {activeItem?.map((item) => (
                  <div key={item.id}>
                    <div>
                      <PageTag prevPage='Home' next='Products' curPage={`${item?.name}`}  />
                    </div>
      
                    <div className={`${styles.flexItemsStart} sm:flex-row flex-col  ${styles.section} ${item.imgMark ? 'gap-[2rem] md:gap-[4rem]' : 'md:gap-0 gap-[2rem]'} relative`}>
                      <div className=' w-[100%] sm:w-[40%]  md:w-[50%]'>
                        <div className={`${item.imgMark ? 'w-full' : 'w-full md:w-[80%] mx-auto'} bg-dimWhite ${item.imgMark ? 'md:h-[529px] sm:h-[480px] h-[380px]' : 'md:h-[729px] sm:h-[650px] h-[500px] ' } flex justify-center items-center overflow-hidden`}>
                          {!item.hasColor && <img src= {item.imgDisplay || item.img || activeDisplayImg === 1 && item.img1 || activeDisplayImg === 2 && item.img2 || activeDisplayImg === 3 && item.img3 || activeDisplayImg === 4 && item.img4  } alt="" className=' object-cover md:w-[300px] w-[150px]' />}
                          {item.hasColor && <img src= {activeImg === 1 && item.img || activeImg === 2 && item.img2 || activeImg === 3 && item.img3 } alt="" className=' object-contain' />}
                        </div>
      
                        <div className={`${styles.flexJustifyBetween} gap-4 `}>
                          {item?.imgMark?.map((item, index) => (
                            <div 
                              key={index} 
                              onClick={() => setActiveDisplayImg(item.id)}
                              className=' w-[200px] h-[160px] mt-4 flex justify-center items-center cursor-pointer rounded-[8px] '>
                              <img src={item.imgMark1 || item.imgMark2 || item.imgMark3 || item.imgMark4} alt="" className=' w-full h-full object-contain' />
                            </div> 
      
                          ))}
      
                        </div>
                        
      
                      </div>
      
                      <div className=' w-[100%] sm:w-[60%] md:w-[50%] h-full'>
                          <h2 className=' font-inter font-semibold md:text-[20px] sm:text-[18px] text-[16px] mb-2'>{item.name}</h2>
      
                          <div className=' flex items-end gap-2'>
                            <Ratings ratings={item.ratings} size='15px' color="#FFAD33" />
                            <p className=' font-poppins md:text-[14px] text-[12px] '>{`(${item.ratingsCount} Reviews)`}</p>
                            <span className=' font-poppins md:text-[14px] text-[12px] '>|</span>
                            <p className=' font-poppins md:text-[14px] text-[12px] '>{item.stock > 0 ? <span className=' text-lightGreen'>In Stock</span> : <span className=' text-primary'>Out of Stock</span> }</p>
                          </div>
      
                          <div className=' flex items-end gap-2 my-4'>
                            <p className=' font-inter md:text-[20px] sm:text-[18px] text-[16px] text-primaryBlack font-medium'>&#8358; {(item.price).toLocaleString()}</p>
                            <p className=' font-inter md:text-[16px] text-[12px] sm:text-[14px] text-darkGray line-through'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                          </div>
      
                          <p className=' font-poppins md:text-[12px] text-[10px] max-w-[630px] leading-[24px] md:leading-[28px] text-justify'>{item.description}</p>
      
                          {/* PRODUCT HAS COLOR */}
      
                          {item.hasColor && 
                            <div className=' mt-[1.5rem]'>
                              <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px]'>Choose Color <span><ArrowForwardIosIcon style={{fontSize: 14}} /></span></p>
      
                              <div className='flex items-end gap-2 mt-[1.2rem]'>
                                {productColor?.map((item) => (
                                  <div 
                                    onClick={() => {
                                      setActiveColor(item.name)
                                      setActiveImg(item.id)
                                      setActiveItem(item.item)
                                      // location.reload()
                                      console.log(activeItem)
                                      // dispatch(setDescription(item.name))
      
                                    }} 
                                    key={item.id} 
                                    className='cursor-pointer'
                                  >
                                    {activeColor === item.name && <p className={`font-poppins font-medium mb-3 `}>{item.name}</p> }
                                    
                                    <div className={` bg-dimWhite  ${activeColor === item.name ? 'border border-black' : ''} rounded-[8px]`}>
                                      <img src={item.icon} alt="" />
                                    </div>
                                  </div>
                                ))}
      
                              </div>
                              
                            </div>
                          
                          }
      
                          {/* PRODUCT HAS SIZE */}
      
                          {item.hasSize &&
                            <div className=' mt-[1.5rem]'>
                              <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px]'>Choose Size<span><ArrowForwardIosIcon style={{fontSize: 14}} /></span></p>
                              <div className=' flex gap-3 mt-4'>
                                {info2[item?.productNumber]?.map((size, index) => (
                                  <div onClick={() => {
                                      setActiveSize(size.tag)
                                      setActiveItem(size.itemProduct)
                                  }} key={index} className={`w-[25px] h-[25px] text-[12px] ${activeSize === size.tag ? 'bg-primary text-primaryWhite border-primaryWhite' : 'bg-primaryGray'} border  rounded-[5px] text-primaryBlack font-poppins font-medium flex justify-center items-center cursor-pointer`}>
                                      {size.tag}
                                  </div>
                                ))}
                              </div>
                            </div>
                          }
      
                          {/* END PRODUCT HAS SIZE */}
      
                          {/* PRODUCT IS SHOE */}
      
                          {item.isShoe &&
                            <div className=' mt-[1.5rem]'>
                              <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px]'>Choose Size<span><ArrowForwardIosIcon style={{fontSize: 14}} /></span></p>
                              <div className=' flex gap-3 mt-4'>
                                {info2[item?.productNumber]?.map((size, index) => (
                                  <div onClick={() => {
                                      setActiveShoeSize(size?.tag)
                                      setActiveWomenShoeSize(size?.tag)
                                      size?.itemProduct[0]?.stock >= 1 &&setActiveItem(size?.itemProduct)
                                  }} key={index} className={`w-[25px] h-[25px] text-[12px] ${activeShoeSize === size.tag || activeWomenShoeSize === size.tag && size.itemProduct[0]?.stock > 0 ? 'bg-primary text-primaryWhite border-primaryWhite' : 'bg-primaryGray '} ${size.itemProduct[0]?.stock < 1 && ' opacity-90 line-through cursor-text bg-primaryGray'} border  rounded-[5px] text-primaryBlack font-poppins font-medium flex justify-center items-center cursor-pointer`}>
                                      {size.tag}
                                  </div>
                                ))}
                              </div>
                            </div>
                          }
      
                          {/* END PRODUCT IS SHOE */}
      
      
      
      
                          <div className=' flex mt-[1.5rem]'>
                              <div className=' w-[30%] md:w-[25%] mr-3 border border-darkGray  '>
                                <div className=' flex items-center justify-center gap-2 md:gap-6 w-[100%]'>
                                  <span onClick={() => handleDecreaseCart()} className=' text-center bg-dimWhite md:w-full w-[80%] h-full text-[20px] cursor-pointer p-2  '>-</span>
                                    <p className=' bg-white text-[20px] font-poppins font-semibold'>{cartCounter}</p>
                                  <span onClick={() => handleIncreaseCart()} className=' w-[80%] md:w-full bg-dimWhite text-center text-[20px] cursor-pointer p-2   '>+</span>
                                </div>
                              </div>
      
                              
                              <button onClick={() => handleAddToCart(item)} className='font-poppins md:text-[14px] text-[12px] py-2 px-[0.6rem] sm:px-[1.2rem] md:px-[2rem] text-primaryWhite bg-primary font-medium  mr-3'>Add to Cart</button>
      
                              <button className='font-poppins  md:text-[14px] text-[12px] py-2 md:px-[2rem] px-[1rem] text-primaryBlack border-primaryBlack border-2 font-medium'><FavoriteBorderIcon /> Wishlist</button>
                              
      
                          </div>
      
                          <div className=' my-4'>
                            <p className=' text-neutral font-poppins text-[10px] md:text-[12px]'>{`* (${item.stock} available/${item.quantity} sold)`}</p>
                          </div>
                          
                          <div className=' flex gap-3'>

                            <div className=' flex items-center gap-4 px-2 h-[90px] border border-primaryGray rounded-[10px]'>
                              <img src={icondelivery} alt="" className=' w-[25px]' />
                              <div>
                                <h3 className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] font-medium'>Free Delivery</h3>
                                <p className=' font-poppins text-[10px] font-medium underline'>Enter your Postal Code for Delivery Availability</p>
                              </div>
                            </div>
        
                            <div className=' flex items-center gap-4 px-2 h-[90px] border border-primaryGray rounded-[10px]'>
                              <img src={returnIcon} alt="" className=' w-[25px]' />
                              <div>
                                <h3 className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] font-medium'>Return Delivery</h3>
                                <p className=' font-poppins text-[10px] font-medium '>Free 30 Days Delivery Returns. Details</p>
                              </div>
                            </div>
                          </div>
                          <div className=' gap-4 p-2 border border-primaryGray rounded-[10px] mt-2'>
                            <p className=' font-poppins text-[14px] text-primaryBlack mb-2 font-medium'>100% Guarantee Safe Checkout</p>
                            <img src={payments} alt="" />
                          </div>
      
                          <div className=' flex items-center mt-4 mb-2'>
                            <p className=' font-poppins text-[12px] text-neutral w-[105px]'>SKU</p>
                            <p className=' font-poppins text-[12px] text-primaryBlack font-medium capitalize'>{item.id}</p>
                          </div>
                          
                          <div className=' flex items-center mb-2 '>
                            <p className=' font-poppins text-[12px] text-neutral w-[105px]'>CATEGORY</p>
                            <p className=' font-poppins text-[12px] text-primaryBlack font-medium capitalize'>{item.tags}</p>
                          </div>
      
                        
      
      
      
      
                      </div>
                    </div>
      
                    {/* PRODUCT DESCRIPTION, REVIEW */}
      
                    <div className=' w-full mb-8'>
                      <div className={`flex gap-8`}>
                          {productTags.map((el) => (
                            <li 
                              onClick={() => setActiveTitle(el.id)}
                              key={el.id} 
                              className={` font-poppins text-[12px] sm:text-[14px] md:text-[16px] font-medium px-6 py-4 cursor-pointer ${activeTitle === el.id ? 'text-primary border-b-2 border-primary' : 'text-neutral'}`}>{el.title} {el.id === 'reviews' && <span>{`(${item?.reviews?.length})`}</span>}</li>
                          ))}
                      </div>
                      <div>
                        {activeTitle === 'description' && <Description description={item.desc} description2={item.desc2} />}
                        {activeTitle === 'reviews' && <Reviews products={info} reviews={productReviews} />}
                        {/* {activeTitle === 'specifications' && <p>Specifications</p>} */}
                      </div>
                    </div>
      
                  </div>
      
                  
                ))}
              </div>

            : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
                        
          }


          {/* RELATED PRODUCTS */}

          {info?.length >= 1 && relatedProducts?.length >=1 &&
          
            <div className={`${styles.section} w-full`}>
              <SubHeading heading="YOU MIGHT ALSO LIKE" />
              <div className=' w-full h-[3px] border-b border-primaryGray mb-14' />

              <div className=' slider-wrapper overflow-y-hidden flex gap-4 md:gap-8 '>
                  {relatedProducts?.map((item) => (
                  <div key={item.id} className='flex-shrink-0 w-[150px] sm:w-[180px] h-[370px] '>
                                                
                    <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                    <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                        <div className='w-[35px] h-[35px]  bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary'>
                            <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                        </div>
                    </div>
                    <span className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' onClick={() => goToPage(item)}>
                    
                        <img src={item.img || item.imageProfile} className=' object-cover cursor-pointer sm:w-[130px] w-[60px]' />
                      
                    </span>

                    
                  </div>
            

                  <div className='mt-3'>
                    <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                    <div className='flex items-center gap-2 mt-1'>
                      <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                      <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                    </div>
                    <div className='flex items-end gap-2'>
                      <Ratings ratings={item.ratings} color="#FFAD33" size='10px' />
                      <p className=' font-poppins text-[8px] md:text-[10px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          }


        </div>
      
    </div>
      
    
  )
}

export default ProductDetails