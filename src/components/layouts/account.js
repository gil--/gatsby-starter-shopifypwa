import React from 'react'
import { navigate } from 'gatsby'
import ContextConsumer from '../../layouts/context'

class AccountLayout extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ data }) => {
                    return (!data.customerAccessToken) ?
                        navigate('/account/login')
                    :
                    <>
                        {this.props.children}
                    </>
                }}
            </ContextConsumer>
        )
    }
}

export default AccountLayout

