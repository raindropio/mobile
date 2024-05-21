import t from 't'
import { createRef, PureComponent, forwardRef } from 'react';
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Wrap, Form, Input, Button, MagnifierIcon, knownHeight } from './style'
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

class Search extends PureComponent {
	static propTypes = {
		value:			PropTypes.string,
		loading:		PropTypes.bool,
		variant:		PropTypes.string, //default||head

        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func
    }

    static defaultProps = {
		value:			'',
		variant:		'default',
	}

	_input = createRef()

	componentDidMount() {
		setTimeout(() => {
			if (this.props.autoFocus)
				(this.props.forwardedRef || this._input).current?.focus()
		}, 200)
	}

	componentWillUnmount() {
		if (this.props.onBlur)
			this.props.onBlur()
	}

	onClear = ()=>{
		this.props.onChange('');
		(this.props.forwardedRef || this._input).current?.focus()
	}

	render() {
		const { style, loading, onFocus, onChange, onSubmit, variant, forwardedRef, ...etc } = this.props

		return (
			<Wrap style={style}>
				<Form 
					variant={variant}>
					{variant != 'head' ? (
						<MagnifierIcon 
							name='search'
							size='18' />
					) : null}

					<Input 
						placeholder={t.s('defaultCollection-0')}
						{...etc}
						ref={forwardedRef || this._input}
						variant={variant}
						onFocus={onFocus}
						onChangeText={onChange}
						onSubmitEditing={onSubmit} />

					{loading ? (
						<ActivityIndicator />
					) : (etc.value ? 
						<ClearButton onPress={this.onClear} /> : 
						null
					)}
				</Form>
			</Wrap>
		)
	}
}

export default forwardRef((props, ref) => (
    <Search {...props} forwardedRef={ref} />
))