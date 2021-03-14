import React, { useState, useRef, useCallback, useEffect } from 'react'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { setExtensionCollectionsSearchFocus } from 'local/actions'

import Header from 'co/navigation/header'
import TreeContainer from 'co/collections/items'

function ExtensionSelectCollection({ route: {params={}}, navigation }) {
    const dispatch = useDispatch()

    //tree
    const [selectedId, setSelectedId] = useState()

    const treeOptions = useRef({
        hideIds: [0, -99]
    }).current

    const onItemPress = useCallback(({ _id })=>{
        setSelectedId(_id)
		navigation.replace('create', { ...params, collectionId: _id })
	}, [])
    
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
            <Header.Buttons a left>
                <Header.Cancel onPress={navigation.goBack} />
            </Header.Buttons>
            <Header.Buttons a>
                <Header.Button 
                    icon='settings-2'
                    onPress={onSettingsPress} />
            </Header.Buttons>

            <TreeContainer 
                options={treeOptions}
                selectedId={selectedId}
                searchAutoFocus={searchAutoFocus}
                onItemPress={onItemPress}
                onSearchFocus={onSearchFocus}
                onSearchBlur={onSearchBlur} />
        </>
    )
}

ExtensionSelectCollection.options = {
    title: t.s('selectCollection'),
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
    }
}

export default ExtensionSelectCollection