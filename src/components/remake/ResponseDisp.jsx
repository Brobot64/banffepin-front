import React from 'react'


const ResponseDisp = ({ isError = true, msg }) => {
  return (
    <div className={`responsemsg ${isError ? 'danger': ''} ${msg ? '' : 'hide'}`}>
        {msg}
    </div>
  )
}

export default ResponseDisp