import React, { useCallback, useMemo, useState } from 'react'
import { useWindowDimensions, Platform } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Stack from 'co/navigation/stack'
import Header from 'co/navigation/header'
import Master from './master'

const Drawer = createDrawerNavigator()

function Navigator({ navigation, children: [master, ...details], initialRouteName } ) {
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

    //navigator
    const navigatorScreenOptions = useMemo(()=>({
        swipeEnabled: !isLargeScreen,
        swipeEdgeWidth: 50,
        
        drawerType: isLargeScreen && !forceHide ? 'permanent' : 'slide',
        drawerStyle: isLargeScreen ? {
            width: '45%',
            maxWidth: 450
        } : {
            width: '100%'
        },

        headerShown: false
    }), [isLargeScreen, forceHide, onToggle])

    //detail
    const detailScreenOptions = useCallback(({ navigation })=>({
        ...(!navigation.getState().index ? {
            headerLeft: ()=>
                <Header.Button 
                    onPress={onToggle}
                    color='text.secondary'
                    size={!isLargeScreen && Platform.OS=='ios' ? '32' : undefined}
                    icon={isLargeScreen ? 'menu' : Platform.select({ ios: 'arrow-left-s', android: 'arrow-left' })} />
        } : {})
    }), [onToggle])

    //master
    const masterComponent = useCallback(({ navigation })=>(
        <Master.Navigator navigation={navigation}>
            {master}
        </Master.Navigator>
    ), [master])

    return (
        <Drawer.Navigator
            drawerContent={masterComponent}
            screenOptions={navigatorScreenOptions}>
            <Drawer.Screen name='_split_view_detail'>{()=>(
                <Stack.Navigator 
                    initialRouteName={initialRouteName}
                    screenOptions={detailScreenOptions}>
                    {details}
                </Stack.Navigator>
            )}</Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default {
    Navigator,
    Master: Master.Screen,
    Detail: Stack.Screen
}