import * as React from 'react'
import { Platform } from 'react-native'
import _ from 'lodash-es'

import { HeaderBackButton } from '@react-navigation/elements'
import styled, { ThemeContext } from 'styled-components'
import Header from '../header'
import screenOptions from './screenOptions'

const IosTopNotch = styled.View`
    position: absolute;
    z-index: 9999;
    background: ${({theme})=>theme.text.regular};
    opacity: .18;
    width: 44px;
    height: 5px;
    border-radius: 5px;
    top: 10px;
    left: 50%;
    margin-left: -22px;
`

function merge() {
    const [ params, ...items] = arguments

    let result = {}
    for(const val of items)
        switch(typeof val) {
            case 'object':      result = _.merge({}, result, val); break
            case 'function':    result = _.merge({}, result, val(params)); break
        }

    return result
}

export default function(Navigator, overrideProps={}) {
    return class MixedNavigator extends React.Component {
        static contextType = ThemeContext

        state = {
            showIosTopNotch: false
        }

        getAdditionalOptions = (params)=>{
            if (this._additionalOptions)
                return this._additionalOptions

            this._additionalOptions = {}

            //fix padding on top of ios modals, where react stack inside of native stack
            let insideOfModal = false

            //determine does current navigator in modal?
            const parent = params.navigation.getParent()
            if (parent && parent.isFocused()){
                const state = parent && parent.getState()

                insideOfModal = this.context.isExtension || false

                if (state && state.index)
                    insideOfModal = true
            }

            //special style for navigator inside of modal
            if (insideOfModal) {
                if (Platform.OS=='ios' && this.props.notmodal !== true) {
                    this._additionalOptions.headerRight = (props)=> this.renderDone(props, params)

                    if (parseInt(Platform.Version, 10) >= 13) {
                        this._additionalOptions.headerStatusBarHeight = 20
                        setTimeout(()=>this.setState({ showIosTopNotch: true }))
                    }
                } else {
                    this._additionalOptions.headerLeft = (props)=> this.renderBack(props, params)
                }
            }

            return this._additionalOptions
        }

        screenOptions = (params)=>
            merge(
                params,

                screenOptions,
                overrideProps.screenOptions,
                this.getAdditionalOptions(params),
                this.props.screenOptions
            )

        renderBack = (props, { navigation })=>
            <HeaderBackButton 
                {...props}
                onPress={navigation.goBack} />

        renderDone = (props, { navigation })=>{
            const { index } = navigation.getState()

            if (index)
                return null

            return (
                <Header.Done onPress={navigation.goBack} />
            )
        }
    
        render() {
            const { children, ...etc } = this.props
            const { showIosTopNotch } = this.state

            //false works hugely faster! but more memory needed
            let detachInactiveScreens = false

            //turn on in Android <=27, because otherwise taps in webview can respond through active screen
            if (Platform.OS == 'android' && Platform.Version<=27)
                detachInactiveScreens = true

            //memory usage in iOS extension is crutial, so detach inactive screens where possible
            if (Platform.OS == 'ios' && this.context.isExtension)
                detachInactiveScreens = true

            return (
                <>
                    <Navigator 
                        detachInactiveScreens={detachInactiveScreens}
                        {...etc}
                        screenOptions={this.screenOptions}>
                        {children}
                    </Navigator>

                    {showIosTopNotch && <IosTopNotch />}
                </>
            )
        }
    }
}