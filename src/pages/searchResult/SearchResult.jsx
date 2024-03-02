import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import GoToTop from '../../components/GoToTop/GoToTop'
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Ratings, Spinner } from '../../components'

const SearchResult = () => {
  const {search} = useParams()
  const [info, setInfo] = useState([])
  let [filteredProducts, setFilteredProucts] = useState([])



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

  const filtered = info?.filter((product) => product?.name?.toLowerCase().includes(search) || product?.category?.includes(search) || product?.seller?.includes(search))

  filteredProducts = filtered

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      {info?.length >= 1
        ?
          <div>
            {filteredProducts?.length >= 1 
              ?
                <div>
                  {filteredProducts?.length > 1 && <h2 className=' font-poppins text-[18px] sm:text-[20px] md:text-[24px] font-semibold'>Search {filteredProducts?.length > 1 && 'results'} for {`'${search}'`}</h2>}
                  {filteredProducts?.length === 1 && <h2 className=' font-poppins text-[16px] sm:text-[18px] md:text-[20px] font-semibold'>Search {filteredProducts?.length === 1 && 'result'} for {`'${search}'`}</h2>}

                  <div className=' flex justify-evenly flex-wrap gap-5 md:gap-10 mt-[5rem] mb-[3rem]'>
                    {filteredProducts?.map((item) => (
                      <div key={item.id} className='w-[120px] sm:w-[150px] md:w-[180px] h-[300px] md:h-[370px] slide-left '>
                                                
                      <div className='w-full h-[70%] flex flex-col justify-end gap-8 items-center bg-primaryGray relative'>
  
                        {item.isNew &&
                          <div className={`absolute left-2 top-2 bg-lightGreen md:px-4  px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>NEW</p>
                          </div>
                        }
                        {item.isHot &&
                          <div className={`absolute left-2 top-2 bg-primary md:px-4 px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>HOT</p>
                          </div>
                        }
                        {item.bestDeal &&
                          <div className={`absolute left-2 top-2 bg-primaryBlue md:px-4 px-3 py-1  flex justify-center items-center`}>
                          <p className={`text-white font-poppins text-[10px] md:text-[12px] font-normal`}>BEST DEALS</p>
                          </div>
                        }
  
                      <div className='absolute right-2 top-2 flex flex-col items-center gap-2'>
                          <div className='w-[35px] h-[35px]  bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary'>
                            <FavoriteBorderIcon style={{fontSize: 21}} className='hover:text-white text-[100px]' />
                          </div>
                      </div>
                      <Link className='flex justify-center items-center w-[100%] h-[100%] mt-4 ' to={`/product/${item.id}`}>
                      
                          <img src={item.imageProfile || item.img} className=' object-cover cursor-pointer w-[80px] sm:w-[100px] md:w-[130px]' />
                        
                      </Link>
  
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
              : <h2 className=' font-poppins text-[16px] sm:text-[18px] md:text-[20px] font-semibold'>No results found</h2>
            
            }

          </div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
      }
    </div>
  )
}

export default SearchResult