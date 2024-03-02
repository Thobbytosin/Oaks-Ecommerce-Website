import React from 'react'

const Button = ({text}) => {
  return (
    <button className=' text-primaryWhite bg-primary font-poppins text-[10px] md:text-[12px] text-center px-6 py-2'>
        {text}
    </button>
   
  )
}

export default Button