import * as React from 'react'
import { Platform } from 'react-native'
import { ThemeContext } from 'styled-components'

import screenOptions from './screenOptions'

function merge() {
    const [ params, ...items] = arguments

    let result = {}
    for(const val of items)
        switch(typeof val) {
            case 'object':      result = { ...result, ...val }; break
            case 'function':    result = { ...result, ...val(params) }; break
        }

    return result
}

export default function(Navigator, overrideProps={}) {
    return class MixedNavigator extends React.Component {
        static contextType = ThemeContext

        screenOptions = (params)=>{
            let additionalOptions = {}

            //fix padding on top of ios modals, where react stack inside of native stack
            if (Platform.OS=='ios'){
                const parent = params.navigation.dangerouslyGetParent()
                if (parent && parent.isFocused()){
                    const state = parent && parent.dangerouslyGetState()
                    if (state && state.index){
                        additionalOptions.headerStatusBarHeight = 0
                        //additionalOptions.headerStyle = { height:  }
                    }
                }
            }

            return merge(
                params,

                screenOptions,
                overrideProps.screenOptions,
                additionalOptions,
                this.props.screenOptions
            )
        }
    
        render() {
            const { children, ...etc } = this.props
    
            return (
                <Navigator 
                    {...etc}
                    screenOptions={this.screenOptions}>
                    {children}
                </Navigator>
            )
        }
    }
}