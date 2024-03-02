import React from 'react'
import styles from '../../../styles'
import { PageTag } from '../../../components'
import { about } from '../../../constants/images'

const AboutBanner = () => {
  return (
    <div id='aboutBanner' className={`${styles.paddingY} ${styles.paddingLeft}`}>
      <PageTag curPage="About" prevPage="Home" />

      <div className={`${styles.flexCenter} md:flex-row flex-col gap-10`}>
        <div className=' md:max-w-[50%] md:pr-0 pr-6'>
          <h2 className={`${styles.heading} md:mb-8 mb-6`}>Our Story</h2>
          <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] md:mb-4 mb-2'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
          <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px]'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
        </div>

        <div className=' w-[837px] h-[509px] bg-primary overflow-hidden'>
          <img src={about} alt="" className=' w-full h-full object-cover ' />
        </div>

      </div>

    </div>
  )
}

export default AboutBanner