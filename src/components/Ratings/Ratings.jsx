import StarRatings from "react-star-ratings";

import React from 'react'

const Ratings = ({ ratings, color, size = "20px"}) => {
  return (
    <StarRatings 
      rating={ratings}
      starRatedColor={color}
      numberOfStars={5}
      starDimension={size}
      starSpacing="1px"
      name="rating"
    />
  )
}

export default Ratings