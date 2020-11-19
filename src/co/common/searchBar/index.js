import t from 't'
import React from 'react'
import { View, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { Wrap, Form, Input, Button, Loading } from './style'
import Icon from 'co/icon'

export const ClearButton = ({onPress})=>(
	<Button onPress={onPress}>
		<Icon 
			name={Platform.OS=='ios' ? 'close-circle' : 'close'}
			variant='fill' />
	</Button>
)

export default class Search extends React.PureComponent {
	static propTypes = {
		value:			PropTypes.string,
		loading:		PropTypes.bool,
		variant:		PropTypes.string, //default||head

		onPress:		PropTypes.func,
        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func
    }

    static defaultProps = {
		value:			'',
		variant:		'default',
        placeholder:    t.s('defaultCollection-0'),
	}

	_input = React.createRef()

	onClear = ()=>{
		this.props.onChange('')
		this._input.current.focus()
	}

	onFocus = e=>{
		if (this.props.onPress){
			e.preventDefault()
			this.props.onPress(e)
			return false
		}
		else if (this.props.onFocus)
			this.props.onFocus(e)
	}

	render() {
		const { style, loading, onPress, onChange, onSubmit, variant, ...etc } = this.props

		return (
			<Wrap style={style}>
				<Form 
					as={onPress ? RectButton : View}
					variant={variant}
					onPress={onPress}>
					<Input 
						{...etc}
						ref={this._input}
						pointerEvents={onPress ? 'none' : 'auto'}
						showSoftInputOnFocus={onPress ? false : true}
						variant={variant}
						onFocus={this.onFocus}
						onChangeText={onChange}
						onSubmitEditing={onSubmit} />

					{loading ? (
						<Loading />
					) : (etc.value ? 
						<ClearButton onPress={this.onClear} /> : 
						null
					)}
				</Form>
			</Wrap>
		)
	}
}