import React from 'react'
import AboutBanner from './aboutBanner/AboutBanner'
import styles from '../../styles'
import Info from './info/Info'
import DeliveryGuarantee from '../home/DeliveryGuarantee/DeliveryGuarantee'
import NewsLetter from './newsletter/NewsLetter'


const About = () => {
  return (
    <div className={`${styles.newPageSectionProducts}`}>
      <AboutBanner />
      <Info />
      <NewsLetter />
      <DeliveryGuarantee section="aboutBanner" />

    </div>
  )
}

export default About