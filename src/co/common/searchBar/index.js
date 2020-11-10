import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { Wrap, Form, Input, Button } from './style'
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
        showCancel:     PropTypes.bool,

        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func,
        onCancel:       PropTypes.func
    }

    static defaultProps = {
		value:			'',
        autoFocus:      false,
        placeholder:    t.s('defaultCollection-0'),
        showCancel:     false
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

		if (this.props.showCancel && (this.props.value||'').trim() == '')
			this.props.onCancel()
	}

	bindInputRef = (ref)=>this._input=ref

	render() {
		return (
			<Wrap>
				<Form>
					<Input 
						ref={this.bindInputRef}
						autoFocus={this.props.autoFocus}
						placeholder={this.props.placeholder}
						value={this.props.value}
						selectTextOnFocus={this.props.selectTextOnFocus}
						onChangeText={this.props.onChange}
						onSubmitEditing={this.props.onSubmit}
						onFocus={this.props.onFocus}
						onBlur={this.props.onBlur} />

					{this.props.showCancel || (this.props.value ? true : false) ? <ClearButton onPress={this.onClear} /> : null}
				</Form>
			</Wrap>
		)
	}
}