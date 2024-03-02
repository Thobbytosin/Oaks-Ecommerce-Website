/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { db } from '../../../firebase/firebase.config'
import { collection, getDocs, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import styles from '../../../styles';
import { useNavigate } from 'react-router-dom';
import GoToTop from '../../../components/GoToTop/GoToTop';

const OrderComplete = () => {
  const {user} = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()


  const getInfo = async () => {
    const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()
        // setUserParam(data)
        setUserInfo(...data?.orders?.slice(-1));
      // }
  }

  useEffect( () => {
    getInfo()
  }, [user])

  console.log(userInfo)

  return (
    <div className=' w-full my-[4rem]'>
      <GoToTop />
      <div className='w-[95%] md:w-[60%] mx-auto bg-primaryWhite rounded-[8px] text-center md:py-12 py-8 card-shadow'>
        <h2 className=' font-poppins font-medium text-[18px] sm:text-[20px] md:text-[24px] text-neutral'>Thank you! 🎉</h2>
        
        <h1 className=' font-poppins text-[18px] sm:text-[24px] md:text-[30px] text-primaryBlack font-medium mx-auto max-w-[300px] sm:max-w-[492px] my-[1.8rem] text-center md:leading-[3.1rem]'>Your order has been received!</h1>

        <div className={`${styles.flexCenter} gap-[0.8rem] sm:gap-[1.2rem] md:gap-[2rem] flex-wrap my-[3rem]`}>
          {userInfo?.cartItem?.map((customer, index) => (
            <div key={index + 1} className=' sm:w-[60px] sm:h-[80px] w-[40px] h-[60px] bg-slate-200 bg-opacity-70 flex justify-center items-center relative'>
              <img src={customer.image || customer.imageProfile || customer.img} alt="" className='w-[25px] sm:w-[40px]' />
              <div className=' rounded-full sm:w-[28px] sm:h-[28px] w-[20px] h-[20px] text-primaryWhite bg-primary flex justify-center items-center absolute -right-[10px] -top-[14px] text-[12px] sm:text-[14px]'>
                  {customer.cartQuantity}
              </div>
            </div>
          ))}
        </div>

        <div className=' w-full flex flex-col items-center'>
          <div className=' flex gap-6 sm:w-[50%] w-[90%] mx-auto'>
            <p className={styles.orderComplete}>Order Code:</p>
            <p className={styles.orderCompleteBlack}>#{userInfo?.transactionId}</p>
          </div>
          <div className=' flex gap-6 mt-3 sm:w-[50%] w-[90%] mx-auto'>
            <p className={styles.orderComplete}>Order Id:</p>
            <p className={styles.orderCompleteBlack}>{`${userInfo?.orderId}`}</p>
          </div>
          <div className=' flex gap-6 mt-3 sm:w-[50%] w-[90%] mx-auto'>
            <p className={styles.orderComplete}>Total:</p>
            <p className={styles.orderCompleteBlack}>&#8358; {(userInfo?.totalCart)?.toLocaleString()}</p>
          </div>
          <div className=' flex gap-6 mt-3 sm:w-[50%] w-[90%] mx-auto'>
            <p className={styles.orderComplete}>Payment Method:</p>
            <p className={styles.orderCompleteBlack}>Credit Card</p>
          </div>

          <button onClick={() => navigate('/dashboard')} className=' bg-primaryBlack font-poppins font-medium text-primaryWhite rounded-[40px] py-2 px-6 text-[10px] sm:text-[12px] mt-[2rem]'>
            Order History
          </button>

        </div>


      </div>
    </div>
  )
}

export default OrderComplete