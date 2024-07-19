import React from 'react';
import '../../style/main.scss'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
        <div className="mobile-layout">
            <div className="inner-component">
                { children }
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout