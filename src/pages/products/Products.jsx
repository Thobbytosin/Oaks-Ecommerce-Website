import React, { useState, useEffect } from 'react'
import styles from '../../styles'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { PageTag, Ratings, Spinner } from '../../components';
import  Pagination  from '../../components/Pagination/Pagination';
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import GoToTop from '../../components/GoToTop/GoToTop';
import { priceCategories, sidebarCategories } from '../../constants';
import SearchInput from '../../components/SearchInput/SearchInput';
import CloseIcon from '@mui/icons-material/Close';
import { iWatch2, iWatch3 } from '../../constants/images';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';


const Products = () => {
  const [info, setInfo] = useState([])
  const [allProducts, setAllProducts] = useState(true)
  const [active, setActive] = useState('all')
  let [all, setAll] = useState([]);
  let [curProducts, setCurProducts] = useState([])
  const [activePrice, setActivePrice] = useState(null)
  const [activePriceTitle, setActivePriceTitle] = useState(null)
  let [currentProducts, setCurrentProducts] = useState([])
  let [neww, setNeww] = useState([])
  const dispatch = useDispatch()
  const [isWishlist, setIsWishlist] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const navigate = useNavigate();

  // console.log(info.length)
          
  const getInfo = async () => {
    const q = query(collection(db, "all"), where("all", "==", true))
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
    }
    
    useEffect(() => {
      getInfo()
    }, [])


    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 16

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
    currentProducts = info?.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  const handleItems = (id) => {
    setActive(id)
    const curItems = info?.filter((item) => item?.category === id)
    setCurProducts(curItems)
    setAll(curItems)
    setActivePriceTitle(false)
    setActivePrice(null)

    id === 'all' && setNeww([])
  }

  const handlePriceFilter = (item) => {
    setActivePrice(item.id)
    setActivePriceTitle(item.title)

    // less than 10k
    {item.id === '10' && setCurProducts(curProducts?.filter((product) => product?.price < 10000 ))}
    {item.id === '10' && setNeww(info?.filter((product) => product?.price < 10000 ))}

    // less than 25k
    {item.id === '25' && setCurProducts(curProducts?.filter((product) => product?.price < 25000 ))}
    {item.id === '25' && setNeww(info?.filter((product) => product?.price < 25000 ))}
    // 40k - 80k
    {item.id === '40-80' && setCurProducts(curProducts?.filter((product) => product?.price >= 40000 && product?.price <= 80000 ))}
    {item.id === '40-80' && setNeww(info?.filter((product) => product?.price >= 40000 && product?.price <= 80000 ))}
    // 100k - 200k
    {item.id === '100-300' && setCurProducts(curProducts?.filter((product) => product?.price >= 100000 && product?.price <= 300000 ))}
    {item.id === '100-300' && setNeww(info?.filter((product) => product?.price >= 100000 && product?.price <= 300000 ))}
    // Above 400k
    {item.id === '400' && setCurProducts(curProducts?.filter((product) => product?.price >= 400000 ))}
    {item.id === '400' && setNeww(info?.filter((product) => product?.price >= 400000 ))}
    // 
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
    <div className={`${styles.newPageSectionProducts} ${styles.padding} `}>
      {/* SIDEBAR */}
      <PageTag prevPage="Home" next='Shop' />
      <GoToTop />
      <div className=' flex items-start gap-6 md:gap-12'>

        <div className={`md:w-[20%] sm:w-[25%] w-[22%] mb-8`}>
         
            {/* CATEGORY */}
            <div className=' font-poppins border-b border-primaryGray pb-4 w-[100%]'>
              <h2 className=' font-semibold text-[10px] sm:text-[12px] md:text-[14px] mb-3'>CATEGORY</h2>
                <div className=' w-full'>
                  {sidebarCategories.map((item) => (
                    <div onClick={() => handleItems(item.id)} key={item.id} className=' w-full flex items-center gap-1 sm:gap-2 mb-2 cursor-pointer'>
                      <div className={`md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[10px] h-[10px] flex justify-center items-center rounded-full ${item.id === active ? 'bg-primary' : 'border border-primaryGray'}`}>
                          <div className='md:w-[8px] md:h-[8px] sm:w-[6px] sm:h-[6px] w-[4px] h-[4px] rounded-full bg-primaryWhite' />
                      </div>
                      <p className=' text-[8px] sm:text-[10px] md:text-[12px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
            </div>

            {/* PRICE */}
            <div className=' font-poppins border-b border-primaryGray pb-4 my-10 w-[100%]'>
              <h2 className=' font-semibold text-[10px] sm:text-[12px] md:text-[14px] mb-3'>PRICE RANGE</h2>
                <div className=' w-full'>
                  {priceCategories.map((item) => (
                    <div onClick={() => handlePriceFilter(item)} key={item.id} className=' w-full flex items-center gap-1 sm:gap-2 mb-2 cursor-pointer'>
                      <div className={`md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[10px] h-[10px] flex justify-center items-center rounded-full ${item.id === activePrice ? 'bg-primary' : 'border border-primaryGray'}`}>
                          <div className='md:w-[8px] md:h-[8px] sm:w-[6px] sm:h-[6px] w-[4px] h-[4px] rounded-full bg-primaryWhite' />
                      </div>
                      <p className=' text-[8px] sm:text-[10px] md:text-[12px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
            </div>

            {/* iWatch */}

            <div className='hidden sm:block w-full border-2 border-primary border-opacity-50 py-3 md:py-6 px-2 md:px-4 font-poppins '>
                <div className=' w-[70%] mx-auto'>
                  <img src={iWatch2} alt="" className=' w-full' />
                </div>
                <div className=' w-[60%] mx-auto mt-4'>
                  <img src={iWatch3} alt="" className=' w-full' />
                </div>
                <h2 className=' text-[18px] md:text-[20px] font-semibold max-w-[228px] mt-4 text-center mx-auto '>Heavy on Features. Light on Price.</h2>
                <p className=' text-[12px] md:text-[14px] mt-6 text-center'>Only for: <span className='text-[12px] md:text-[14px] font-medium bg-[#F3DE6D] py-2 px-2 md:px-4 md:inline sm:block'>&#8358; {(875000).toLocaleString()}</span></p>
                <button onClick={() => navigate('/product/flsh-00-36')} className=' bg-primaryBlue text-center px-3 md:px-6 py-2 md:text-[14px] text-[12px] mt-8 text-primaryWhite w-full'>
                  View Details
                </button>
            </div>
        

        </div>


        {/* CONTENT */}
        <div className='md:w-[80%] sm:w-[75%] w-[78%]  font-poppins'>
          <div className=' border border-primaryGray md:w-[48%] sm:w-[60%] w-0 rounded-[2px]'>
            <SearchInput />
          </div>

          <div className=' sm:my-6 p-1.5 md:p-3 rounded-[2px] bg-dimWhite flex items-center justify-between'>
            <div className=' flex items-center gap-2'>
              <p className=' text-[8px] sm:text-[12px] text-neutral'>Active Filters:</p>
              <p className=' text-[8px] sm:text-[14px]'><span className=' font-semibold sm:mr-2 capitalize'>{active}</span><CloseIcon style={{fontSize: 14, color: '#6C7275'}} /></p>
              {activePriceTitle && 
                <p className=' text-[8px] sm:text-[14px]'><span className=' font-semibold mr-2'>{activePriceTitle}</span><CloseIcon style={{fontSize: 14, color: '#6C7275'}} /></p>
              
              }
            </div>
            {active === 'all' &&
              <p className=' text-[8px] sm:text-[12px] text-neutral'><span className=' font-semibold text-primaryBlack'>{ active === 'all' && neww?.length >= 1 ? neww?.length : info?.length  }</span> results found</p>
            
            }
            
            {active !== 'all' &&
              <p className=' text-[8px] sm:text-[12px] text-neutral'><span className=' font-semibold text-primaryBlack'>{curProducts?.length >= 1 && curProducts?.length < info?.length ? curProducts?.length : 'No' }</span> {curProducts?.length > 1 ? 'results' : 'result'} found</p>
            
            }
          </div>
          
          {info?.length >= 1
            ?

              <div>

                <div className='flex flex-wrap md:gap-[1.8rem] sm:gap-[1.1rem] gap-[0.6rem] mt-[2rem]'>
                  {/* FOR ALL PRODUCTS */}
                  {active === 'all' && neww?.length < 1 && currentProducts?.map((item) => (
                    <div key={item.id} className=' w-[110px] sm:w-[150px] md:w-[180px] h-[300px] md:h-[370px] slide-left mb-[1rem] sm:mb-0'>
                                                  
                      <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                        {item.isNew &&
                          <div className={`absolute left-2 top-2 bg-lightGreen md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[8px] sm:text-[10px] md:text-[12px] font-normal`}>NEW</p>
                          </div>
                        }
                        {item.isHot &&
                          <div className={`absolute left-2 top-2 bg-primary md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[8px] sm:text-[10px] md:text-[12px] font-normal`}>HOT</p>
                          </div>
                        }
                        {item.bestDeal &&
                          <div className={`absolute left-2 top-2 bg-primaryBlue md:px-4 md:py-2 px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[8px] sm:text-[10px] md:text-[12px] font-normal`}>BEST DEALS</p>
                          </div>
                        }

                      <div className={`absolute right-2 top-2 flex flex-col items-center gap-2`}>
                          <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer hover:bg-primary`}>
                              <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                          </div>
                      </div>
                      <Link className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' to={`/product/${item.id}`}>
                      
                          <img src={item.imageProfile || item.img} className=' object-cover cursor-pointer md:w-[130px] sm:w-[100px] w-[80px]' />
                        
                      </Link>

                    </div>
              

                    <div className='mt-3'>
                      <h3 className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                        <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                      </div>
                      <div className='flex items-center sm:items-end gap-2'>
                        <Ratings ratings={item.ratings} color="#FFAD33" size='10px' />
                        <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                      </div>
                    </div>
                  </div>
                  ))}

                  {/* FILTERING ALL PRODUCTS */}
                  {active === 'all' && neww?.length > 1 && neww?.map((item) => (
                    <div key={item.id} className=' w-[120px] sm:w-[150px] md:w-[180px] h-[300px] md:h-[370px] slide-left '>
                                                  
                      <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

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
                          <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer `}>
                              <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                          </div>
                      </div>
                      <Link className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' to={`/product/${item.id}`}>
                      
                          <img src={item.imageProfile || item.img} className=' object-cover cursor-pointer md:w-[130px] sm:w-[100px] w-[80px]' />
                        
                      </Link>

                    </div>
              

                    <div className='mt-3'>
                      <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                        <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                      </div>
                      <div className='flex items-end gap-2'>
                        <Ratings ratings={item.ratings} color="#FFAD33" size='10px' />
                        <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                      </div>
                    </div>
                  </div>
                  ))}

                  {/* FOR FILTER */}
                  {curProducts?.length >= 1 && curProducts?.length < info?.length ? curProducts?.map((item) => (
                    <div key={item.id} className=' w-[120px] sm:w-[150px] md:w-[180px] h-[300px] md:h-[370px] slide-left '>
                                                  
                      <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>

                      <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                          <div onClick={() => isWishlist && activeItem === item.name ? handleRemoveFromWishlist(item) : handleAddToWishlist(item)} className={`w-[35px] h-[35px] ${isWishlist && activeItem === item.name ? 'bg-primaryBlue text-primaryWhite' : 'bg-primaryGray text-primaryBlack'} rounded-full flex justify-center items-center cursor-pointer hover:bg-primary`}>
                              <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                          </div>
                      </div>
                      <Link className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' to={`/product/${item.id}`}>
                      
                          <img src={item.imageProfile || item.img} className=' object-cover cursor-pointer md:w-[130px] sm:w-[100px] w-[80px]' />
                        
                      </Link>

                    </div>
              

                    <div className='mt-3'>
                      <h3 className=' font-poppins font-medium text-[12px] md:text-[14px] text-primaryBlack truncate'>{item.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <p className=' font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-primary'>&#8358; {(item.price).toLocaleString()}</p>
                        <p className=' line-through font-poppins font-medium text-[10px] sm:text-[12px] md:text-[14px] text-darkGray'>&#8358; {(item.oldPrice).toLocaleString()}</p>
                      </div>
                      <div className='flex items-end gap-2'>
                        <Ratings ratings={item.ratings} color="#FFAD33" size='10px' />
                        <p className=' font-poppins text-[10px] md:text-[12px] text-primaryBlack'>{`(${item.ratingsCount})`}</p>
                      </div>
                    </div>
                  </div>
                  ))
                  : active !== 'all' && <h2>No results found</h2>
                  }
                </div>

                {/* pagination for all */}
                {active === 'all' &&
                  <div className={` my-5 sm:mt-10 `}>
                    <Pagination 
                      totalProducts={neww?.length >= 1 ? neww?.length : info?.length}
                      productsPerPage={productsPerPage}
                      activePage={currentPage}
                      paginate={paginate}
                    />
                  </div>
                
                }
                {active === 'all'  && neww?.length >= 12 &&
                  <div className={` my-5 sm:mt-10 `}>
                    <Pagination 
                      totalProducts={info?.length}
                      productsPerPage={productsPerPage}
                      activePage={currentPage}
                      paginate={paginate}
                    />
                  </div>
                
                }
        
                {curProducts?.length >= 12 && currentProducts?.length >= 12  &&
                  <div className={` my-5 sm:mt-10 `}>
                    <Pagination 
                      totalProducts={active === 'all' ? info?.length : all?.length}
                      productsPerPage={productsPerPage}
                      activePage={currentPage}
                      paginate={paginate}
                    />
                  </div>
                }
              </div>
            : <div className='h-[50vh] flex justify-center items-center'><Spinner/></div>
          }
          
        </div>
      </div>

      
    </div>
  )
}

export default Products