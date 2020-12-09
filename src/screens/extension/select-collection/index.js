import React, { useRef, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { setExtensionCollectionsSearchFocus } from 'local/actions'

import Context from '../context'
import Header from 'co/navigation/header'
import TreeContainer from 'co/collections/items'
import useUrlExists from './useUrlExists'

function ExtensionSelectCollection({ navigation }) {
    const dispatch = useDispatch()
    const provider = useContext(Context)

    //check url existens
    useUrlExists(provider, navigation)

    //tree
    const treeOptions = useRef({
        hideIds: [0, -99]
    }).current
    const onItemPress = useCallback(({ _id })=>{
		navigation.replace('create', {
			...provider,
            collectionId: _id,
            preventDuplicate: false
		})
	}, [provider])
    
    //search
    const searchAutoFocus = useSelector(state=>state.local.collectionSearchFocus, [])
    const onSearchFocus = useCallback(()=>dispatch(setExtensionCollectionsSearchFocus(true)), [])
    const onSearchBlur = useCallback(()=>{
        this._searchBlur = setTimeout(()=>{
            dispatch(setExtensionCollectionsSearchFocus(false))
        }, 100)
    }, [])
    useEffect(()=>()=>{
        setTimeout(()=>{
            this._searchBlur && clearTimeout(this._searchBlur)
        })
    }, [])

    //settings button
    const onSettingsPress = useCallback(()=>{
        navigation.navigate('extension_mode')
    }, [])

    return (
        <>
            <Header.Buttons left>
                <Header.Cancel onPress={navigation.goBack} />
            </Header.Buttons>
            <Header.Buttons>
                <Header.Button 
                    icon='settings-2'
                    onPress={onSettingsPress} />
            </Header.Buttons>

            <TreeContainer 
                options={treeOptions}
                searchAutoFocus={searchAutoFocus}
                onItemPress={onItemPress}
                onSearchFocus={onSearchFocus}
                onSearchBlur={onSearchBlur} />
        </>
    )
}

ExtensionSelectCollection.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            type:			PropTypes.string,
            values:			PropTypes.array
        })
    })
}

ExtensionSelectCollection.options = {
    title: t.s('newBookmark'),
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
    }
}

export default ExtensionSelectCollection