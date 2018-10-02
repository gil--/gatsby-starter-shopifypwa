import React from 'react'
import AuthenticationWrapper from './AuthenticationWrapper'
import { replace } from 'gatsby'
import PropTypes from 'prop-types';

class GuestLayout extends React.Component {
    render() {
        return (
            <AuthenticationWrapper>
                {({ isAuthenticated }) => (
                    (isAuthenticated)
                        ? replace(`/account`)
                        : this.props.children
                )}
            </AuthenticationWrapper>
        )
    }
}

export default GuestLayout

