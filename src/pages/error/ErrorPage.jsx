import React from 'react'
import styles from '../../styles'
import { Button, PageTag } from '../../components'
import { useNavigate } from 'react-router-dom'
import { err } from '../../constants/images'
import HomeIcon from '@mui/icons-material/Home';
import WestIcon from '@mui/icons-material/West';
import GoToTop from '../../components/GoToTop/GoToTop'

const ErrorPage = () => {
  const navigation = useNavigate()

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>\
      <GoToTop />
      <PageTag prevPage="Home" curPage="404 Error" />
      <div className=' flex flex-col justify-center'>
        <div className=' w-full flex justify-center items-center'>
          <img src={err} className=' w-[200px]' />

        </div>
        <h1 className=' font-inter md:text-[44px] sm:text-[34px] text-[28px] text-center font-medium '>404 Not Found</h1>
        <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] max-w-[650px] text-center mt-8'>Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the page is removed.</p>
        <div className=' mt-[2rem] flex justify-center gap-4'>
          {/* <Button text="Back to Home page" /> */}
          <button onClick={() => navigation('/')} className=' text-primaryWhite bg-primary font-poppins text-[10px] sm:text-[12px] md:text-[14px] text-center w-[180px] flex items-center justify-center gap-2'>
              <HomeIcon style={{fontSize: 16}} />
              <span>GO TO HOME</span>
          </button>
          <button onClick={() => navigation(-1)}  className=' text-primary border-2 border-primary bg-transparent font-poppins text-[10px] sm:text-[12px] md:text-[16px] text-center w-[180px] flex justify-center items-center gap-2 py-2'>
              <WestIcon style={{fontSize: 16}} />
              <span>GO BACK</span>
              
          </button>

        </div>
      </div>
    </div>
  )
}

export default ErrorPage