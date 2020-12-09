import React, { useEffect, useState } from 'react'
import { data } from 'modules/extension'

const Context = React.createContext({})

export default Context

export function Provider({ children }) {
    const [value, setValue] = useState({})

    useEffect(() => {
        data().then(setValue)
    }, [])

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}