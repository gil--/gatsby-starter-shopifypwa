import React from 'react'
import AuthenticationWrapper from './AuthenticationWrapper'
import { replace } from 'gatsby'
import PropTypes from 'prop-types';

class AccountLayout extends React.Component {
    render() {
        return (
            <AuthenticationWrapper>
                {({ isAuthenticated }) => (
                    (isAuthenticated)
                        ? this.props.children
                        : (typeof window !== 'undefined') ? replace(`/account/login`) : null
                )}
            </AuthenticationWrapper>
        )
    }
}

export default AccountLayout

