import * as React from 'react'
import { Platform } from 'react-native'
import _ from 'lodash-es'
import { ThemeContext } from 'styled-components'
import { HeaderBackButton } from '@react-navigation/stack'
import { ButtonWrap } from '../header/buttons/style'
import Icon from 'co/icon'

import screenOptions from './screenOptions'

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

        screenOptions = (params)=>{
            let additionalOptions = {}

            //fix padding on top of ios modals, where react stack inside of native stack
            if (Platform.OS=='ios'){
                let insideOfModal = this.context.isExtension || false

                //determine does current navigator in modal?
                const parent = params.navigation.dangerouslyGetParent()
                if (parent && parent.isFocused()){
                    const state = parent && parent.dangerouslyGetState()
                    if (state && state.index)
                        insideOfModal = true
                }

                //special style for navigator inside of modal
                if (insideOfModal) {
                    additionalOptions.headerStatusBarHeight = 0
                    //additionalOptions.headerStyle = { height: 50 }
                    additionalOptions.headerLeft = (props) => this.renderBack(params, props)
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

        closeImage = ()=>(
            <ButtonWrap>
                <Icon 
                    name='close'
                    color='text.secondary' />
            </ButtonWrap>
        )

        renderBack = ({ navigation }, props)=>{
            const { index } = navigation.dangerouslyGetState()

            return (
                <HeaderBackButton
                    {...props}
                    backImage={!index ? this.closeImage : props.backImage}
                    onPress={navigation.goBack} />
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