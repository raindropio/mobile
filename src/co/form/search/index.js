import t from 't'
import React from 'react'
import { Platform, View } from 'react-native'
import PropTypes from 'prop-types'
import { Wrap, Touch, Form, Input, Button, MagnifierIcon, knownHeight } from './style'
import { ActivityIndicator } from 'co/native'
import Icon from 'co/icon'

export { knownHeight }

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
	}

	_input = React.createRef()

	componentWillUnmount() {
		if (this.props.onBlur)
			this.props.onBlur()
	}

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
				<Touch 
					as={onPress ? undefined: View}
					onPress={onPress}>
					<Form 
						pointerEvents={onPress ? 'none' : 'auto'}
						variant={variant}>
						<MagnifierIcon 
							name='search'
							size='18' />

						<Input 
							placeholder={t.s('defaultCollection-0')}
							{...etc}
							ref={this._input}
							showSoftInputOnFocus={onPress ? false : true}
							variant={variant}
							onFocus={this.onFocus}
							onChangeText={onChange}
							onSubmitEditing={onSubmit} />

						{loading ? (
							<ActivityIndicator />
						) : (etc.value ? 
							<ClearButton onPress={this.onClear} /> : 
							null
						)}
					</Form>
				</Touch>
			</Wrap>
		)
	}
}