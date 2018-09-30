import React from 'react'
import AuthenticationWrapper from './AuthenticationWrapper'

class AccountLayout extends React.Component {
    render() {
        return (
            <AuthenticationWrapper
                navigate={`/account/login`}
                true={this.props.children}
            />
        )
    }
}

export default AccountLayout

