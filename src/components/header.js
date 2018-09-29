import React from 'react'
import { Link } from 'gatsby'
import ContextConsumer from '../layouts/context'

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem',
      borderBottom: '1px solid #ddd',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem',
      }}
    >
      <h1 style={{
            margin: 0,
            fontSize: '24px',
          }}
      >
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
        <ContextConsumer>
          {({ data }) => {
            return (!data.customerAccessToken) ?
            <>
              <Link
                to="/account/login"
              >
                Log In
              </Link>
              <Link
                to="/account/register"
              >
                Sign Up
              </Link>
            </>
            :
            <Link
              to="/account"
            >
              My Account
            </Link>
          }}
        </ContextConsumer>
      </h1>
    </div>
  </div>
)

export default Header
