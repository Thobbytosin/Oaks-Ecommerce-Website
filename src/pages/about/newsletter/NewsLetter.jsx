import React, { useState, useEffect} from 'react'
import styles from '../../../styles'
import { newsletter } from '../../../constants/images'
import { EmailOutlined } from '@mui/icons-material';

const NewsLetter = () => {

    const initialValues = { email: '' }
  const [userEmail, setUserEmail] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserEmail({...userEmail, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormErrors(validateEmail(userEmail))
    setIsSubmit(true)

  }

  useEffect(() => {
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit ) {
      console.log(userEmail)
    }
  }, [formErrors])

  const validateEmail = (value) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!value.email) {
      errors.email = 'Email is required'
    } else if (!regex.test(value.email)) {
      errors.email = "This is not a valid email."
    }

    return errors
  }


  return (
    <div className={`${styles.section} ${styles.flexCenter} flex-col newsletter text-center`}>
        <h2 className=' font-inter md:text-[35px] sm:text-[30px] text-[26px] font-medium text-center mb-2'>Join Our Newsletter</h2>
        <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] text-center mb-6 md:mb-8'>Sign up for deals, new products and promotions</p>
        <form onSubmit={handleSubmit} className=' border-b-2 border-darkGray md:p-4 p-2 flex justify-between font-poppins md:w-[40%] w-[85%] z-10'>
            <EmailOutlined  />
              <input 
                type="text" 
                name='email'
                placeholder='Email Address'
                value={userEmail.email}
                onChange={handleChange}
                className=' bg-transparent w-full text-[12px] md:text-[14px] ml-2 md:ml-4'
                
              />
              <button className=' text-primaryBlack hover:text-primary opacity-80 md:text-[14px] text-[12px]'>Signup</button>
              

            </form>
            <p className=' text-primary font-poppins font-medium text-[12px] md:text-[14px] mt-2'>{formErrors.email}</p>
    </div>
  )
}

export default NewsLetter