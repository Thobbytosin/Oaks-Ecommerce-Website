import React, { useContext, useState } from 'react'
import styles from '../../styles'
import { cart } from '../../constants/images'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { toast } from "react-toastify";
import { sendEmailVerification, updateProfile } from 'firebase/auth'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ButtonSpinner, PageTag } from '../../components'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import GoToTop from '../../components/GoToTop/GoToTop'

const SignUp = () => {
  const navigation = useNavigate()
  const location = useLocation()
  const [errorMessage, setErrorMessage] = useState("")
  const {createUser, loading, user} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const from = location.state?.from?.pathname || "/"



  const handleSignUp = async (event) => {
    event.preventDefault()

    const form = event.target
    let fullname = form.fullname.value
    let username = form.username.value
    let email = form.email.value
    let password = form.password.value
    let confirmPassword = form.confirmPassword.value


    // take the username value and check from database if it exists with findIndex

      const querySnapshot = await getDocs(collection(db, "users"));
      const info = querySnapshot.docs?.map(doc => ({...doc.data()}))
      const findExistingUsername = info?.findIndex((user) => user.username === username || user.email === email )

      const orderConstant = {
        placed: "You placed an order. Awaiting confirmation.",
        confirmed: "Your order has been successfully confirmed. We will notify you when your order is shipped",
        outForDelivery: "Your order is out for delivery. Our Delivery Agent will contact you shortly.",
        slightDelay: "Your delivery has been delayed. Sorry for the inconvenience.",
        dayDelivery: "Your order will be delivered today.",
        delivered: "Your order has been delivered. Thank you for shopping at Oaks!",
        shipped: "Your order has been shipped.",
        ontheway: "Your order on the way to (last mile) hub.",
        ontheway2: "Your order has reached at last mile hub."
      }

    const userInfo = {
        fullname,
        username,
        orders: [],
        wishlists: [],
        trackConstants: [
          {...orderConstant}
        ],
        allOrdersDelivered: []
    }

    // const updateProductDataBase = doc(db, "products", "all");
    // const productsData = {...allProducts}

    if(password !== confirmPassword) {
      setErrorMessage("Password do not match. Please enter correct password")
    } else if(password.length < 6) {
      setErrorMessage("Password should at least be 6 characters.")
    }else if( findExistingUsername >= 0 ) {
      setErrorMessage("Username/Email already exists!")
    } else {
      !user?.emailVerified ? createUser(email, password).then( async (userCredential) => {
        let user = await userCredential.user
        try {
          await setDoc(doc(db, "users", user.uid), {...userInfo, id: user.uid});
          console.log('Working')
        } catch (error) {
          console.log(error.messsage)
        }

        await updateProfile(user, {displayName: username}).then(() => {

          console.log('Profile updated')
        }).catch((error) => {
          console.log('An error occurred')
        })

        toast.info(`Kindlly check your email address for verification link and sign in`, {
          position: "top-center",
          autoClose: 3000
        })
        navigation("/login")
        
        console.log(user)

        await sendEmailVerification(user).then(() => {
          updateProfile(user, {emailVerified}).then(() => {

            // console.log(user)
          }).catch((error) => {
            console.log('An error occurred')
          })
          
        })
      }).catch((error) => {
        const errMsg = error.message
        setErrorMessage("Account already exists")
      })

      : setErrorMessage("Kindly log out before creating a new account.")

    }

    
    

    

  }

  // const handleSignUpWithGmail = () => {
  //   signUpWithGmail().then((userCredential) => {
  //     const user = userCredential.user
  //     console.log(user)
  //     toast.success("Logged in Successfully", {
  //       position: "top-center",
  //       autoClose: 3000
  //     })
  //     navigation(from, {replace: true})

  //   }).catch((error) => {
  //     const errMsg = error.message
  //     setErrorMessage("Please select a valid email address")
  //   })
  // }

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
        <GoToTop />
        <PageTag prevPage='Home' next='SignUp' />

      <div className={` ${styles.flexCenter} md:flex-row flex-col md:gap-[3rem]`}>
        <div className=' md:w-[605px]   md:h-[680px] bg-[#CBE4E8] overflow-hidden flex justify-center'>
          <img src={cart} alt="" className=' object-contain md:object-cover md:w-full w-[50%] ' />
        </div>

        <div className=' md:w-[35%] w-[90%] mx-auto mt-[4rem] md:mt-0'>
            <form onSubmit={handleSignUp} className='' >
                      <h2 className='text-primaryBlack font-poppins font-medium md:text-[30px] text-[28px] mb-2 text-center md:text-left'>Create Account</h2>
                      <p className=' mb-8 font-poppins md:text-[18px] text-[16px] text-center md:text-left'>Enter your details below</p>
                      <input 
                          type="text" 
                          name="fullname"
                          placeholder="Full Name"
                          className=' bg-transparent border-b border-darkGray py-3 w-full text-primaryBlack '
                      />

                      <input 
                          type="text" 
                          name="username"
                          placeholder="Username"
                          className=' bg-transparent border-b border-darkGray py-3 w-full text-primaryBlack mt-5'
                      />

                      <input 
                          type="text" 
                          name="email"
                          placeholder="Email"
                          className=' bg-transparent border-b border-darkGray  py-3 w-full text-primaryBlack mt-5'
                      />
                      
                      <div className='py-3 w-full flex justify-between items-center border-b border-darkGray  '>
                        <input 
                            type={ showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Password"
                            required
                            className=' bg-transparent  w-full text-primaryBlack mt-5'
                        />
                      {showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} style={{cursor: "pointer"}} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} style={{cursor: "pointer"}} /> }

                      </div>

                      <div className='py-3 w-full flex justify-between items-center border-b border-darkGray  '>
                        <input 
                            type={ showPassword ? "text" : "password"} 
                            name="confirmPassword"
                            placeholder="Confirm Password"
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

                      <div className=' text-center mt-10'>
                          <button className=' w-full text-center md:py-5 py-4 font-poppins md:text-[16px] text-14px bg-primary text-primaryWhite flex justify-center items-center'>
                            {loading ? <ButtonSpinner color="primaryWhite" /> : <span>Create Account</span> }
                          </button>
                      </div>

            </form>
                         
            <p className=' md:text-[16px] text-[14px] font-poppins text-primaryBlack text-center mt-[2rem]'>Already have an account? <span className=' border-b-2 border-darkGray cursor-pointer ml-4 text-primary font-medium' onClick={() => navigation('/login')}>Sign In</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp