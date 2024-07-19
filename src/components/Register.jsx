import React from 'react'

const RegisterScreen = () => {
  return (
    <React.Fragment>
         <form action="">
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="">Name *</label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="">Email *</label>
                <input type="password" />
            </div>

            <div className="form-group">
                <label htmlFor="">Password *</label>
                <input type="password" />
            </div>

            <div className="form-group">
                <label htmlFor="">Password *</label>
                <input type="password" />
            </div>

            <div className="form-group">
                <label htmlFor="">Password *</label>
                <input type="password" />
            </div>

            <div className="form-group">
                <label htmlFor="">Password *</label>
                <input type="password" />
            </div>

            <div className="form-group">
                <label htmlFor="">Password *</label>
                <input type="password" />
            </div>

            <button type="submit">Register</button>
        </form>
    </React.Fragment>
  )
}

export default RegisterScreen