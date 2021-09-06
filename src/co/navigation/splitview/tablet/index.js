import React, { useCallback, useMemo, useState } from 'react'
import { useWindowDimensions, Platform } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Header from 'co/navigation/header'
import Master from './master'

const Drawer = createDrawerNavigator()

function Navigator({ navigation, children: [master, ...details] } ) {
    const dimensions = useWindowDimensions()
    const isLargeScreen = dimensions.width >= 600
    const [forceHide, setForceHide] = useState(false)

    const onToggle = useCallback(()=>{
        if (isLargeScreen){
            setForceHide(forceHide=>!forceHide)
            navigation.dispatch(DrawerActions.closeDrawer())
        } else {
            navigation.dispatch(DrawerActions.toggleDrawer())
        }
    }, [isLargeScreen, navigation.toggleDrawer])

    const screenOptions = useMemo(()=>({
        swipeEnabled: false,
        
        drawerType: isLargeScreen && !forceHide ? 'permanent' : 'slide',
        drawerStyle: isLargeScreen ? {
            width: '45%',
            maxWidth: 450
        } : {
            width: '100%'
        },

        headerLeft: ()=>
            <Header.Button 
                onPress={onToggle}
                color='text.secondary'
                size={!isLargeScreen && Platform.OS=='ios' ? '32' : undefined}
                icon={isLargeScreen ? 'menu' : Platform.select({ ios: 'arrow-left-s', android: 'arrow-left' })} />
    }), [isLargeScreen, forceHide, onToggle])

    const masterComponent = useCallback(({ navigation })=>(
        <Master.Navigator navigation={navigation}>
            {master}
        </Master.Navigator>
    ), [master])

    return (
        <Drawer.Navigator
            drawerContent={masterComponent}
            screenOptions={screenOptions}>
            {details}
        </Drawer.Navigator>
    )
}

export default {
    Navigator,
    Master: Master.Screen,
    Detail: Drawer.Screen
}