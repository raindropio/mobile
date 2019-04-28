import t from 't'
import React from 'react'
import { Tokens, Input } from './style'

export default class TagsFormTokens extends React.PureComponent {
    static defaultProps = {
        items:      [],
        onChange:   null
    }

    state = {
        focusedTag: '',
        newTag:     ''
    }

	componentDidUpdate(prevProps) {
		if (prevProps.items != this.props.items)
			this.setState({focusedTag:''})
	}

	onSelectToken = (focusedTag)=>()=>{
		clearTimeout(this.selectTokenTimeout)

        if (this.state.focusedTag == focusedTag)
            return this.props.onChange(this.props.items.filter(name=>name!=focusedTag))

		this.setState({focusedTag})
		this.selectTokenTimeout = setTimeout(()=>this.setState({focusedTag:''}), 2000)
	}

	onSelectLastToken = ()=>{
		if (!this.props.items.length)
			return;

		this.onSelectToken(this.props.items[this.props.items.length-1])()
	}

	renderItem = (name)=>{
		const active = name==this.state.focusedTag
		return (
			<Tokens.Item.Tap key={name} onPress={this.onSelectToken(name)}>
				<Tokens.Item.Content active={active}>
					<Tokens.Item.Text active={active}>{name+(!active ? ',' : '')}</Tokens.Item.Text>

					{active && <Tokens.Item.Clear source={require('assets/images/closeSmall.png')} />}
				</Tokens.Item.Content>
			</Tokens.Item.Tap>
		)
    }
    

    onChangeText = (newTag)=>
        this.setState({newTag})

    onSubmitText = ()=>{
        if (this.state.newTag){
			this.props.onChange([...this.props.items, this.state.newTag])
			this.setState({newTag: ''})
		}
    }

    onKeyPress = ({nativeEvent})=>{
		if (nativeEvent.key=='Backspace' && !this.state.newTag)
			this.onSelectLastToken()
	}

	render() {
		return (
			<Tokens.Wrap>
				{this.props.items.map(this.renderItem)}
				
                <Input.Wrap>
                    <Input.Input
                        value={this.state.newTag}
                        autoFocus
                        placeholder={t.s('addTags')+'...'}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitText}
                        onKeyPress={this.onKeyPress}
                        />
                </Input.Wrap>
			</Tokens.Wrap>
		)
	}
}