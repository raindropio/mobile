import t from 't'
import React from 'react'
import { View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { Wrap, Form, Input, Button, Loading } from './style'
import Icon from 'co/icon'

export const ClearButton = ({onPress})=>(
	<Button onPress={onPress}>
		<Icon 
			name='close-circle'
			variant='fill' />
	</Button>
)

export default class Search extends React.PureComponent {
	static propTypes = {
		value:			PropTypes.string,
		loading:		PropTypes.bool,

		onPress:		PropTypes.func,
        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func
    }

    static defaultProps = {
		value:			'',
        placeholder:    t.s('defaultCollection-0'),
	}

	_input = React.createRef()

	onClear = ()=>{
		this.props.onChange('')
		this._input.current.focus()
	}

	render() {
		const { style, loading, onPress, onChange, onSubmit, ...etc } = this.props

		return (
			<Wrap style={style}>
				<Form 
					as={onPress ? RectButton : View}
					onPress={onPress}>
					<Input 
						{...etc}
						ref={this._input}
						pointerEvents={onPress ? 'none' : 'auto'}
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