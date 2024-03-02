import React from 'react'

const ButtonSpinner = ({color}) => {
  return (
    <div className="flex flex-row space-x-4">
        <div className={`w-4 h-4 rounded-full animate-spin border-2 border-dashed border-${color} border-t-transparent`}></div>

    </div>
  )
}

export default ButtonSpinner