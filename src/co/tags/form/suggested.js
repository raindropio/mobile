import React from 'react'
import t from 't'
import { Suggested } from './style'

export default class TagsFormTokens extends React.PureComponent {
	static defaultProps = {
		suggested: []
	}

	constructor(props){
		super(props)
		this.state = {
			show: false
		}
	}

	onSelectSuggestion = (name)=>()=>{
		this.props.onAppendTag(name)
	}

	renderSuggestion = ({name})=>(
		<Suggested.Item.Tap key={name} onPress={this.onSelectSuggestion(name)}>
			<Suggested.Item.Content>
				<Suggested.Item.Text>{name}</Suggested.Item.Text>
			</Suggested.Item.Content>
		</Suggested.Item.Tap>
	)

	componentDidMount() {
		setTimeout(()=>{
			this.setState({show:true});
		},500)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hide != this.props.hide && !nextProps.hide){
			this.setState({show: false});
			setTimeout(()=>{
				this.setState({show:true});
			},100)
		}
	}

	render() {
		if (!this.props.suggested.length || this.props.hide || !this.state.show)
			return null;

		return (
			<Suggested.Wrap>
				<Suggested.Content>
					<Suggested.Label.Wrap><Suggested.Label.Text>{t.s('suggested')}</Suggested.Label.Text></Suggested.Label.Wrap>
					{this.props.suggested.map(this.renderSuggestion)}
				</Suggested.Content>
			</Suggested.Wrap>
		)
	}
}