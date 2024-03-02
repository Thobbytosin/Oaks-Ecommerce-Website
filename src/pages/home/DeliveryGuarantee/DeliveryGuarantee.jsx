import React from 'react'
import styles from '../../../styles'
import { guarantee } from '../../../constants'
import NorthIcon from '@mui/icons-material/North';

const DeliveryGuarantee = (props) => {
  return (
    <div className={`${styles.section} ${styles.padding} ${styles.flexCenter} sm:flex-row flex-col md:gap-[3rem] gap-[1.6rem] relative`}>
        {guarantee.map((item) => (
            <div key={item.id} className=' sm:w-[220px]  flex flex-col justify-start items-center  text-center'>
                <div className=' w-[80px] bg-primaryGray rounded-full p-4 flex justify-center items-center mb-4 '>
                    <div className=' bg-primaryBlack rounded-full p-2 flex items-center justify-center'>
                        <img src={item.icon} alt="" />
                    </div>
                </div>
                <h3 className=' font-poppins text-[14px] md:text-[16px] font-semibold mb-2 text-primaryBlack'>{item.title}</h3>
                <p className=' font-poppins text-primaryBlack text-[10px] md:text-[12px] '>{item.desc}</p>
            </div>
        ))}

        <div className=' absolute right-[4%] -bottom-20 bg-primaryGray rounded-full py-2 px-2.5'>
            <a href={`#${props.section}`}><NorthIcon style={{fontSize: 20, fontWeight: 'bold'}} /></a>
        </div>
    </div>
  )
}

export default DeliveryGuarantee