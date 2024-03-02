import React, { useState } from 'react'
import ReportIcon from '@mui/icons-material/Report';

const Logout = (popup) => {
  const [hidePop, setHidePop] = useState(false)
  return (

    <div>
        {popup 
            && <div onClick={() => setHidePop(true)} className=' fixed top-0 left-0 w-[100vw] min-h-screen bg-black bg-opacity-40 z-30 cursor-pointer transit-left' />
            
        }
{/* 
        {popup 
            && 
            <div className='md:fixed top-[30%] left-0 md:mx-auto md:w-[40%] h-[40%] hidden justify-center items-center bg-primaryWhite z-40'>
                <div className=' flex items-center gap-3'>
                    <ReportIcon style={{fontSize: 46, color: '#DB4444'}} />
                    <h2 className=' text-center font-poppins font-medium text-[24px]'>Are you sure you want to logout?</h2>

                </div>

            </div>
            
        } */}

    </div>
  )
}

export default Logout