import React from 'react'
import { navigate } from 'gatsby'
import ContextConsumer from '../../layouts/context'

class AuthenticationWrapper extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ data }) => {
                    return (data.customerAccessToken &&
                        data.customerAccessToken.expiresAt &&
                        data.customerAccessToken.expiresAt > new Date().toISOString()) ?
                        <>
                            {this.props.true}
                        </>
                        :
                        <>
                            {this.props.false}
                        </>
                }}
            </ContextConsumer>
        )
    }
}

export default AuthenticationWrapper


