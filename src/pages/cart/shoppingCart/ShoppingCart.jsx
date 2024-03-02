/* eslint-disable react/jsx-key */
/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { cartTotal, clearCart, decreaseCart, getTotals,  increaseCart, removeCart, shipping } from '../../../features/cart/cartSlice';
// import { console } from '../../../constants/images';

const ShoppingCart = ({next}) => {
  const [coupon, setCoupon] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [userTotal, setUserTotal] = useState([])

  const [active, setActive] = useState('free-shipping')


  
 
  // const [showError, setShowError] = useState(true)

  const handleCoupon = (e) => {
    const input = e.target.value

    setCoupon(input)
  }
  
    


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validateCoupon(coupon))

    setCoupon('')
  }



  const validateCoupon = (values) => {
      const errors = {}

      if(!values) {
        errors.couponCode = 'Coupon is required'
      } else if (values.length < 5) {
        errors.couponCode = 'Invalid Coupon. Coupon is at least 5 characters'
      } else if (values.length >= 5) {
        errors.couponCode = 'Coupon has expired'
      }

      return errors

  }

  const cartItems = useSelector((state) => state.cart.cartItems)

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
    // dispatch(getVAT())
  }, [cart])
  
  const handleRemoveFromCart = (product) => {
    dispatch(removeCart(product))
  }

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product))
  }

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product))
  }

  const handleClearCart = () => [
    dispatch(clearCart())
  ]

  useEffect(() => {
    dispatch(shipping('Free'))

  }, [])


  const handleFreeShipping = () => {
    dispatch(shipping('Free'))
    setActive('free-shipping')
  }

  const handleExpressShipping = () => {
    dispatch(shipping('Express'))
    setActive('express-shipping')
  }

  const handleUserTotal = () => {
    const total = ((0.05 * cart.cartTotalAmount) + (cart.cartTotalAmount) + (active === 'express-shipping' ? cart.cartExpressAmount : 0));

    userTotal.push(total);
     
     const userTotalAmount = userTotal.slice(-1)


    localStorage.setItem("userTotal", JSON.stringify(userTotalAmount))

    const totals = localStorage.getItem("userTotal")

    return userTotalAmount

    // console.log(`The user total cart amount is ${JSON.parse(totals)}`)
  }

  useEffect(() => {
    handleUserTotal()
    

  }, [handleUserTotal])

  dispatch(cartTotal(handleUserTotal()[0]))


  // dispatch(cartTotal(handleUserTotal()))

  return (
    <div>
      <div className='hidden w-full sm:flex text-center font-poppins font-medium text-primaryBlack border-b-2 border-primaryBlack'>
        <div className=' w-[45%] p-3'>Products</div>
        <div className=' w-[15%] p-3'>Price</div>
        <div className=' w-[15%] p-3'>Quantity</div>
        <div className=' w-[15%] p-3'>Subtotal</div>
        <div className=' w-[10%] p-3'></div>
        
      </div>
      <div>
        {cartItems.map((cartItem) => (
          
          // TABLET AND LAPTOP
          <div>
            <div key={cartItem.id} className={`hidden sm:flex items-center justify-start min-h-[100px] px-[1.5rem] mt-6 bg-dimWhite `}>
                <div className=' w-[45%] flex sm:flex-row flex-col items-center justify-start gap-8 md:gap-[3rem] '>
                  <img src={cartItem.image || cartItem.img || cartItem.img1 || cartItem.imageProfile} alt="" className='w-[7%]  ' />
                  <div>
                    <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] text-primaryBlack'>{cartItem.name} </p>
                    {cartItem.hasColor && <p className='md:text-[14px] sm:text-[12px] text-[10px] font-poppins text-darkGray'>{`Color: ${cartItem.color}`}</p>}
                    {cartItem.hasSize && <p className='md:text-[14px] sm:text-[12px] text-[10px] font-poppins text-darkGray'>{`Size: ${cartItem.size}`}</p>}
                    {cartItem.isShoe && <p className='md:text-[14px] sm:text-[12px] text-[10px]font-poppins text-darkGray'>{`Size: ${cartItem.size}`}</p>}

                  </div>
                  
                </div>

                  <div className=' w-[15%] flex justify-center'>
                    <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] font-semibold text-primaryBlack'>&#8358; {(cartItem.price).toLocaleString()}</p>
                    
                </div>

                <div className=' w-[15%] flex justify-center '>
                    <div className=' flex items-end justify-center gap-6 md:gap-10 border-2 border-primaryGray rounded-[5px]  w-[50%] py-1 ml-[2rem] '>
                      <span onClick={() => handleDecreaseCart(cartItem)} className=' text-[20px] cursor-pointer opacity-75 '>-</span>
                        <p className=' bg-white text-[14px] font-poppins font-semibold sm:mx-2'>{cartItem.cartQuantity}</p>
                      <span onClick={() => handleIncreaseCart(cartItem)} className=' text-[20px] cursor-pointer opacity-75  '>+</span>
                    </div>
                </div>

                <div className=' w-[15%] flex justify-center  pl-[2rem]'>
                  <p className=' font-poppins md:text-[14px] sm:text-[12px] text-[10px] font-semibold text-primaryBlack'>&#8358; {(cartItem.price * cartItem.cartQuantity).toLocaleString()}</p>
                </div>

                <div className='md:hidden w-[10%] flex justify-center text-primary  '> 
                    <DeleteIcon style={{fontSize: 20}} onClick={() => handleRemoveFromCart(cartItem)} className=' cursor-pointer ' />
                </div>
                <div className='hidden w-[10%] md:flex justify-center text-primary  '> 
                    <DeleteIcon style={{fontSize: 24}} onClick={() => handleRemoveFromCart(cartItem)} className=' cursor-pointer ' />
                </div>
            </div>

          </div>
        ))}

        {/* PHONE */}
        <div className='block sm:hidden font-poppins '>
          <div className=' bg-dimWhite text-neutral text-[14px] font-senibold py-3 pl-3'>{`CART (${cartItems?.length})`}</div>
          {cartItems.map((item) => (
              <div key={item.id} className=' bg-dimWhite my-8 p-2'>
                <div className=' flex items-center ss:gap-9 gap-2'>
                  <div className=' w-[30%] overflow-hidden flex justify-center items-center'>
                    <img src={item.img || item.image || item.imageProfile} alt="" className=' w-[50%] object-center' />
                  </div>
                  <div className=' w-[70%] '>
                    <h2 className=' text-[10px] mb-2 '>{item.name}</h2>
                    <p className=' text-[10px] mb-2'>Seller: <span className=' font-medium'>{item.seller}</span></p>
                    {item.hasColor && <p className='mb-4 text-[10px] font-poppins '>{`Color: ${item.color}`}</p>}
                    {item.hasSize && <p className='mb-4 text-[10px] font-poppins '>{`Size: ${item.size}`}</p>}
                    {item.isShoe && <p className='mb-4 text-[10px] font-poppins '>{`Size: ${item.size}`}</p>}
                    <h2 className=' font-medium text-[16px]'>&#8358; {(item.price).toLocaleString()}</h2>
                    <div className=' flex gap-2 items-center my-3'>
                      <h2 className=' line-through text-neutral text-[10px]'>&#8358; {(item.oldPrice).toLocaleString()}</h2>
                      <p className=' p-1  text-primary text-[12px] bg-primary bg-opacity-25 text-center'>-{item.discount}%</p>
                    </div>
                    {item.stock >= 1 ? <p className=' text-lightGreen text-[12px]'>In stock</p> : <p className=' text-primary text-[10px]'>Out of Stock</p>}
                  </div>
                </div>

                <div className=' mt-6 flex justify-between items-center'>
                  <p onClick={() => handleRemoveFromCart(item)} className=' text-primary font-medium text-[14px]'>Remove</p>
                  <div className=' flex items-center justify-center gap-6 border-2 border-primaryGray rounded-[5px]  w-[40%] py-1 ml-[2rem] '>
                      <span onClick={() => handleDecreaseCart(item)} className=' text-[20px] cursor-pointer opacity-75 '>-</span>
                        <p className=' bg-white text-[14px] font-poppins font-semibold'>{item.cartQuantity}</p>
                      <span onClick={() => handleIncreaseCart(item)} className=' text-[20px] cursor-pointer opacity-75  '>+</span>
                  </div>
                </div>

              </div>
          ))}

        </div>

      </div>
      <div className='sm:block hidden text-end mt-[2rem]'>
          <button onClick={() => handleClearCart()} className=' border-2 border-primaryBlack py-2 md:py-3 px-6 md:px-8 rounded-[8px] text-primaryBlack font-medium font-poppins hover:bg-primary hover:border-none hover:text-primaryWhite text-[12px] md:text-[14px]'>
            Clear Cart
          </button>
      </div>
      
      <div className=' flex justify-between items-start mt-[5rem] md:mb-0 mb-[3rem]'>
        <div className=' hidden sm:inline-block'>
          <form onSubmit={handleSubmit}>
            <input 
              type="text"
              name="coupon" 
              placeholder='Coupon Code'
              value={coupon}
              onChange={handleCoupon}
              className=' border-2 border-darkGray px-6 py-[14px] md:text-[16px] text-[14px] font-poppins text-primaryBlack mb-3 md:mb-0 md:mr-4'
            />
            <Button text="Appy Coupon" />
          </form>
            <p className=' font-poppins font-medium text-primary md:text-[18px] text-[16px] mt-1'>{formErrors.couponCode}</p>
        </div>

        <div className=' border-2 border-darkGray p-6 rounded-[8px] max-w-[400px] sm:min-w-[470px]'>
          <h2 className=' font-poppins md:text-[20px] text-[18px] font-medium text-primaryBlack mb-4'>Cart Summary</h2>
          <div>
            <form>

              <div onClick={handleFreeShipping} className={`${active === 'free-shipping' ? 'bg-dimWhite' : ''} flex w-full border-darkGray border p-4 rounded-[12px]`}>
                
                  <input type="radio" name='cart' id="free-shipping" value="free-shipping" checked />
                  <label className=' ml-2 sm:flex justify-between w-full' htmlFor="free-shipping">
                    <p className=' min-w-[6rem] font-poppins font-medium md:text-[16px] sm:text-[14px] text-[12px]'>Free Shipping <span className=' font-normal text-[11px]'>(0 - 10 working days)</span></p>
                    <p className=' font-poppins font-semibold md:text-[16px] sm:text-[14px] text-[12px] mt-1 sm:mt-0'>&#8358; 0.00</p>
                  </label>

              </div>

              <div onClick={handleExpressShipping} className={`${active === 'express-shipping' ? 'bg-dimWhite' : ''} flex  w-full border-darkGray border p-4 rounded-[12px] mt-3`}>
                
                  <input type="radio" name='cart' id="express-shipping" value="express-shipping" className='' />
                  <label  className='ml-2 sm:flex justify-between w-full ' htmlFor="express-shipping">
                    <p className=' min-w-[6rem] font-poppins font-medium md:text-[16px] sm:text-[14px] text-[12px]'>Express <span className=' font-normal text-[11px]'>(0 - 3 working days)</span></p>
                    <p className=' font-poppins font-semibold md:text-[16px] sm:text-[14px] text-[12px] mt-1 sm:mt-0'>+&#8358; {(cart.cartExpressAmount).toLocaleString()}</p>
                  </label>

               

              </div>

            </form>

            <div className=' w-full flex justify-between mt-6'>
              <p className=' font-poppins md:text-[16px] text-[14px]'>Subtotal</p>
              <h2 className=' font-poppins md:text-[16px] text-[14px] font-semibold'>= &#8358; {(cart.cartTotalAmount).toLocaleString()}</h2>
              {/* if active = free shipping, dispaly free shipping else do otherwise for express */}
            </div>

            {active === 'express-shipping' 
              ? (<div className=' w-full flex justify-between mt-2'>
                <p className=' font-poppins md:text-[16px] sm:text-[14px] text-[12px]'>Express </p>
                <h2 className=' font-poppins md:text-[16px] text-[14px] font-semibold'>= &#8358; {(cart.cartExpressAmount).toLocaleString()}</h2>
                {/* if active = free shipping, dispaly free shipping else do otherwise for express */}
                </div>)
              : ''
            }

            <div className=' w-full flex justify-between mt-2'>
              <p className=' font-poppins md:text-[16px] text-[14px]'>VAT (+5%)</p>
              <h2 className=' font-poppins md:text-[16px] text-[14px] font-semibold'>= &#8358; {(0.05 * cart.cartTotalAmount).toLocaleString()}</h2>
              {/* if active = free shipping, dispaly free shipping else do otherwise for express */}
            </div>

            {/* TOTAL */}
            <div className=' w-full flex justify-between mt-4'>
              <p className=' font-poppins md:text-[18px] text-[16px] font-bold'>Total</p>
              <h2 className=' font-poppins md:text-[18px] text-[16px] font-bold'>= &#8358; {((0.05 * cart.cartTotalAmount) + (cart.cartTotalAmount) + (active === 'express-shipping' ? cart.cartExpressAmount : 0)).toLocaleString()}</h2>
              
            </div>

            <div className='mt-[2rem] text-center' onClick={next}>
              <Button text="Proceed to Checkout" />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ShoppingCart