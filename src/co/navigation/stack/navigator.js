import * as React from 'react'
import { Platform } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import _ from 'lodash-es'
import t from 't'
import styled, { ThemeContext } from 'styled-components'
import Header from '../header'
import screenOptions from './screenOptions'

const IosTopNotch = styled.View`
    position: absolute;
    z-index: 9999;
    background: ${({theme})=>theme.color.border};
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
            case 'object':      result = _.merge(result, val); break
            case 'function':    result = _.merge(result, val(params)); break
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

            this._additionalOptions = {
                statusBarStyle: this.context.dark ? 'light' : 'dark'
            }

            //fix padding on top of ios modals, where react stack inside of native stack
            let insideOfModal = false

            //determine does current navigator in modal?
            const parent = params.navigation.dangerouslyGetParent()
            if (parent && parent.isFocused()){
                const state = parent && parent.dangerouslyGetState()

                insideOfModal = this.context.isExtension || false

                if (state && state.index)
                    insideOfModal = true
            }

            //special style for navigator inside of modal
            if (insideOfModal) {
                if (Platform.OS=='ios') {
                    this._additionalOptions.headerStatusBarHeight = 20
                    this._additionalOptions.headerRight = ()=> this.renderDone(parent||params.navigation)
                    this.setState({ showIosTopNotch: true })
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

        renderDone = (parent)=>(
            <Header.Button 
                title={t.s('done')}
                bold
                onPress={parent.goBack} />
        )
    
        render() {
            const { children, ...etc } = this.props
            const { showIosTopNotch } = this.state

            return (
                <>
                    <Navigator 
                        //false works hugely faster! but more memory needed. `detachInactiveScreens` only works for non-native stack navigator
                        //turn on in Android <=27, because otherwise taps can repsond through active screen
                        detachInactiveScreens={Platform.OS == 'android' && Platform.Version<=27}

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