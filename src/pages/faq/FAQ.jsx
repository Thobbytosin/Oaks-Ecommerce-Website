import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import GoToTop from '../../components/GoToTop/GoToTop'
import { PageTag, Spinner } from '../../components'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Faq = () => {
  const [info, setInfo] = useState([]);
  let [accounts, setAccounts] = useState([]);
  let [delivery, setDelivery] = useState([]);
  let [payments, setPayments] = useState([]);
  let [products, setProducts] = useState([]);
  let [refundReturn, setRefundReturn] = useState([]);
  const [active, setActive] = useState("Accounts")
  const [activeId, setActiveId] = useState(null)
  const [showDescription, setShowDescription] = useState(false)
          
  const getInfo = async () => {
    const q = collection(db, "faqs")
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
      setAccounts(info[0]);
      setDelivery(info[1]);
      setPayments(info[2]);
      setProducts(info[3]);
      setRefundReturn(info[4]);
    }

    
    useEffect(() => {
      getInfo()
    }, [])

    const detail = info.map((el) => el?.products)
    const allFaqs = detail.flat()



  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      <PageTag prevPage="Home" next='Pages' curPage='FAQs' />
      <h1 className=' font-poppins font-semibold text-[18px] md:text-[28px] sm:text-[24px]'>Frequently Asked Questions </h1>
      {info?.length >=1 
        ?
          <div className=' flex sm:flex-row flex-col items-start gap-4 sm:gap-6 my-[3rem]'>
            <div className=' w-[100%] sm:max-w-[30%] rounded-[6px] bg-[#F2F4F5] flex sm:block'>
              {info?.map((item, index) => (
                <div onClick={() => setActive(item?.category)} key={index + 1} className={`flex  items-center  justify-between w-full px-2 sm:px-4 md:py-8 sm:py-6 py-3 cursor-pointer ${active === item?.category ? 'sm:border-l-[5px] sm:border-b sm:border-b-primaryGray border-b-[3px] border-b-primary sm:border-l-primary' : 'border-l-0 border-b bg-white border-b-primaryGray'}`}>
                  <div className='flex items-center gap-4'>
                    {item.category === 'Accounts' && <PeopleAltIcon style={{fontSize: 16}} /> }
                    {item.category === 'Delivery' && <LocalShippingIcon style={{fontSize: 16}} /> }
                    {item.category === 'Payments' && <PaymentIcon style={{fontSize: 16}} /> }
                    {item.category === 'Products' && <InventoryIcon style={{fontSize: 16}} /> }
                    {item.category === 'Return Policy' && <CachedIcon style={{fontSize: 16}} /> }
                    <p className='hidden sm:inline-block font-poppins font-medium text-[12px] sm:text-[14px] md:text-[16px]'>{item?.category}</p>

                  </div>
                  <div className=' hidden sm:inline-block'>
                    <KeyboardArrowRightIcon style={{color: '#DB4444', fontSize: 16}} />
                  </div>
                  <div className=' sm:hidden inline-block'>
                    <KeyboardArrowDownIcon style={{color: '#DB4444', fontSize: 16}} />
                  </div>
                </div>
              ))}
            </div>

            <div className=' w-full bg-[#F2F4F5] rounded-[6px]'>
              {active === 'Accounts' && 
                <div>
                  {accounts?.products?.map((account, i) => (
                    <div 
                      onClick={() => {
                      // console.log(account.id)
                      setShowDescription((prev) => !prev)
                      setActiveId(account.id)
                      // console.log(activeId)
                      } } 
                      key={i + 1} className=' p-4 font-poppins border border-primaryGray cursor-pointer'
                    >
                      <div className={`flex justify-between items-center`}>
                        <div>
                          <p className=' underline text-[10px] sm:text-[12px] md:text-[14px]'>{accounts?.category}</p>
                          <h2 className=' font-medium text-[12px] sm:text-[14px] md:text-[16px] mt-4'>{account?.title}?</h2>
                        </div>
                        {showDescription && activeId === account?.id ? <RemoveIcon style={{fontSize: 20}} /> : <AddIcon style={{fontSize: 20}} />}
                      </div>

                      {showDescription && activeId === account?.id && (
                        <p className=' mt-3 text-[8px] sm:text-[10px] md:text-[12px] max-w-[1000px] md:leading-10 leading-5 text-neutral '>{account?.desc}</p>
                      )}

                    </div>
                  ))}
                </div>
              }

              {/* Delivery */}

              {active === 'Delivery' && 
                <div>
                  {delivery?.products?.map((account, i) => (
                    <div 
                      onClick={() => {
                      // console.log(account.id)
                      setShowDescription((prev) => !prev)
                      setActiveId(account.id)
                      // console.log(activeId)
                      } } 
                      key={i + 1} className=' p-4 font-poppins border border-primaryGray cursor-pointer'
                    >
                      <div className={`flex justify-between items-center`}>
                        <div>
                          <p className=' underline text-[10px] sm:text-[12px] md:text-[14px]'>{delivery?.category}</p>
                          <h2 className=' font-medium text-[12px] sm:text-[14px] md:text-[16px] mt-4'>{account?.title}?</h2>
                        </div>
                        {showDescription && activeId === account?.id ? <RemoveIcon style={{fontSize: 20}} /> : <AddIcon style={{fontSize: 20}} />}
                      </div>

                      {showDescription && activeId === account?.id && (
                        <p className=' mt-3 text-[8px] sm:text-[10px] md:text-[12px] max-w-[1000px] md:leading-10 leading-5 text-neutral '>{account?.desc}</p>
                      )}

                    </div>
                  ))}
                </div>
              }


              {/* Payments */}

              {active === 'Payments' && 
                <div>
                  {payments?.products?.map((account, i) => (
                    <div 
                      onClick={() => {
                      // console.log(account.id)
                      setShowDescription((prev) => !prev)
                      setActiveId(account.id)
                      // console.log(activeId)
                      } } 
                      key={i + 1} className=' p-4 font-poppins border border-primaryGray cursor-pointer'
                    >
                      <div className={`flex justify-between items-center`}>
                        <div>
                          <p className=' underline text-[10px] sm:text-[12px] md:text-[14px]'>{payments?.category}</p>
                          <h2 className=' font-medium text-[12px] sm:text-[14px] md:text-[16px] mt-4'>{account?.title}?</h2>
                        </div>
                        {showDescription && activeId === account?.id ? <RemoveIcon style={{fontSize: 20}} /> : <AddIcon style={{fontSize: 20}} />}
                      </div>

                      {showDescription && activeId === account?.id && (
                        <p className=' mt-3 text-[8px] sm:text-[10px] md:text-[12px] max-w-[1000px] md:leading-10 leading-5 text-neutral '>{account?.desc}</p>
                      )}

                    </div>
                  ))}
                </div>
              }

              {/* Products */}

              {active === 'Products' && 
                <div>
                  {products?.products?.map((account, i) => (
                    <div 
                      onClick={() => {
                      // console.log(account.id)
                      setShowDescription((prev) => !prev)
                      setActiveId(account.id)
                      // console.log(activeId)
                      } } 
                      key={i + 1} className=' p-4 font-poppins border border-primaryGray cursor-pointer'
                    >
                      <div className={`flex justify-between items-center`}>
                        <div>
                          <p className=' underline text-[10px] sm:text-[12px] md:text-[14px]'>{products?.category}</p>
                          <h2 className=' font-medium text-[12px] sm:text-[14px] md:text-[16px] mt-4'>{account?.title}?</h2>
                        </div>
                        {showDescription && activeId === account?.id ? <RemoveIcon style={{fontSize: 20}} /> : <AddIcon style={{fontSize: 20}} />}
                      </div>

                      {showDescription && activeId === account?.id && (
                        <p className=' mt-3 text-[8px] sm:text-[10px] md:text-[12px] max-w-[1000px] md:leading-10 leading-5 text-neutral '>{account?.desc}</p>
                      )}

                    </div>
                  ))}
                </div>
              }

              {/* Return Policy */}

              {active === 'Return Policy' && 
                <div>
                  {refundReturn?.products?.map((account, i) => (
                    <div 
                      onClick={() => {
                      // console.log(account.id)
                      setShowDescription((prev) => !prev)
                      setActiveId(account.id)
                      // console.log(activeId)
                      } } 
                      key={i + 1} className=' p-4 font-poppins border border-primaryGray cursor-pointer'
                    >
                      <div className={`flex justify-between items-center`}>
                        <div>
                          <p className=' underline text-[10px] sm:text-[12px] md:text-[14px]'>{refundReturn?.category}</p>
                          <h2 className=' font-medium text-[12px] sm:text-[14px] md:text-[16px] mt-4'>{account?.title}?</h2>
                        </div>
                        {showDescription && activeId === account?.id ? <RemoveIcon style={{fontSize: 20}} /> : <AddIcon style={{fontSize: 20}} />}
                      </div>

                      {showDescription && activeId === account?.id && (
                        <p className=' mt-3 text-[8px] sm:text-[10px] md:text-[12px] max-w-[1000px] md:leading-10 leading-5 text-neutral '>{account?.desc}</p>
                      )}

                    </div>
                  ))}
                </div>
              }

            </div>
          </div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>

      }
    </div>
  )
}

export default Faq