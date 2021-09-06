import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Login from './login'
import Register from './register'

const Tab = createMaterialTopTabNavigator()

function Tabs() {
	return (
		<Tab.Navigator 
			initialRouteName='register'
			keyboardDismissMode='none'
			options={{lazy: true}}>
			<Tab.Screen name='login' component={Login} options={Login.options} />
			<Tab.Screen name='register' component={Register} options={Register.options} />
		</Tab.Navigator>
	)
}
Tabs.options = {
	title: 'Raindrop.io',
	headerShown: true,
	headerStyle: {
		elevation: 0,
		shadowOpacity: 0
	}
}

export default Tabs