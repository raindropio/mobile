import React from 'react'
import URL from './url'

export default (Screen) => {
    const Component = (props)=>{
        switch(props.type) {
            case 'url':
                return <URL {...props} Screen={Screen} />
            
            default:
                return <Screen {...props} status='error' />
        }
    }
    Component.options = Screen.options

    return Component
}