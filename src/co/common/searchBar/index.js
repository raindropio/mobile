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
        autoFocus:      PropTypes.bool,
		placeholder:    PropTypes.string,
		returnKeyType:	PropTypes.string,
		loading:		PropTypes.bool,

		onPress:		PropTypes.func,
        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func
    }

    static defaultProps = {
		value:			'',
        autoFocus:      false,
        placeholder:    t.s('defaultCollection-0'),
	}

	componentDidUpdate(prevProps) {
		if (prevProps.autoFocus != this.props.autoFocus){
			this._input && this._input.focus()
		}
	}

	componentDidMount() {
		if (this.props.autoFocus){
			this._input && this._input.focus()
		}
	}

	onClear = ()=>{
		this.props.onChange('')
	}

	bindInputRef = (ref)=>this._input=ref

	render() {
		return (
			<Wrap style={this.props.style}>
				<Form 
					as={this.props.onPress ? RectButton : View}
					onPress={this.props.onPress}>
					<Input 
						pointerEvents={this.props.onPress ? 'none' : 'auto'}
						ref={this.bindInputRef}
						autoFocus={this.props.autoFocus}
						placeholder={this.props.placeholder}
						returnKeyType={this.props.returnKeyType}
						value={this.props.value}
						selectTextOnFocus={this.props.selectTextOnFocus}
						onChangeText={this.props.onChange}
						onSubmitEditing={this.props.onSubmit}
						onFocus={this.props.onFocus}
						onBlur={this.props.onBlur} />

					{this.props.loading ? (
						<Loading />
					) : (this.props.value ? 
						<ClearButton onPress={this.onClear} /> : 
						null
					)}
				</Form>
			</Wrap>
		)
	}
}