import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useNavigate } from 'react-router-dom';
import { appstore, barcode, googlestore } from '../../constants/images';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const navigation = useNavigate()
  
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
    // console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit ) {
      // console.log(userEmail)
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
    <div className={`${styles.footerPadding} bg-primaryBlack text-primaryWhite mt-6`}>

        <div className={`flex md:flex-row flex-col justify-between items-start gap-8 text-primaryWhite`}>

          <div>
            <h2 className=' font-inter md:text-[24px] text-[20px] font-bold mb-4'>Oaks</h2>
            <p className=' font-poppins md:text-[16px] text-[12px] sm:text-[14px] font-medium mb-5'>Subscribe to our Newsletter</p>
            <p className=' font-poppins text-[12px] mb-2'>Get 10% off all your orders.</p>

            <form onSubmit={handleSubmit} className=' border border-primaryWhite p-2 md:p-4 flex justify-between rounded-lg font-poppins w-[85%]'>
              <input 
                type="text" 
                name='email'
                placeholder='Enter your email'
                value={userEmail.email}
                onChange={handleChange}
                className=' bg-transparent w-full text-[12px]'
                
              />
              <button><SendOutlinedIcon  /></button>
              

            </form>
            <p className=' text-primary font-poppins font-medium text-[16px] md:text-[18px] mt-2'>{formErrors.email}</p>
            
          </div>    

          <div>
            <h2 className={styles.footerHeading}>Support</h2>
            <p className={`${styles.footerItem} max-w-[320px]`}>22, Afolabi Awosanya Lamidi Street, Ikeja, Lagos</p>
            <p className={styles.footerItem}>oaks@gmail.com</p>
            <p className={styles.footerItem}>+1234567890</p>
          </div>  

          <ul>
            <h2 className={styles.footerHeading}>Account</h2>
            <li className={styles.footerLink}>My Account</li>
            <li onClick={() => navigation('/signup')} className={styles.footerLink}>Login/Register</li>
            <li onClick={() => navigation('/cart')} className={styles.footerLink}>Cart</li>
            <li onClick={() => navigation('/wishlist')} className={styles.footerLink}>Wishlist</li>
            <li onClick={() => navigation('/products')} className={styles.footerLink}>Products</li>
          </ul>  

          <ul>
            <h2 className={styles.footerHeading}>Quick Links</h2>
            <li className={styles.footerLink}>My Account</li>
            <li onClick={() => navigation('/privacy-policy')} className={styles.footerLink}>Privacy Policy</li>
            <li onClick={() => navigation('/terms-conditions')} className={styles.footerLink}>Terms of Use</li>
            <li onClick={() => navigation('/faqs')} className={styles.footerLink}>FAQs</li>
            <li onClick={() => navigation('/contact')} className={styles.footerLink}>Contact</li>
          </ul>  

          <div>
            <h2 className={styles.footerHeading}>Download App</h2>
            <p className=' font-poppins text-[10px] md:text-[12px] font-medium'>Save &#8358;2000 with App New User Only</p>

            <div className='flex gap-2 md:mt-4 mt-2'>
            <div>
                <img src={barcode} alt="" />
              </div> 
              <div className=' flex flex-col justify-between'>
                <img src={googlestore} alt="" />
                <img src={appstore} alt="" />
              </div>
            </div>

            <div className='mt-8 flex justify-between items-center gap-6'>
              <FaFacebookF size={28} className=' cursor-pointer hover:text-primary' />
              <FaTwitter size={28} className=' cursor-pointer hover:text-primary' />
              <FaInstagram size={28} className=' cursor-pointer hover:text-primary' />
              <FaLinkedinIn size={28} className=' cursor-pointer hover:text-primary' />

            </div>
          </div>  

        </div>

        <p className=' font-poppins md:text-[16px] text-[14px] text-center text-darkGray mt-[8rem]'>&copy; Copyright Oaks 2023. All right reserved</p>

      
    </div>
  )
}

export default Footer