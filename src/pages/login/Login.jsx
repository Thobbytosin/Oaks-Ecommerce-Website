import React, { useContext, useState } from 'react'
import styles from '../../styles'
import { cart, googleIcon } from '../../constants/images'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateProfile } from 'firebase/auth'
import { ButtonSpinner, PageTag } from '../../components'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase.config'
import { allProducts } from '../../constants/allProducts'
import GoToTop from '../../components/GoToTop/GoToTop'

const Login = () => {
  const navigation = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const { login, loading, signUpWithGmail } = useContext(AuthContext)
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  
  const from = location.state?.from?.pathname || "/"


  const handleLogin = (event) => {
      event.preventDefault()

      const form = event.target
      const email = form.email.value
      const password = form.password.value
      login(email, password).then(async (userCredential) => {
        const user = userCredential.user
        // console.log(user)

        user.emailVerified
          ? toast.success("Logged in Successfully", {
          position: "top-center",
          autoClose: 3000
          }) 
          : setErrorMessage("Email is not verified!")

          const updatUser = doc(db, "users", user?.uid);

          user.emailVerified && await updateDoc(updatUser, {
            email: user.email,
            passcode: password,
            
          });

          
          
          user.emailVerified && navigation(from, {replace: true})
          user.emailVerified && await updateProfile(user, {displayName: user.displayName, passcode: password}).then(() => {
            // profile updated
          })
      }).catch((error) => {
        const errMsg = error.message
        setErrorMessage("Please enter a valid email and password!")
      })
  }

  const handleSignUpWithGmail = () => {
    signUpWithGmail().then((userCredential) => {
      const user = userCredential.user
      // console.log(user)
      toast.success("Logged in Successfully", {
        position: "top-center",
        autoClose: 3000
      })
      navigation(from, {replace: true})

    }).catch((error) => {
      const errMsg = error.message
      console.log(errMsg)
      setErrorMessage("Please select a valid email address")
    })
  }

  

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      <PageTag prevPage='Home' next='Login' />

      <div className={` ${styles.flexCenter} md:flex-row flex-col md:gap-[3rem]`}>
        <div className=' w-[605px]  md:h-[680px] bg-[#CBE4E8] overflow-hidden flex justify-center'>
          <img src={cart} alt="" className=' object-contain md:object-cover md:w-full w-[50%] ' />
        </div>

        <div className=' md:w-[35%] w-[90%] mx-auto mt-[4rem] md:mt-0'>
            <form onSubmit={handleLogin} className='' >
                      <h2 className='text-primaryBlack font-poppins font-medium md:text-[30px] text-[28px] mb-2 text-center md:text-left'>Sign in to your account</h2>
                      <p className=' mb-8 font-poppins md:text-[18px] text-[16px] text-center md:text-left'>Enter your details below</p>
                      <input 
                          type="email" 
                          name="email"
                          placeholder="Email Address *"
                          required
                          className=' bg-transparent border-b border-darkGray py-3 w-full text-primaryBlack '
                      />

                      <div className='py-3 w-full flex justify-between items-center border-b border-darkGray  '>
                        <input 
                            type={ showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Password *"
                            required
                            className=' bg-transparent  w-full text-primaryBlack mt-5'
                        />
                        {showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} style={{cursor: "pointer"}} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} style={{cursor: "pointer"}} /> }

                      </div>

                      {errorMessage && 
                        <div className=' text-primary font-poppins font-medium text-[16px] md:text-[18px] my-4'>
                        {errorMessage}
                        </div>
                      }

                      <div className=' text-center mt-10 flex justify-between items-center'>
                          <button className='text-center py-2  px-[2rem] font-poppins md:text-[16px] text-14px bg-primary text-primaryWhite flex items-center justify-center gap-3'>
                            
                            {loading ? <ButtonSpinner color="primaryWhite" /> : <span>Sign in</span> }
                          </button>
                          <p onClick={() => navigation("/reset-password")} className=' md:text-[16px] text-[14px] font-poppins text-primary cursor-pointer'>Forgot Password?</p>
                          
                      </div>

            </form>


                <p className=' md:text-[16px] text-[14px] font-poppins text-primaryBlack text-center mt-[2rem]'>You don't have an account? <span className=' border-b-2 border-darkGray cursor-pointer ml-4 text-primary font-medium' onClick={() => navigation('/signup')}>Sign Up</span></p>
          
        </div>
      </div>
    </div>
  )
}

export default Login