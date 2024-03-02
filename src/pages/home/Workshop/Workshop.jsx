import React, { useEffect, useState } from 'react'
import styles from '../../../styles'
import { shop } from '../../../constants/images'
import Button from '../../../components/Button/Button'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Cookies from 'js-cookie'
import axios from 'axios';

const Workshop = () => {
    const initialValues = { username: "", email: "", number: ""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [recipient_email, setEmail] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [dataContainer, setDataContainer] = useState([])

    const [submiteMessage, setSubmitMessage] = useState(false)
    // console.log(recipient_email)

    // const [cookies, setCookies] = useCookies([''])


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
        setEmail(formValues.email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        setSubmitMessage(true)

        setTimeout(() => {
            setSubmitMessage(false)

            return clearTimeout()
        }, 3000)


    }

    useEffect(() => {
        // console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            const newData = dataContainer.push(formValues)
            setDataContainer(...[dataContainer, newData])
            // console.log(dataContainer)


            Cookies.set("user", JSON.stringify(dataContainer), { 
                expires: 5, 
                path: "/", 
                secure: true, 
                sameSite: 'strict'
            })
        }


    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username) {
            errors.username = "Username is required."
        }
        if(!values.email) {
            errors.email = "Email is required."
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!"
        }
        if(!values.number) {
            errors.number = "Phone number is required"
        } else if(values.number.length < 11) {
            errors.number = "Phone number should be at least 11 characters"
        } else if(values.number.length > 13) {
            errors.number = "Phone number should not be more than 13 characters"
        }

        // console.log(errors)
        return errors;

    }

    // const sendEmail = () => {
    //     if(Object.keys(formErrors).length === 0) {
    //         console.log("Sending Email");
    //         console.log(recipient_email)
            
    //         axios
    //             .post("http://localhost:500/send_email", {
    //                 recipient_email: recipient_email,
    //             })
    //             .then(() => alert("Email sent successfully"))
    //             .catch(() => alert("An error happened"))
    //     }
    //     return alert("Fill all details correctly")
    // }

  return (
    <div className={`${styles.section} ${styles.margin} ${styles.flexCenter} md:flex-row flex-col md:gap-[18rem] gap-[3rem] bg-primaryBlack p-[2rem] md:p-[4rem] min-h-[600px] overflow-hidden  relative`}>
        {Object.keys(formErrors).length === 0 && isSubmit 
            ? (
                <div className={`absolute md:top-[10px] md:right-[3rem] top-[20px] right-[1.2rem] bg-primaryWhite w-[300px] h-[100px] ${submiteMessage ? 'translate-y-0' : '-translate-y-[8rem]'} z-10 flex justify-center items-center gap-4`}>
                    
                    <CheckCircleOutlineIcon style={{fontSize: 28}} className=' text-lightGreen' />
                    <p className=' font-poppins font-medium text-[16px] md:text-[18px]'>Registered successfully</p>
                </div>

            )
            : (
                <div className={`absolute md:top-[10px] md:right-[3rem] top-[20px] right-[1.2rem] bg-primaryWhite min-w-[300px] h-[100px] ${submiteMessage ? 'translate-y-0' : '-translate-y-[8rem]'} z-10 flex justify-center items-center gap-4`}>
                
                        <CancelOutlinedIcon style={{fontSize: 28}}  className=' text-primary'/>
                        <p className=' font-poppins font-medium text-[16px] md:text-[18px]'>Error. Please try again.</p>
                    
               </div>
            )
        }
        {/* <pre className='text-white'>{JSON.stringify(formValues, undefined, 2)}</pre> */}
        <div className=' sm:w-full md:mt-0'>
            <p className='text-primary text-[16px] font-poppins font-semibold md:mb-10 mb-8'>SAVE THE DAY</p>
            <h2 className=' max-w-[450px] md:max-w-[830px] text-[23px] md:text-[30px] font-inter font-semibold text-center md:text-start mx-auto md:mx-0 text-primaryWhite md:leading-[50px]'>Join 1-day Long Free Workshop for Advance <span className=' text-primary'>Mastering</span> On Sales.</h2>
            <p className='text-primaryWhite text-[13px] md:text-[16px] font-poppins  md:my-4 my-2 text-center md:text-start'>Limited Time Offer! Hurry Up</p>
        </div>
            <img src={shop} alt="" className='md:block hidden absolute left-[35%] top-[28%] h-[450px]' />
            <img src={shop} alt="" className='md:hidden block absolute left-[30%] bottom-[0%] h-[300px] opacity-60' />

        {/* FORM */}
        <div className=' w-full md:pl-[8rem] z-10'>
            <form onSubmit={handleSubmit} className=''>
                <h2 className='text-primaryWhite font-poppins font-medium md:text-[30px] text-[28px] text-center mb-6'>Register Now</h2>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username"
                    value={formValues.username}
                    onChange={handleChange}
                    className=' bg-transparent border border-dimWhite px-4 py-3 w-full text-primaryWhite rounded-2xl'
                />
                <p className=' text-primary font-poppins font-medium text-[16px] md:text-[18px] mb-4'>{formErrors.username}</p>

                <input 
                    type="text" 
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                    className=' bg-transparent border border-dimWhite px-4 py-3 w-full text-primaryWhite rounded-2xl'
                />
                <p className=' text-primary font-poppins font-medium text-[16px] md:text-[18px] mb-4'>{formErrors.email}</p>

                <input 
                    type="tel" 
                    name="number"
                    pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                    placeholder="Phone Number (xxxx-xxx-xxxx)"
                    value={formValues.number}
                    onChange={handleChange}
                    className=' bg-transparent border border-dimWhite px-4 py-3 w-full text-primaryWhite rounded-2xl'
                />
                <p className=' text-primary font-poppins font-medium text-[16px] md:text-[18px] mb-4'>{formErrors.number}</p>

                <div className=' text-center mt-4'>
                    <Button text="Submit" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Workshop