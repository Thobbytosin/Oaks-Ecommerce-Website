import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles'
import { Button, PageTag } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cartInfo } from '../../constants/cart'
import { ShoppingCart, CheckoutDetails, OrderComplete } from './index'
import { AuthContext } from '../../context/AuthProvider'
import GoToTop from '../../components/GoToTop/GoToTop'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems )
  const navigation = useNavigate()

  const {user} = useContext(AuthContext)
   

  const [shoppingCart, setShoppingCart] = useState(true)
  const [checkoutDetails, setCheckoutDetails] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [success, setSuccess] = useState(false)


  const showShoppingCart = (id) => {
    setShoppingCart(true)
    setCheckoutDetails(false)
    setOrderCompleted(false)
    setActivePage(id)
    setSuccess(false)
  }

    const showCheckoutDetails = (id) => {
      setCheckoutDetails(true)
      setShoppingCart(false)
      setOrderCompleted(false)
      setActivePage(id)

      setSuccess(true)

    }


  const showOrderCompleted = (id) => {
    setOrderCompleted(true)
    setCheckoutDetails(false)
    setShoppingCart(false)
    setActivePage(id)

    // setSuccess(true)
  }
  

  


  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      <PageTag prevPage="Home" curPage="Cart" />
      <h2 className=' font-inter text-center md:text-[54px] sm:text-[44px] text-[32px] font-semibold my-4 md:my-8'>{shoppingCart ? 'Cart' : checkoutDetails ? 'Checkout' : 'Order Completed!' }</h2>
      <div className={`${styles.flexCenter} gap-3 sm:gap-[4rem] md:my-[5rem]`}>
        {cartInfo.map((item) => (
          <div 
            key={item.id} 
            className={` flex items-center ${
              success 
                ? activePage === item.id + 1 || activePage - 2 === item.id || activePage === 3 ? 'border-b-2 sm:border-b-4 border-lightGreen' : `${activePage === item.id && 'border-b-2 sm:border-b-4 border-primary'}`  
                : activePage === item.id ? 'border-b-4 border-primary' : ''  } 
                sm:gap-4 gap-1 pb-3 sm:pb-6 w-[100%] sm:w-[20%] cursor-pointer `
            }
          >
              <div 
                className={`sm:w-[34px] sm:h-[34px] w-[24px] h-[24px] text-[10px] sm:text-[16px] rounded-full  ${styles.flexCenter} ${ 
                  success 
                    ? activePage === item.id + 1 || activePage - 2 === item.id || activePage === 3 ? 'bg-lightGreen text-primaryWhite' : `${activePage === item.id ? 'bg-primary text-primaryWhite' : `${activePage + 1 === item.id && 'bg-primaryBlack text-primaryWhite bg-opacity-30'}`}` 
                    : activePage === item.id ? 'bg-primary text-primaryWhite' : 'bg-primaryBlack text-primaryWhite bg-opacity-30 '} `}>
                      {item.id}
              </div>

              <p 
                className={`font-poppins text-[10px] sm:text-[12px] md:text-[16px]  ${
                  success 
                    ? activePage === item.id + 1 || activePage - 2 === item.id || activePage === 3 ? ' text-lightGreen font-semibold' : `${activePage === item.id && ' text-primaryBlack font-semibold'}` 
                    : activePage === item.id ? 'text-primaryBlack font-semibold' : 'text-primaryBlack opacity-40 '} }`}>

                      {item.text}
              </p>

          </div>
        ))}
      </div>

      {cartItems.length > 0 
        ? (
            <div className=' mt-10 md:mt-0'>
              {shoppingCart && <ShoppingCart next={() => showCheckoutDetails(2)} /> }
              {checkoutDetails && <CheckoutDetails  back={() => showShoppingCart(1)} proceed={() => showOrderCompleted(3)}  /> }
              {orderCompleted && <OrderComplete  />}
            </div>
        ) 
        : (
            <div className=' mt-12 flex flex-col justify-center items-center gap-4 md:gap-8'>
              <p className=' font-poppins  text-primaryBlack md:text-[16px] text-[12px] sm:text-[14px] text-center'>Your cart is currently empty</p>
              <div onClick={() => navigation('/shop')}>
                <Button text="Continue Shopping" />
              </div>

            </div>

        )
         }
    </div>
  )
}

export default Cart