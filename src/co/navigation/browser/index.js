import React from 'react'
import { Platform, Linking } from 'react-native'
import { connect } from 'react-redux'
import { useTheme } from 'styled-components'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import browsersList from 'assets/browsers'
import { openFileUrl } from 'modules/native'

const isHttps = /^(https?:\/\/)/

function Browser({ browser, fromBottom=false, onClose, readerMode, mimeType, ...etc }) {
    const { dark, color, background } = useTheme()

    React.useEffect(
        ()=>{
            let link = etc.link
            let type = browser == 'internal' ? 'internal' : 'system'

            //non http(s) link
            if (!isHttps.test(link))
                type = 'system'
            //on android if is file, so open it in appropriate app
            else if (Platform.OS == 'android' && mimeType)
                type = 'file'
            //find preferred external browser and rewrite url
            else
                for(const { id, prefix } of browsersList){
                    if (id == browser && prefix){
                        type = 'system'
                        link = link.replace(isHttps, prefix)
                        break
                    }
                }

            //open in internal browser
            switch(type){
                case 'internal':
                    InAppBrowser.isAvailable()
                        .then(available=>{
                            if (available)
                                return InAppBrowser.open(link, {
                                    //android
                                    toolbarColor: background.regular,
                                    secondaryToolbarColor: background.alternative,
                                    enableUrlBarHiding: true,
                                    showTitle: true,
                                    enableDefaultShare: true,
                                    hasBackButton: true,
                
                                    //ios
                                    dismissButtonStyle: 'cancel',
                                    modalEnabled: fromBottom,
                                    animated: true,
                                    preferredBarTintColor: dark ? 'black' : 'white',
                                    preferredControlTintColor: color.accent,
                                    enableBarCollapsing: true,
                                    readerMode
                                })

                            return Linking.openURL(link)
                        })
                        .then(()=>{
                            onClose(true)
                        })
                        .catch(onClose)
                break

                case 'file':
                    openFileUrl(link, mimeType == 'auto' ? '' : mimeType)
                break

                default:
                    Linking.canOpenURL(link)
                    .then(supported=>{
                        if (supported)
                            return Linking.openURL(link)
                    })
                    .then(()=>{
                        onClose(true)
                    })
                    .catch(onClose)
                break
            }
        },
        [] //[etc.link] buggy on iPad for some reason :(
    )

    return null
}

export default connect(
    (state, { browser })=>({
        browser: browser||state.local.browser
    })
)(Browser)