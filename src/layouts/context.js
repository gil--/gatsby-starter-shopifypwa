import React from "react"

const defaultContextValue = {
    set: () => { },
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
    constructor() {
        super()

        this.setData = this.setData.bind(this)
        this.state = {
            data: {
                // set your initial data shape here
                customerAccessToken: this.getLocalStorageFromKey('customerAccessToken'),
                showMenu: false,
            },
            ...defaultContextValue,
            set: this.setData,
        }
    }

    getLocalStorageFromKey(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch(e) {
            // error retrieving
            return ''
        }
    }

    setData(newData, shouldStoreLocal = true) {
        this.setState(state => ({
            data: {
                ...state.data,
                ...newData,
            },
        }))

        if (!shouldStoreLocal) return

        Object.keys(newData).forEach(key => {
            try {
                localStorage.setItem(key, JSON.stringify(newData[key]));
            } catch (e) {
                console.log(e)
            }
        })
    }

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>
    }
}

export { Consumer as default, ContextProviderComponent }