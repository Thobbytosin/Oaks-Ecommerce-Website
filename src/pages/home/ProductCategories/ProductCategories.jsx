import React, { useRef } from 'react'
import styles from '../../../styles'
import { SubHeading } from '../../../components'
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { productsCategories } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const ProductCategories = () => {
    const navigate = useNavigate();

    const imageRef = useRef()

    const carouselWrapper = useRef()
    const navigation = (direction) => {
        const container = carouselWrapper.current
        // console.log(container)

        const scrollAmount = direction === 'left' ? container?.scrollLeft - (container?.offsetWidth) : container?.scrollLeft + (container?.offsetWidth);

            container?.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            })
    } 
  return (
    <div className={`${styles.section} ${styles.padding}`}>
        <SubHeading heading="Categories" />
        <h2 className={`${styles.heading}`}>Browse By Category</h2>
        <div className='flex justify-end gap-4 mb-8'>
            <div className='md:w-[46px] md:h-[46px] w-[35px] h-[35px] bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white ' onClick={() => navigation('left')}><WestIcon style={{fontSize: 21}} /></div>
            <div className='md:w-[46px] md:h-[46px] w-[35px] h-[35px] p-2 bg-primaryGray rounded-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white' onClick={() => navigation('right')}><EastIcon style={{fontSize: 21}} /></div>
        </div>

        <div ref={carouselWrapper} className='slide-wrapper flex  overflow-y-hidden gap-3 md:gap-5'>
            {productsCategories.map((item) => (
                <div 
                    key={item.id} 
                    className=' w-[100px] sm:w-[130px] md:w-[150px] h-[125px] border-2 border-solid flex flex-col justify-center items-center gap-2 flex-shrink-0 cursor-pointer hover:bg-primary hover:text-primaryWhite'
                    onClick={() => navigate(`/category/${item.id}`)} 
                    onMouseOver={(e) => {
                        const image = e.currentTarget.firstChild
                        return (
                            image.src = item.icon2
                        )
                    }}
                    onMouseOut={(e) => {
                        const image = e.currentTarget.firstChild
                        return (
                            image.src = item.icon
                        )
                    }}
                >
                    <img 
                        src={item.icon} 
                        alt={`${item.id}`} 
                        className=' w-[40px]'
                    />
                    <h4 className={styles.categoryText}>{item.title}</h4>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductCategories