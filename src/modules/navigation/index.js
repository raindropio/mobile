import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isExtension } from 'modules/native'
import { openURL } from './browser'
import baseStyle from 'co/screen/styles/base'

Navigation.events().registerCommandListener(async(name, params) => {
    if (name == 'dismissModal' && await isExtension())
        require('modules/extension').close()
})

//Fix for iOS extension
if (Platform.OS=='ios') {
    Navigation.events().registerCommandCompletedListener(async() => {
        //Will be showen only after show event
        if (await isExtension())
            require('modules/extension').show()
    })
}

/*
    Most used:
        showModal(this.props, 'screen/path', {_id: 1})
        push(this.props, 'screen/path', {_id: 1})
        close(this.props)
        mergeOptions(this.props, options)
        updateProps(this.props, options)
        replace(this.props, 'screen/path', {_id: 1})
        openURL(this.props, {})

    Use if only sure:
        dismissModal(this.props)
        dismissAllModals()
        pop(this.props)

    ...All other react-native-navigation methods
*/

const uber = {
    getComponent(screenName, passProps, options, id) {
        return {
            component: {
                id,
                name: screenName,
                passProps,
                options
            }
        }
    },

    async showModal({ componentId, isModal }, screenName, passProps, options) {
        if (isModal || await isExtension())
            return uber.push({ componentId }, screenName, passProps, options)
            
        return Navigation.showModal({
            stack: {
                children: [
                    uber.getComponent(screenName, {
                        ...passProps,
                        isModal: true
                    }, options)
                ]
            }
        })
    },

    push({ componentId }, screenName, passProps, options) {
        return Navigation.push(componentId, uber.getComponent(screenName, passProps, options))
    },

    close({ componentId, isModal, isOverlay }) {
        if (isModal)
            return uber.dismissModal({ componentId })
        else if (isOverlay)
            return uber.dismissOverlay({ componentId })
        else
            return uber.pop({ componentId })
    },

    openURL,



    async dismissModal({ componentId }) {
        try{
            return await Navigation.dismissModal(componentId)
        } catch(e) {
            return false
        }
    },

    async dismissAllModals() {
        try{
            return await Navigation.dismissAllModals()
        } catch(e) {
            return false
        }
    },

    pop({ componentId }) {
        return Navigation.pop(componentId)
    },

    popToRoot({ componentId }) {
        return Navigation.popToRoot(componentId)
    },

    mergeOptions({ componentId }, options) {
        return Navigation.mergeOptions(componentId, options)
    },

    updateProps({ componentId }, props) {
        return Navigation.updateProps(componentId, props)
    },

    showOverlay({ componentId }, screenName, passProps, options) {
        return Navigation.showOverlay(
            uber.getComponent(screenName, {
                ...passProps,
                isOverlay: true
            }, options)
        )
    },

    dismissOverlay({ componentId }) {
        return Navigation.dismissOverlay(componentId);
    },


    //Custom
    async replace({ componentId, isModal, isOverlay }, screenName, passProps, options) {
        return uber.setStackRoot(
            await isExtension() ? require('modules/extension').stackId : componentId, 
            uber.getComponent(
                screenName, 
                {...passProps, isModal, isOverlay}, 
                options
            )
        )
    },



    //Proxy
    events() {
        return Navigation.events()
    },

    setDefaultOptions(props) {
        return Navigation.setDefaultOptions(props)
    },

    setRoot(props) {
        return Navigation.setRoot(props)
    },

    setStackRoot(name, props) {
        //fix for RNN, it ignore global settings on iOS
        const { animations } = baseStyle()

        if (Array.isArray(props))
            props[0].component.options = {
                ...props[0].component.options||{},
                animations 
            }
        else
            props.component.options = {
                ...props.component.options||{},
                animations
            }
        
        return Navigation.setStackRoot(name, props)
    },

    registerComponent(name, props) {
        return Navigation.registerComponent(name, props)
    },

    setLazyComponentRegistrator(name) {
        return Navigation.setLazyComponentRegistrator(name)
    },

    TouchablePreview: Navigation.TouchablePreview,

    store: Navigation.store
}

export default uber