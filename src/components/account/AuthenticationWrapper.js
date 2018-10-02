import React from 'react'
import ContextConsumer from '../../layouts/context'
import PropTypes from 'prop-types';

class AuthenticationWrapper extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ data }) => {
                    const isAuthenticated = data.customerAccessToken && data.customerAccessToken.expiresAt && data.customerAccessToken.expiresAt > new Date().toISOString() ? true : false
                    return (this.props.children({
                            isAuthenticated,
                        }))
                }}
            </ContextConsumer>
        )
    }
}

AuthenticationWrapper.propTypes = {
    children: PropTypes.func.isRequired,
}

export default AuthenticationWrapper


