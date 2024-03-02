import React from 'react'
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from 'react-router-dom';


const PreviousButton = () => {
  const navigation = useNavigate()
  
  return (
    <div onClick={() => navigation(-1)} className=' flex items-center gap-2 mb-8 cursor-pointer hover:text-primary'>
        <WestIcon style={{fontSize: 24}} />
        <p className='text-[12px] md:text-[14px] font-poppins'>Previous Page</p>
    </div>
    
  )
}

export default PreviousButton