import React from 'react'

const CustomDatePop = ({onChange, handleSubmit}) => {
  return (
    <React.Fragment>
        <div className="customDate">
            <div>
                <label htmlFor="">Start Date</label>
                <input type="date" name='start' onChange={onChange} />
            </div>
            
            <div>
                <label htmlFor="">End Date</label>
                <input type="date" name='end' onChange={onChange}/>
            </div>

            <button onClick={handleSubmit}>Filter</button>
        </div>
    </React.Fragment>
  )
}

export default CustomDatePop