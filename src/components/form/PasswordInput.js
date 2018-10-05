import React from 'react'
import PropTypes from 'prop-types';
//import zxcvbn from 'zxcvbn'; // TODO: implement password strength, see dropbox login

class PasswordInput extends React.Component {
    state = {
        isPasswordMasked: true
    }

    handlePasswordToggle = () => {
        this.setState(prevState => ({
            isPasswordMasked: !prevState.isPasswordMasked,
        }))
    }

    render() {
        const { isPasswordMasked } = this.state;

        return (
            <div>
                <input
                    type={isPasswordMasked ? 'password' : 'text'}
                    {...this.props }
                />
                <button type="button" onClick={this.handlePasswordToggle}>{isPasswordMasked ? 'show' : 'hide'}</button>
            </div>
        )
    }
}

PasswordInput.propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}

export default PasswordInput