import React from 'react'
import styles from '../../../styles'
import { SubHeading } from '../../../components'
import { amazon, perfume, playstation, women } from '../../../constants/images'
import { useNavigate } from 'react-router-dom'

const Arrivals = () => {
    const navigation = useNavigate()
  return (
    <div className={`${styles.section} ${styles.margin}`}>
        <SubHeading heading="Featured" />
        <h2 className={styles.heading}>New Arrival</h2>
        <div className='mt-[4rem] grid md:grid-cols-4 grid-cols-1 md:grid-rows-2 gap-4 md:gap-0 min-h-[600px]'>
            <div className='bg-primaryBlack md:col-span-2 row-span-3 md:mr-6 relative p-[2.4rem] flex items-end overflow-hidden'>
                <img src={playstation} alt="" className=' absolute right-0 bottom-0' />
                <div className=' z-10'>
                    <h3 className={styles.arrivalHeading}>PlayStation 5</h3>
                    <p className={styles.arrivalDesc}>Black and White version of the PS5 coming out on sale.</p>
                    <button onClick={() => navigation('/product/playstation-5')} className={styles.arrivalBtn}>Shop Now</button>
                </div>
            </div>
            <div className='bg-primaryBlack md:col-span-2 md:mb-6  relative p-[2.4rem] flex items-end overflow-hidden'>
                <img src={women} alt="" className=' absolute right-0 bottom-0' />
                <div className=' z-10'>
                    <h3 className={styles.arrivalHeading}>Women's Collection</h3>
                    <p className={styles.arrivalDesc}>Featured woman collections that give you another vibe.</p>
                    <button onClick={() => navigation("/category/women's fashion")} className={styles.arrivalBtn}>Shop Now</button>
                </div>
            </div>
            <div className='bg-primaryBlack w-full md:mr-0 relative p-[2.4rem] flex items-end overflow-hidden'>
                <img src={amazon} alt="" className=' absolute left-[24%] top-[16%]' />
                <div className=' z-10'>
                    <h3 className={styles.arrivalHeading}>Speakers</h3>
                    <p className={styles.arrivalDesc}>Amazon wireless speakers.</p>
                    <button onClick={() => navigation("/product/amazon-speaker")} className={styles.arrivalBtn}>Shop Now</button>
                </div>
            </div>
            <div className='bg-primaryBlack md:ml-6 relative p-[2.4rem] flex items-end overflow-hidden'>
                <img src={perfume} alt="" className=' absolute left-[24%] top-[20%] ' />
                <div className=' z-10'>
                    <h3 className={styles.arrivalHeading}>Perfume</h3>
                    <p className={styles.arrivalDesc}>GUCCI INTENSE OUD EDP.</p>
                    <button onClick={() => navigation("/product/guuci-intense-oud-edp")} className={styles.arrivalBtn}>Shop Now</button>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default Arrivals