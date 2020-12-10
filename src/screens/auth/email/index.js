import React from 'react'
import Stack from 'co/navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Header from 'co/navigation/header'

import Login from './login'
import Register from './register'

const Tab = createMaterialTopTabNavigator()

function Tabs({ navigation }) {
	return (
		<>
			<Header.Buttons  left>
				<Header.Cancel onPress={navigation.goBack} />
			</Header.Buttons>
			<Header.Buttons a />

			<Tab.Navigator 
				initialRouteName='register'
				lazy>
				<Tab.Screen name='login' component={Login} options={Login.options} />
				<Tab.Screen name='register' component={Register} options={Register.options} />
			</Tab.Navigator>
		</>
	)
}
Tabs.options = {
	title: 'Raindrop.io',
	headerStyle: {
		elevation: 0,
		shadowOpacity: 0
	}
}

export default function Email() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='_tabs' component={Tabs} options={Tabs.options} />
		</Stack.Navigator>
	)
}