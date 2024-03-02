import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

const PageTag = ({ prevPage, next = "", curPage = "", subPage = "", lastPage = ""}) => {
    // const navigation = useNavigate()
  return (
          
    <div className=' flex items-center mb-[2.4rem] md:mb-[3.4rem] '>
        <p className=' text-[10px] sm:text-[12px] md:text-[14px] font-poppins  text-darkGray flex items-center'>
          <div className=' hidden sm:block'>
            <HomeIcon style={{fontSize: 22}} />
          </div>
          <div className=' sm:hidden block'>
            <HomeIcon style={{fontSize: 14}} />
          </div>
          <span className=' ml-1'>{`${prevPage} >`}</span>
        </p>
        <p className={` ml-2 font-poppins font-medium ${next.length >= 1 && curPage.length < 1 ? 'text-primaryBlue text-[10px] sm:text-[12px] md:text-[14px]' : 'text-darkGray text-[10px] sm:text-[12px] md:text-[14px]'}`}>{next} {next.length >= 1 && curPage.length >=1 && '>'}</p>
        <p className={` ml-2 font-poppins font-medium ${subPage.length >= 1 ? 'text-darkGray text-[10px] sm:text-[12px] md:text-[14px]' : 'text-primaryBlue text-[10px] sm:text-[12px] md:text-[14px] max-w-[120px] truncate'}`}>{curPage} {subPage.length >=1 && '>'}</p>
        <p className={`ml-2 font-poppins font-medium ${lastPage.length >= 1 ? 'text-darkGray text-[10px] sm:text-[12px] md:text-[14px]' : 'text-primaryBlue text-[10px] sm:text-[12px] md:text-[14px]'}`}>{subPage} {lastPage.length >=1 && '>'}</p>
        <p className=' text-[10px] sm:text-[12px] md:text-[14px] ml-2 font-poppins font-medium text-primaryBlue'>{lastPage}</p>
    </div>
 
  )
}

export default PageTag