import { Navigation } from 'react-native-navigation'
import { isExtension } from 'modules/native'
import { openURL } from './browser'

/*
    Most used:
        showModal(this.props, 'screen/path', {_id: 1})
        push(this.props, 'screen/path', {_id: 1})
        close(this.props)
        mergeOptions(this.props, options)
        replace(this.props, 'screen/path', {_id: 1})
        openURL(this.props, {})

    Use if only sure:
        dismissModal(this.props)
        dismissAllModals()
        pop(this.props)

    ...All other react-native-navigation methods
*/

const uber = {
    getComponent(screenName, passProps, options) {
        return {
            component: {
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
        if (await isExtension())
            return require('modules/extension').close()
        else
            return Navigation.dismissModal(componentId)
    },

    async dismissAllModals() {
        return Navigation.dismissAllModals()
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
    replace({ componentId, isModal, isOverlay }, screenName, passProps, options) {
        return uber.setStackRoot(componentId, uber.getComponent(screenName, {...passProps, isModal, isOverlay}, options))
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
        return Navigation.setStackRoot(name, props)
    },

    registerComponent(name, props) {
        return Navigation.registerComponent(name, props)
    },

    TouchablePreview: Navigation.TouchablePreview,

    store: Navigation.store
}

export default uber