import React, { useEffect, useState } from 'react'
import { PageTag, PreviousButton, Sidebar, Spinner } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { allProducts } from '../../constants/allProducts'
import styles from '../../styles'
import Ratings from '../../components/Ratings/Ratings'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import GoToTop from '../../components/GoToTop/GoToTop'
import { productsCategories } from '../../constants'

const Category = () => {
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [info, setInfo] = useState([])
    const [allInfo, setAllInfo] = useState([])
    const [active, setActive] = useState(id)
    const [active2, setActive2] = useState('')
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading((prev) => !prev )
        return ( () => {
          clearTimeout(timer)
          loading
        }) 
      }, 2000)
      
      return ( () => {
        clearTimeout(timer)
        loading
      }) 
    }, [])
    

    
          
    const getInfo = async () => {
      const q = query(collection(db, "all"), where("all", "==", true))
      const querySnapshot = await getDocs(q)
      const info = querySnapshot.docs.map((doc) => (
          doc.data()
        ))
        
        setAllInfo(info)
        setInfo(info)
      }
      
      useEffect(() => {
        getInfo()
      }, [])

    // const [items, setItems] = useState(allProducts)

    useEffect(() => {
      const filterItem = () => {
          const updateItems = info?.filter((curItem) => {
            return curItem.category === id;
          })
            // console.log(items)
          setInfo(updateItems)
      }
      
      filterItem()
    }, [!loading])

    // console.log(info)


    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
    }

    const handleToggleCat = (itemId) => {
      setActive('')
      setActive2(itemId)
      navigate(`/category/${itemId}`)
      const updateCategory = allInfo?.filter((item) => item.category === itemId )

      setInfo(updateCategory)
      console.log(info)
    }
    

  return (
      
        <div>
          <GoToTop />
          
            {loading 
                ? <div className={` w-full min-h-screen flex flex-col justify-center items-center`}>
                    <Spinner />
                  </div> 
                : <div className={`${styles.newPageSection} ${styles.padding} flex gap-[0rem] md:gap-12 items-start`}> 
                        <div className=' w-[80%] md:w-[70%]'>
                        <PreviousButton />
                          <PageTag prevPage="Home" curPage={`Category - ${id}`} />

                          <div className='flex flex-wrap gap-[1.4rem] md:gap-[2rem] mt-[2rem] md:mt-[5rem] mb-[10rem]'>
                            {info?.map((item) => (
                              <div key={item.id} className='  w-[120px] sm:w-[150px] md:w-[180px] h-[300px] md:h-[370px] slide-left'>
                                          
                                  <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                                  <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                                      <div className='w-[35px] h-[35px]  bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary'>
                                          <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                                      </div>
                                  </div>
                                  <Link className='flex justify-center items-center mt-4 w-full' to={`/product/${item.id}`}>
                                    <div className='w-[50%] h-[50%] cursor-pointer'>
                                      <img src={item.imageProfile || item.img} className=' object-cover md:w-[130px] sm:w-[100px] w-[80px]' />
                                    </div>
                                  </Link>

                                  <div className='bg-primaryBlack w-full text-center mt-2'>
                                    <button onClick={() => handleAddToCart(item)} className='font-poppins w-full md:text-[16px] text-[12px] py-2 text-primaryWhite font-medium'>Add to Cart</button>
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

                        </div>

                        {/* SIDEBAR */}

                        <div className='w-[20%] md:w-[30%]'>
                          {/* CATEGORY */}
                          <div className=' font-poppins border-b border-primaryGray pb-4 w-[100%]'>
                              <h2 className=' font-semibold text-[14px] md:text-[16px] mb-5'>CATEGORY</h2>
                                <div className='w-full'>
                                  {productsCategories.map((item) => (
                                    <div onClick={() => handleToggleCat(item.id)} key={item.id} className=' flex items-center gap-2 mb-2 cursor-pointer'>
                                      <div className={`md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[10px] h-[10px] flex justify-center items-center rounded-full ${item.id === active || item.id === active2 ? 'bg-primary' : 'border border-primaryGray'}`}>
                                          <div className='md:w-[8px] md:h-[8px] sm:w-[6px] sm:h-[6px] w-[4px] h-[4px] rounded-full bg-primaryWhite' />
                                      </div>
                                      <p className=' text-[8px] sm:text-[10px] md:text-[12px]'>{item.title}</p>
                                    </div>
                                  ))}
                                </div>
                          </div>
                        </div>
                  

                  </div>
                    
            }
        </div>
  )
}

export default Category