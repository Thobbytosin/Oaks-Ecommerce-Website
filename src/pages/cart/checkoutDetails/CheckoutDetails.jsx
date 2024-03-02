import React, { useContext, useEffect, useState } from 'react'
import { Button, ButtonSpinner } from '../../../components'
import styles from '../../../styles'
import { paystack } from '../../../constants/images'
import { AuthContext } from '../../../context/AuthProvider'
import { updateProfile } from 'firebase/auth'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import  PaystackPop  from '@paystack/inline-js'
import { setSummary } from '../../../features/cart/cartSlice'
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase.config'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const CheckoutDetails = ({back, proceed}) => {

  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumnber] = useState("")
  const [phoneNumber2, setPhoneNumnber2] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("Nigeria")
  const [detailsInputed, setDetailsInputed] = useState(false)
  const [info, setInfo] = useState([])
  const [showPayment, setShowPayment] = useState(false)
  const [complete, setComplete] = useState(null)
  const [notCompleted, setNotCompleted] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [transactionDate, setTransactionDate] = useState(null)
  const [cartArray, setCartArray] = useState([])
  let [dbFirstName, setDBfirstName] = useState("")
  let [dbLastName, setDBlastName] = useState("")
  let [dbPhoneNumber1, setDBphoneNumber1] = useState("")
  let [dbPhoneNumber2, setDBphoneNumber2] = useState("")
  let [dbAddress, setDBaddress] = useState("")
  let [dbState, setDBstate] = useState("")
  let [dbCity, setDBcity] = useState("")
  let [dbZipCode, setDBzipCode] = useState("")
  const [formErrors, setFormErrors] = useState({firstName})

  // console.log(user)

  const getInfo = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    
    setInfo(data)
    
  }

  useEffect( () => {
    getInfo()
  }, [])

  // console.log(info)

  // dbFirstName = info?.firstName
  // dbLastName = info?.lastName
  // dbPhoneNumber1 = info?.phoneNumber
  // dbPhoneNumber2 = info?.phoneNumber2
  // dbAddress = info?.address
  // dbCity = info?.city
  // dbState = info?.state
  // dbZipCode = info?.zipCode

  
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  const cart = useSelector((state) => state.cart)

  


  
  const handleSubmit = (event) => {
    event.preventDefault()

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000);

    const information = {
      firstName,
      lastName,
      phoneNumber,
      phoneNumber2,
      address,
      city,
      state,
      zipCode,
      country

    }

    const updateUserDetails = async () => {

        user.userInfo = true
        user.firstName = firstName
        user.lastName = lastName
        user.phoneNumber = phoneNumber
        user.phoneNumber2 = phoneNumber2
        user.address = address
        user.city = city
        user.state = state
        user.zipCode = zipCode
        user.country = country
     
        const updatUserInfo = doc(db, "users", user?.uid);

        if(user?.firstName?.length < 1) {
          setDBfirstName("First name can not be empty")
          setDBlastName("Last name can not be empty")
          setDBphoneNumber1("Enter a valid phone number")
          setDBaddress("Input your shipping address")
          setDBstate("State can not be empty")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && lastName?.length < 1) {
          setDBfirstName("")
          setDBlastName("Last name can not be empty")
          setDBphoneNumber1("Enter a valid phone number")
          setDBaddress("Input your shipping address")
          setDBstate("State can not be empty")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && user?.lastName?.length >= 1 && phoneNumber?.length < 1) {
          setDBlastName("")
          setDBphoneNumber1("Enter a valid phone number")
          setDBaddress("Input your shipping address")
          setDBstate("State can not be empty")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && user?.lastName?.length >= 1 && user?.phoneNumber?.length >= 1 && address?.length < 1) {
          setDBphoneNumber1("")
          setDBaddress("Input your shipping address")
          setDBstate("State can not be empty")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && user?.lastName?.length >= 1 && user?.phoneNumber?.length >= 1 && user?.address?.length >= 1 && state?.length < 1) {
          setDBaddress("")
          setDBstate("State can not be empty")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && user?.lastName?.length >= 1 && user?.phoneNumber?.length >= 1 && user?.address?.length >= 1 && user?.state?.length >= 1 && city?.length < 1) {
          setDBstate("")
          setDBcity("City can not be empty")
          setDBzipCode("Enter your city Zipcode")
        } else if (user?.firstName?.length >= 1 && user?.lastName?.length >= 1 && user?.phoneNumber?.length >= 1 && user?.address?.length >= 1 && user?.state?.length >= 1 && user?.city?.length >= 1 && zipCode?.length < 1) {
          setDBcity("")
          setDBzipCode("Enter your city Zipcode")
        } else {
          setDBfirstName("")
          setDBlastName("")
          setDBphoneNumber1("")
          setDBaddress("")
          setDBstate("")
          setDBcity("")
          setDBzipCode("")

          await updateDoc(updatUserInfo, {...information});
          
  
          await updateProfile(user, {displayName: user.displayName}).then(() => {
            console.log('Updated', user)
            setShowPayment(true)
            setDetailsInputed(true)
            toast.success(`Profile Updated Successfully`, {
              position: "top-center",
              autoClose: 3000
            })
          }).catch((error) => {
            console.log(error)
          })

        }
  

        
      
    }

    updateUserDetails()


  }

  const checkIfDetailsExist = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().address
    // console.log(data.address)
    if (data?.length >= 1) {
      setDetailsInputed(true)
      console.log('working')

      // console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    checkIfDetailsExist()
  }, [user])


  const payWithPaystack = (e) => {
    e.preventDefault()

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000);

    const paystack = new PaystackPop()
    paystack.newTransaction({
      key:"pk_test_6aa49005eb01bcf376edb33f3b0ea3082666e838",
      amount: cart.cartGrossTotal * 100,
      email: user.email,
      onSuccess(transaction){
        // alert(`SUCCESS ${transaction.reference}`)
        setPaymentStatus(`Payment Successful!`)
        transaction.reference && setComplete(true)

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

        
        let today = new Date()
        const day = today.getDate().toString().padStart(2, '0');
        const month = months[today.getMonth()]
        const year = today.getFullYear()
        const time = today.toLocaleTimeString()
        const weekday = days[today.getDay()]

        const transactionInfo = {
          weekday,
          day,
          month,
          year,
          time
        }

        // Free Delivery Date

        let tomorrow = new Date();
        let d = tomorrow.setDate(today.getDate() + 7);
        let freeDelivery = new Date(d)

        const dayFree = freeDelivery.getDate().toString().padStart(2, '0');
        const monthFree = months[freeDelivery.getMonth()]
        const yearFree = freeDelivery.getFullYear()
        const timeFree = freeDelivery.toLocaleTimeString()
        const weekdayFree = days[freeDelivery.getDay()]


        const freeDate = {
          weekdayFree,
          dayFree,
          monthFree,
          yearFree,
          timeFree
        }

        // Max. Free Delivery Date
        let maxFree = new Date()
        let m = maxFree.setDate(freeDelivery.getDate() + 1)
        let maxFreeDelivery = new Date(m)

        const dayMaxFree = maxFreeDelivery.getDate().toString().padStart(2, '0');
        const monthMaxFree = months[maxFreeDelivery.getMonth()]
        const yearMaxFree = maxFreeDelivery.getFullYear()
        const timeMaxFree = maxFreeDelivery.toLocaleTimeString()
        const weekdayMaxFree = days[maxFreeDelivery.getDay()]

        const maxFreeDate = {
          weekdayMaxFree,
          dayMaxFree,
          monthMaxFree,
          yearMaxFree,
          timeMaxFree
        }


        // Express Delivery Date

        let next = new Date();
        let e = next.setDate(today.getDate() + 3);
        let expressDelivery = new Date(e)

        const dayExpress = expressDelivery.getDate().toString().padStart(2, '0');
        const monthExpress = months[expressDelivery.getMonth()]
        const yearExpress = expressDelivery.getFullYear()
        const timeExpress = expressDelivery.toLocaleTimeString()
        const weekdayExpress = days[expressDelivery.getDay()]

        const expressDate = {
          weekdayExpress,
          dayExpress,
          monthExpress,
          yearExpress,
          timeExpress
        }

        // Max. Express Delivery Date
        let maxExpress = new Date()
        let g = maxExpress.setDate(expressDelivery.getDate() + 1)
        let maxExpressDelivery = new Date(g)

        const dayMaxExpress = maxExpressDelivery.getDate().toString().padStart(2, '0');
        const monthMaxExpress = months[maxExpressDelivery.getMonth()]
        const yearMaxExpress = maxExpressDelivery.getFullYear()
        const timeMaxExpress = maxExpressDelivery.toLocaleTimeString()
        const weekdayMaxExpress = days[maxExpressDelivery.getDay()]

        const maxExpressDate = {
          weekdayMaxExpress,
          dayMaxExpress,
          monthMaxExpress,
          yearMaxExpress,
          timeMaxExpress
        }

        // Confirmation time

        let confirmationTime = new Date(today)
      
        function addMinutesToDate(mins){
          confirmationTime.setTime(confirmationTime.getTime() + mins * 60 * 1000);
          return confirmationTime;
         }
      
         addMinutesToDate(Math.floor(Math.random() * (30 - 10) + 10))

         let orderConfirmTime = confirmationTime

          const dayConfirmation = orderConfirmTime.getDate().toString().padStart(2, '0');
          const monthConfirmation = months[orderConfirmTime.getMonth()]
          const yearConfirmation = orderConfirmTime.getFullYear()
          const timeConfirmation = orderConfirmTime.toLocaleTimeString()
          const weekdayConfirmation = days[orderConfirmTime.getDay()]


        const orderConfirmationDate = {
          weekdayConfirmation,
          dayConfirmation,
          monthConfirmation,
          yearConfirmation,
          timeConfirmation
        }     

        // Shipping time

        let shippingTime = new Date(today)
      
        function addHoursShipping(mins){
          shippingTime.setTime(shippingTime.getTime() + mins * 60 * 1000);
          return shippingTime;
         }
      
         addHoursShipping(Math.floor(Math.random() * (3640 - 2880) + 2880))

         let orderShippingTime = shippingTime
        //  console.log(orderShippingTime)

          const dayShipping = orderShippingTime.getDate().toString().padStart(2, '0');
          const monthShipping = months[orderShippingTime.getMonth()]
          const yearShipping = orderShippingTime.getFullYear()
          const timeShipping = orderShippingTime.toLocaleTimeString()
          const weekdayShipping = days[orderShippingTime.getDay()]


        const orderShippingDate = {
          weekdayShipping,
          dayShipping,
          monthShipping,
          yearShipping,
          timeShipping
        }   

        // Order On the Way

        let onWayTime = new Date(orderShippingTime)
      
        function addMinutesOnWay(mins){
          onWayTime.setTime(onWayTime.getTime() + mins * 60 * 1000);
          return onWayTime;
         }
      
         addMinutesOnWay(Math.floor(Math.random() * (2240 - 1860) + 1860))

         let orderOnWay = onWayTime
        //  console.log(orderOnWay)

          const dayOnWay = orderOnWay.getDate().toString().padStart(2, '0');
          const monthOnWay = months[orderOnWay.getMonth()]
          const yearOnWay = orderOnWay.getFullYear()
          const timeOnWay = orderOnWay.toLocaleTimeString()
          const weekdayOnWay = days[orderOnWay.getDay()]


        const orderOnWayDate = {
          weekdayOnWay,
          dayOnWay,
          monthOnWay,
          yearOnWay,
          timeOnWay
        }     

        // Order has reached last mile hub

        let orderReachedTime = new Date(orderOnWay)
      
        function addMinutesReached(mins){
          orderReachedTime.setTime(orderReachedTime.getTime() + mins * 60 * 1000);
          return orderReachedTime;
         }
      
         addMinutesReached(Math.floor(Math.random() * (2920 - 2880) + 2880))

         let orderReached = orderReachedTime
         console.log(orderReached)

          const dayReached = orderReached.getDate().toString().padStart(2, '0');
          const monthReached = months[orderReached.getMonth()]
          const yearReached = orderReached.getFullYear()
          const timeReached = orderReached.toLocaleTimeString()
          const weekdayReached = days[orderReached.getDay()]


        const orderReachedDate = {
          weekdayReached,
          dayReached,
          monthReached,
          yearReached,
          timeReached
        }   

        // Order is out for delivery

        let orderOutForDeliveryTime = new Date(orderReached)
      
        function addMinutesOrderOutForDelivery(mins){
          orderOutForDeliveryTime.setTime(orderOutForDeliveryTime.getTime() + mins * 60 * 1000);
          return orderOutForDeliveryTime;
         }
      
         addMinutesOrderOutForDelivery(Math.floor(Math.random() * (1820 - 1020) + 1020))

         let orderOutForDelivery = orderOutForDeliveryTime
         console.log(orderOutForDelivery)

          const dayOutForDelivery = orderOutForDelivery.getDate().toString().padStart(2, '0');
          const monthOutForDelivery = months[orderOutForDelivery.getMonth()]
          const yearOutForDelivery = orderOutForDelivery.getFullYear()
          const timeOutForDelivery = orderOutForDelivery.toLocaleTimeString()
          const weekdayOutForDelivery = days[orderOutForDelivery.getDay()]


        const orderOutForDeliveryDate = {
          weekdayOutForDelivery,
          dayOutForDelivery,
          monthOutForDelivery,
          yearOutForDelivery,
          timeOutForDelivery
        }   
        
        // Order is out for delivery

        let orderDeliveringTodayTime = new Date(today)
      
        function addHoursForDeliveringToday(hours){
          orderDeliveringTodayTime.setTime(orderDeliveringTodayTime.getTime() + hours * 60 * 60 * 1000);
          return orderDeliveringTodayTime;
         }
      
         addHoursForDeliveringToday(172)

         let orderDeliveringToday = orderDeliveringTodayTime
         console.log(orderDeliveringToday)

          const dayDeliveringToday = orderDeliveringToday.getDate().toString().padStart(2, '0');
          const monthDeliveringToday = months[orderDeliveringToday.getMonth()]
          const yearDeliveringToday = orderDeliveringToday.getFullYear()
          const timeDeliveringToday = orderDeliveringToday.toLocaleTimeString()
          const weekdayDeliveringToday = days[orderDeliveringToday.getDay()]


        const orderDeliveringTodayDate = {
          weekdayDeliveringToday,
          dayDeliveringToday,
          monthDeliveringToday,
          yearDeliveringToday,
          timeDeliveringToday
        }   

        // Order delivered

        let orderDeliveredTime = new Date(today)
      
        function addHoursDelivered(hours){
          orderDeliveredTime.setTime(orderDeliveredTime.getTime() + hours * 60 * 60 * 1000);
          return orderDeliveredTime;
         }
      
         addHoursDelivered(Math.floor(Math.random() * (192 - 178) + 178))

         let orderDelivered = orderDeliveredTime
         console.log(orderDelivered)

          const dayDelivered = orderDelivered.getDate().toString().padStart(2, '0');
          const monthDelivered = months[orderDelivered.getMonth()]
          const yearDelivered = orderDelivered.getFullYear()
          const timeDelivered = orderDelivered.toLocaleTimeString()
          const weekdayDelivered = days[orderDelivered.getDay()]


        const orderDeliveredDate = {
          weekdayDelivered,
          dayDelivered,
          monthDelivered,
          yearDelivered,
          timeDelivered
        }     



        function randomNumber(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }


        // order reference
        const orderRef = `OAKS${randomNumber(1000000, 10000000)}`



        const orderDetails = {
          cartItem: cartItems,
          totalCart: cart.cartGrossTotal,
          transactionId: transaction.reference,
          ...transactionInfo,
          orderId: orderRef,
          shipping: cart.cartShipping,
          freeDeliveryDate: freeDate,
          expressDeliveryDate: expressDate,
          maxFreeDeliveryDate: maxFreeDate,
          maxExpressDeliveryDate: maxExpressDate,
          orderPlaced: true,
          orderConfirmed: false,
          orderShipped: false,
          orderOnWay: false,
          orderReached: false,
          orderOutForDelivery: false,
          orderDeliveringToday: false,
          orderDelivered: false,
          orderConfirmation: orderConfirmationDate,
          orderShippingConfirmation: orderShippingDate,
          orderOnWayConfirmation: orderOnWayDate,
          orderReachedConfirmation: orderReachedDate,
          orderOutForDeliveryConfirmation: orderOutForDeliveryDate,
          orderDeliveringTodayConfirmation: orderDeliveringTodayDate,
          orderDeliveredConfirmation: orderDeliveredDate,

        }


        const updateCart = async () => {
          const updatUser = doc(db, "users", user?.uid);
  
            // Set the "capital" field of the city 'DC'
            await updateDoc(updatUser, {
              orders: arrayUnion(orderDetails)
               
            });

        }

        updateCart()

      },
      onCancel(){
        // console.log('Transaction error')
        setNotCompleted(true)
      }
    })
  }
  
  // useEffect(() => {
  //   updateCart()
  // })

  return (
    <div className={`flex items-start justify-between sm:flex-row flex-col-reverse gap-[1.2rem] md:gap-[2.4rem] mb-[3rem]`}>
      <div className=' w-[100%] sm:w-[60%]'>

        <form onSubmit={handleSubmit}>

            {/* Contact */}
            <div className=' w-full py-10 px-6 border-darkGray border md:border-2 rounded-[6px]'>
              <h2 className={styles.checkoutHeading}>Contact Information</h2>
              <div>
                  <div className=' flex justify-between gap-8'>
                    <div className=' w-full'>
                      <label htmlFor="firstName" className={styles.labelHeading}>FIRST NAME</label>
                      <input type="text" name='firstName' id="firstName" placeholder={`${info?.firstName ?  info?.firstName : firstName?.length < 1 && 'First Name' }`} value={firstName} onChange={(e) => setFirstName(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbFirstName}</p>
                    </div>

                    <div className=' w-full'>
                      <label htmlFor="lastName" className={styles.labelHeading}>LAST NAME</label>
                      <input type="text" name='lastName' id="lastName" placeholder={`${info?.lastName ?  info?.lastName : lastName?.length < 1 && 'Last Name' }`} value={lastName} onChange={(e) => setLastName(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbLastName}</p>
                    </div>
                  </div>

                  <div className=' flex justify-between gap-8 mt-5'>
                    <div className=' w-full'>
                      <label htmlFor="phone" className={styles.labelHeading}>PHONE NUMBER</label>
                      <input type="number" name='phone' id="phone" placeholder={`${info?.phoneNumber ?  info?.phoneNumber : phoneNumber?.length < 1 && 'Phone Number' }`} value={phoneNumber} onChange={(e) => setPhoneNumnber(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbPhoneNumber1}</p>
                    </div>

                    <div className=' w-full'>
                      <label htmlFor="phone2" className={styles.labelHeading}>PHONE NUMBER 2</label>
                      <input type="number" name='phone2' id="phone2" placeholder={`${info?.phoneNumber2 ?  info?.phoneNumber2 : phoneNumber2?.length < 1 && 'Phone Number 2' }`} value={phoneNumber2} onChange={(e) => setPhoneNumnber2(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                    </div>

                  </div>

                  <div className=' w-full mt-5'>
                    <label htmlFor="email" className={styles.labelHeading}>EMAIL ADRRESS</label>
                    <input type="email" name='email' id="email" value={user.email} placeholder='Email' required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full bg-dimWhite' />
                  </div>
              </div>
            </div>

            {/* SHOPPING ADDRESS */}
            <div className=' w-full py-10 px-6 border-darkGray border md:border-2 rounded-[6px] mt-8'>
              <h2 className={styles.checkoutHeading}>Shipping Address</h2>

              <div className=' w-full'>
                <label htmlFor="address" className={styles.labelHeading}>STREET ADRRESS *</label>
                <input type="text" name='address' id="address" placeholder={`${info?.address ?  info?.address : address?.length < 1 && 'Street Address' }`} value={address} onChange={(e) => setAddress(e.target.value)}  required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbAddress}</p>
              </div>

              <div className=' w-full mt-5'>
                <label htmlFor="country" className={styles.labelHeading}>COUNTRY *</label>
                <input type="text" name='country' id="country" placeholder='Country' value="Nigeria" onChange={(e) => setCountry(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full bg-dimWhite' />
              </div>

              <div className=' w-full mt-5'>
                <label htmlFor="town" className={styles.labelHeading}>TOWN/CITY *</label>
                <input type="text" name='town' id="town" placeholder={`${info?.city ?  info?.city : city?.length < 1 && 'Town / City' }`} value={city} onChange={(e) => setCity(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbCity}</p>
              </div>

              <div className=' flex justify-between gap-8 mt-5'>
                <div className=' w-full'>
                  <label htmlFor="state" className={styles.labelHeading}>STATE *</label>
                  <input type="text" name='state' id="state" placeholder={`${info?.state ?  info?.state : state?.length < 1 && 'State' }`} value={state} onChange={(e) => setState(e.target.value)} required className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                  <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbCity}</p>
                </div>

                <div className=' w-full'>
                  <label htmlFor="zipcode" className={styles.labelHeading}>ZIP CODE</label>
                  <input type="number" name='zipcode' id="zipcode" placeholder={`${info?.zipCode ?  info?.zipCode : zipCode?.length < 1 && 'Zip Code' }`} value={zipCode} onChange={(e) => setZipCode(e.target.value)}  className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                  <p className=' font-poppins mt-2 text-primary text-[10px] sm:text-[12px]'>{dbZipCode}</p>
                </div>
              </div>
            </div>

            <div className=' flex items-end gap-4'>
              <button onClick={handleSubmit} className={`text-primaryWhite text-[10px] sm:text-[12px] md:text-[14px] ${detailsInputed ? 'bg-primary' : 'bg-primaryBlack'} px-2 sm:px-4 py-2 mt-4 cursor-pointer font-poppins`}>{loading ? <ButtonSpinner color="primaryWhite" /> : detailsInputed ? 'Update Details' : 'Save Details' }</button>
              {detailsInputed &&
              <p className=' font-poppins text-neutral md:text-[12px] text-[10px]'>* (Update if there are changes)</p>}
            </div>
        </form>



        {/* PAYMENT METHOD */}
        {showPayment || detailsInputed ?
            <div>
              <div className=' w-full py-10 px-6 border-darkGray border md:border-2 rounded-[6px] mt-8'>
                <h2 className={styles.checkoutHeading}>Payment Method</h2>
                <div className=' border-primaryGray border-2 rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full flex items-center justify-between bg-dimWhite'>
                  <div className=' flex items-center'>
                    <input type="radio" name='radio' id='radio' checked  />
                    <label htmlFor="radio" className=' ml-4 font-poppins font-medium '>Pay With Paystack</label>
  
                  </div>
                  <img src={paystack} alt="" className=' w-[100px]' />
                </div>
  
              </div>
  
              <button type='submit' onClick={payWithPaystack} className=' mt-5 w-full text-primaryWhite bg-primary py-3 font-poppins font-medium rounded-[6px] text-[10px] sm:text-[12px] md:text-[14px] cursor-pointer text-center flex justify-center'>{loading ? <ButtonSpinner color="primaryWhite" /> : <span>Place Order</span>}</button>

            </div>

            : <div className=' text-primary font-poppins font-medium text-[12px] md:text-[14px] mt-[1rem]'>
                Kindly Save your details before proceeding.
              </div>
        }
      </div>

      {/* PAYMENT SUCCESS POPUP  */}

      {complete ? <div className=' fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-30 translate-x-0 transition duration-[1000ms]' /> : <div className=' fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-30 translate-x-[150%] transition duration-[1000ms]' /> }

      {complete 
          ? <div className=' fixed top-[20%] md:left-[25%] sm:left-[17.5%] left-[7.5%] w-[85%] sm:w-[65%] md:w-[50%] h-[60%] bg-slate-100 z-40 rounded-[10px] text-center flex flex-col justify-center translate-x-0 transition duration-[1000ms]'>
            <div onClick={proceed}>
              <iframe className=' w-full text-center bg-transparent' src="https://lottie.host/embed/cf79eeba-f75d-4aee-b305-554de0c99eae/U4Qk3hWW5w.json"></iframe>
                <h2 className=' text-[14px] sm:text-[16px] md:text-[18px] font-poppins font-medium mb-6'>{paymentStatus}</h2>
                <Button text="View Cart Summary" />
            </div>
          </div>

          : <div className=' fixed top-[20%] left-[25%] w-[50%] h-[60%] bg-slate-100 z-40 rounded-[10px] text-center flex flex-col justify-center translate-x-[150%] transition duration-[1000ms]'>
            <div onClick={proceed}>
              <iframe className=' w-full text-center bg-transparent' src="https://lottie.host/embed/cf79eeba-f75d-4aee-b305-554de0c99eae/U4Qk3hWW5w.json"></iframe>
              <h2 className=' text-[14px] sm:text-[16px] md:text-[18px] font-poppins font-medium mb-6'>{paymentStatus}</h2>
              <Button text="View Cart Summary" />
            </div>
          </div>
      
      }

      {/* PAYMENT CANCEL POPUP  */}

      {notCompleted ? <div className=' fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-30 translate-x-0 transition duration-[1000ms]' /> : <div className=' fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-30 translate-x-[150%] transition duration-[1000ms]' /> }

      {notCompleted 
          ? <div className=' fixed top-[20%] md:left-[25%] sm:left-[17.5%] left-[7.5%] w-[85%] sm:w-[65%] md:w-[50%] h-[60%] bg-slate-100 z-40 rounded-[10px] text-center flex flex-col justify-center translate-x-0 transition duration-[1000ms]'>
            <div onClick={() => setNotCompleted(false)}>
                <div className=' text-center text-primary'><ErrorOutlineIcon style={{fontSize: 100}} /></div>
                <h2 className=' text-[14px] sm:text-[16px] md:text-[18px] font-poppins font-medium my-6'>Payment not completed. Please try again.</h2>
                <Button text="Try again" />
            </div>
          </div>

          : <div className=' fixed top-[20%] left-[25%] w-[85%] sm:w-[65%] md:w-[50%] h-[60%] bg-slate-100 z-40 rounded-[10px] text-center flex flex-col justify-center translate-x-[150%] transition duration-[1000ms]'>
            <div onClick={() => setNotCompleted(false)}>
              <div className=' text-center text-primary'><ErrorOutlineIcon style={{fontSize: 100}} /></div>
              <h2 className=' text-[14px] sm:text-[16px] md:text-[18px] font-poppins font-medium my-6'>Payment not completed. Please try again.</h2>
              <Button text="Try again" />
            </div>
          </div>
      
      }



    {/* Side bar */}
      <div className=' w-[100%] sm:w-[40%]'>
        <div className=' w-full border-darkGray border md:border-2 rounded-[6px] py-10 px-6'>
          <h2 className=' font-poppins font-medium mb-5 text-primaryBlack text-[14px] sm:text-[16px] md:text-[18px]'>Order Summary</h2>
          <div className=' w-full'>
         
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className=' flex items-start justify-between w-full mb-4 border-b-2 border-dimWhite pb-3'>
                <div className=' flex gap-3'>
                  <div className=' w-[60px] md:w-[80px] h-[70px] md:h-[90px] bg-dimWhite flex justify-center items-center'>
                    <img src={cartItem.image || cartItem.imageProfile || cartItem.img} alt="" className='md:w-[30px] w-[20px]' />
                  </div>
                  <div>
                    <h3 className=' font-poppins text-[10px] md:text-[12px]  max-w-[220px] mb-2'>{cartItem.name}</h3>
                    <div className='block font-poppins text-[12px] md:text-[14px] font-medium'>&#8358; {(cartItem.price).toLocaleString()}</div>
                    {cartItem.hasColor && <p className='md:text-[12px] text-[10px] font-poppins text-darkGray'>{`Color: ${cartItem.color}`}</p>}
                    {cartItem.hasSize && <p className='md:text-[12px] text-[10px]  font-poppins text-darkGray'>{`Size: ${cartItem.size.slice(-1)}`}</p>}
                    {cartItem.isShoe && <p className='md:text-[12px] text-[10px]  font-poppins text-darkGray'>{`Size: ${cartItem.size}`}</p>}
                    <p className='md:text-[12px] text-[10px]  font-poppins text-darkGray'>{`Quantity: ${cartItem.cartQuantity}`}</p>
                  </div>

                </div>
              </div>
            ))}

            <div className=' w-full mt-[3rem]'>
                <h2 className=' font-poppins md:text-[18px] text-[14px] sm:text-[16px] font-semibold mb-[1rem]'>Summary</h2>
                <div className=' w-full flex items-center justify-between'>
                  <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px]'>Shipping</p>
                  <h2 className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] font-semibold'>{cart.cartShipping}</h2>
                </div>
                <div className=' w-full flex items-center justify-between mt-3'>
                  <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px]'>SubTotal</p>
                  <h2 className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] font-semibold'>&#8358; {(cart.cartTotalAmount).toLocaleString()}</h2>
                </div>
                <div className=' w-full flex items-center justify-between mt-3'>
                  <p className=' font-poppins md:text-[16px] text-[14px]'>Total</p>
                  <h2 className=' font-poppins md:text-[16px] text-[14px] font-semibold'>&#8358; {(cart.cartGrossTotal).toLocaleString()}</h2>
                </div>
            </div>

          </div>

        </div>

        <button onClick={back} className=' bg-primary text-primaryWhite font-poppins text-center mt-4 px-3 py-1 text-[10px] sm:text-[12px] flex items-center gap-1'>
          <span><KeyboardDoubleArrowLeftIcon style={{fontSize: 20}} /></span>
          <span>Back to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default CheckoutDetails