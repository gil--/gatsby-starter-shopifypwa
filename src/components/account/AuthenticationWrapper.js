import React from 'react'
import { replace } from 'gatsby'
import ContextConsumer from '../../layouts/context'

class AuthenticationWrapper extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ data }) => {
                    return (data.customerAccessToken &&
                        data.customerAccessToken.expiresAt &&
                        data.customerAccessToken.expiresAt > new Date().toISOString()) ?
                        (!this.props.true && this.props.navigate && typeof window !== `undefined`) ?
                            replace(this.props.navigate) :
                            this.props.true
                        :
                        (!this.props.false && this.props.navigate && typeof window !== `undefined`) ?
                            replace(this.props.navigate):
                            this.props.false
                }}
            </ContextConsumer>
        )
    }
}

export default AuthenticationWrapper


