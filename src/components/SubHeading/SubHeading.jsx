import React from 'react'
import styles from '../../styles'

const SubHeading = ({heading}) => {
  return (
    <div className={`${styles.flexJustifyStart} gap-3 md:mb-10 mb-8`}>
        <div className=' w-[10px] md:w-[20px] h-[40px] bg-primary' />
        <p className=' text-primary text-[12px] sm:text-[14px] md:text-[16px] font-poppins font-semibold'>{heading}</p>
    </div>
  )
}

export default SubHeading