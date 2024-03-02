import React, { useContext } from 'react'
import styles from '../../styles'
import { forgotPassword } from '../../constants/images'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from "react-toastify";
import GoToTop from '../../components/GoToTop/GoToTop';

const ResetPassword = () => {
  const navigation = useNavigate();
  const { resetPassword } = useContext(AuthContext)

  const handleReset = (event) => {
    event.preventDefault()

    const form = event.target
    const email = form.email.value

    resetPassword(email).then(() => {
      // Password reset!
      toast.info("A password reset link has been sent to your email", {
        position: "top-center",
        autoClose: 3000
      })
    }).catch((error) => {
      const errMsg = error.message
      console.log(errMsg)
    })

  }

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding} ${styles.flexCenter} sm:flex-row flex-col sm:gap-[3.1rem] gap-[1.5rem] md:gap-[5.2rem]`}>
      <GoToTop />
      <div>
        <img src={forgotPassword} alt="" className='w-[150px] sm:w-[200px] md:w-[270px]' />
      </div>

      <div>
        <h2 className='font-inter text-center md:text-[34px] sm:text-[24px] text-[18px] font-semibold'>Forgot Password</h2>
        <p className=' font-poppins md:text-[16px] sm:text-[14px] text-[12px] my-3 sm:my-6 max-w-[550px] text-center'>Enter your email and we'll send a link to reset your password.</p>

        <form onSubmit={handleReset} className=' mt-[1.3rem] sm:mt-[3rem]'>
          <input 
            type="email" 
            name="email"
            placeholder='Enter email'
            required
            className=' block bg-primaryGray w-full py-2 px-3 text-[12px] sm:text-[14px]'
          />

          <button className='  w-full py-2 text-center font-poppins sm:text-[14px] text-[12px] bg-primary text-primaryWhite mt-[0.88rem]'>SubMit</button>

          <p onClick={() => navigation("/login")} className=' flex items-center justify-center gap-1 cursor-pointer text-[12px] sm:text-[14px] md:text-[16px] mt-[1.11rem] font-poppins font-medium text-center'>
            <NavigateBeforeIcon style={{fontSize: 16}} />
            <span>Back to Login</span>
          </p>
        </form>

      </div>
    </div>
  )
}

export default ResetPassword