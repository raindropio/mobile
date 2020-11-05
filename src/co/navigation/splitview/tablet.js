import React from 'react'
import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import Stack from '../stack'
import { Button } from '../header'
import * as ButtonsStyle from '../header/buttons/style'

import MasterStack, { overrideDispatch } from './masterNavigator'
import MasterContainer, { MasterWrap, MasterBackdrop } from './masterContainer'

const Drawer = createDrawerNavigator()

export default {
    Navigator: class SplitViewNavigator extends React.PureComponent {
        static defaultProps = {
            initialRouteName: undefined
        }

        //large screen ----
        componentDidMount() {
            Dimensions.addEventListener('change', this.onDimensionsChange)
        }

        componentWillUnmount() {
            Dimensions.removeEventListener('change', this.onDimensionsChange)
        }

        onDimensionsChange = ()=>
            this.setState({ largeScreen: this.isLargeScreen() })

        isLargeScreen = ()=>
            Dimensions.get('window').width >= 600

        //state/params
        state = {
            open: false,
            forceHide: false,
            largeScreen: this.isLargeScreen()
        }

        //master
        onDrawerOpenChange = (open)=>
            this.setState({ open })
    
        MasterComponent = ({ progress })=>{
            const { children: [master] } = this.props

            const translateX = Animated.interpolate(progress, {
                inputRange: [0, 1],
                outputRange: [-100, 0],
            })

            const opacity = Animated.interpolate(progress, {
                inputRange: [0, 1],
                outputRange: [1, 0],
            })
    
            return (
                <MasterWrap style={{ transform: [{ translateX }] }}>
                    <MasterBackdrop style={{ opacity }} />
                    <DrawerState onOpenChange={this.onDrawerOpenChange} />

                    <MasterContainer>
                        <MasterStack.Navigator>
                            {master}
                        </MasterStack.Navigator>
                    </MasterContainer>
                </MasterWrap>
            )
        }
    
        //detail screens ------
        _detailStack = React.createRef()

        detailNavigatorOptions = {
            headerLeft: ()=>
                <ButtonsStyle.Wrap>
                    <Button 
                        onPress={this.onDrawerToggleTap}
                        icon='menu' />
                </ButtonsStyle.Wrap>
        }

        onDrawerToggleTap = ()=>{
            if (this.state.largeScreen){
                this.setState({ forceHide: !this.state.forceHide })
                this.props.navigation.dispatch(DrawerActions.closeDrawer())
            }
            else
                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
        }

        DetailComponent = ()=>{
            const { children: [master, ...details], initialRouteName } = this.props
            
            return (
                <Stack.Navigator 
                    ref={this._detailStack}
                    initialRouteName={initialRouteName}
                    screenOptions={this.detailNavigatorOptions}>
                    {details}
                </Stack.Navigator>
            )
        }
    
        //wrap ------
        largeDrawerStyle = {
            width: '100%',
        }

        gestureDisabled = {
            enabled: false
        }

        Wrap = ()=>{
            const { open, forceHide, largeScreen } = this.state

            return (
                <Drawer.Navigator
                    drawerType={largeScreen && !forceHide ? 'permanent' : 'back'}
                    drawerStyle={largeScreen ? null : this.largeDrawerStyle}
                    drawerContent={this.MasterComponent}
                    overlayColor='transparent'
                    edgeWidth={Dimensions.get('window').width}
                    gestureHandlerProps={(!largeScreen && open) ? this.gestureDisabled : undefined}>
                    <Drawer.Screen name='_split_view_detail' component={this.DetailComponent} />
                </Drawer.Navigator>
            )
        }
    
        render() {
            const Wrap = this.Wrap

            overrideDispatch(this.props.navigation.dispatch)
    
            return <Wrap />
        }
    },

    Master: MasterStack.Screen,
    Detail: Stack.Screen
}

function DrawerState({ onOpenChange }) {
    const drawerIsOpen = useIsDrawerOpen()

    React.useEffect(() => {
        onOpenChange(drawerIsOpen)
    }, [drawerIsOpen])

    return null
}