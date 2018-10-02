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
                        : replace(`/account/login`)
                )}
            </AuthenticationWrapper>
        )
    }
}

export default AccountLayout

