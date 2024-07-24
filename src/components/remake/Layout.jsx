import React from 'react';
import '../../style/main.scss'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
        <div className="mobile-layout">
            <div className="inner-component">
                { children }
            </div>
            <a href='https://google.com' target='_blank' className="contact-us" title='chat admin'>
              <i className="fa-regular fa-comment-dots"></i>
            </a>
        </div>
    </React.Fragment>
  )
}

export default Layout