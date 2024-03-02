import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import GoToTop from '../../components/GoToTop/GoToTop'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'
import { PageTag, Spinner } from '../../components'

const FaqsDetails = () => {
  const {id} = useParams()
  const [info, setInfo] = useState([]);
  let [accounts, setAccounts] = useState([]);
  let [delivery, setDelivery] = useState([]);
  let [payments, setPayments] = useState([]);
  let [products, setProducts] = useState([]);
  let [refundReturn, setRefundReturn] = useState([]);
  let [allFaqs, setAllFaqs] = useState([])
  let [curFaq, setCurFaq] = useState([])
  

  const getInfo = async () => {
    const q = collection(db, "faqs")
    const querySnapshot = await getDocs(q)
    const info = querySnapshot.docs.map((doc) => (
        doc.data()
      ))
      
      setInfo(info)
      setAccounts(info[0].products);
      setDelivery(info[1].products);
      setPayments(info[2].products);
      setProducts(info[3].products);
      setRefundReturn(info[4].products);
    }    
    
    useEffect(() => {
      getInfo()
    }, [])

    allFaqs = [...accounts, delivery, products, refundReturn].flat()

    const filterFaq = allFaqs.length >= 1 && allFaqs?.filter((faq) => faq.title === id)
    curFaq = filterFaq



  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
      <GoToTop />
      <PageTag prevPage="Home" next='FAQs' curPage='Details' />
      {info?.length >= 1 
        ?
          <div><h2 className=' font-poppins font-semibold text-[16px] sm:text-[18px] md:text-[24px] '>{curFaq[0]?.title}?</h2>
          <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] mt-5'>{curFaq[0]?.desc}</p></div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
      
      }
    </div>
  )
}

export default FaqsDetails