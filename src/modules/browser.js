import React from 'react'
import t from 't'
import { Platform, Linking, Alert } from 'react-native'
import { connect } from 'react-redux'
import { useTheme } from 'styled-components'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import browsersList from 'assets/browsers'
import { openFileUrl } from 'modules/native'

const isHttps = /^(https?:\/\/)/

function Browser({ browser, fromBottom=false, onClose, mimeType, ...etc }) {
    const { dark, color, background } = useTheme()

    React.useEffect(
        ()=>{
            async function now() {
                let link = etc.link
                let type = browser == 'internal' ? 'internal' : 'system'
                let readerMode = false

                //clean up url if possible
                try{
                    const url = new URL(link)
                    if ((url.hash.match(/#/g) || []).length>1)
                        url.hash = ''
                    link = url.href
                }catch(e){}

                //reader mode
                if (browser == 'reader'){
                    type = 'internal'
                    readerMode = true
                }
    
                //non http(s) link
                if (!isHttps.test(link))
                    type = 'system'
                //on android if is file, so open it in appropriate app (only if 'preview')
                else if (Platform.OS == 'android' && mimeType && type == 'internal')
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
                
                try{
                    switch(type){
                        //open in internal browser
                        case 'internal':{
                            const available = await InAppBrowser.isAvailable()
                            
                            if (!available)
                                throw new Error('InAppBrowser is not available')
    
                            await InAppBrowser.open(link, {
                                //android
                                toolbarColor: background.regular,
                                secondaryToolbarColor: background.alternative,
                                enableUrlBarHiding: true,
                                showTitle: true,
                                enableDefaultShare: true,
                                hasBackButton: true,
                                forceCloseOnRedirection: false, //otherwise close if app restore from bg
                                showInRecents: true, //otherwise close if app restore from bg
            
                                //ios
                                dismissButtonStyle: 'cancel',
                                modalEnabled: fromBottom,
                                animated: true,
                                preferredBarTintColor: dark ? 'black' : 'white',
                                preferredControlTintColor: color.accent,
                                enableBarCollapsing: true,
                                readerMode
                            })
                            return
                        }
    
                        //in file viewer
                        case 'file':
                            await openFileUrl(link, mimeType == 'auto' ? '' : mimeType)
                            return
                    }
                } catch (e) {}
    
                if (await Linking.canOpenURL(link))
                    return Linking.openURL(link)
                else
                    throw new Error(`Can't open ${link} in ${type}`)
            }

            now()
                .then(()=>{
                    onClose(true)
                })
                .catch(e=>{
                    Alert.alert(t.s('error'), e.toString())
                    onClose(false)
                })
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