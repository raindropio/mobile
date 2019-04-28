import React from 'react'
import {ScrollView, View} from 'react-native'
import {PagesView, PageIndicator, Wrap} from './style'
import _ from 'lodash-es'
import Items from './items'

export default class PickIcon extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
			selectedIndex: this.getSelectedIndex(props)
		}
	}

	getSelectedIndex = (props)=>{
		var selectedIndex = Object.keys(props.icons).findIndex((theme)=>theme==props.selectedTheme)
		if (selectedIndex<0) selectedIndex=0;
		return selectedIndex
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedIndex: this.getSelectedIndex(nextProps)})
	}

	onLayout = ({nativeEvent})=>{
		const width = nativeEvent.layout.width
		this.setState({width})

		this._view.scrollTo({y:0, x: width*this.state.selectedIndex, animated: false})
	}

	onScroll = ({nativeEvent})=>{
		const count = Object.keys(this.props.icons).length
		const x = nativeEvent.contentOffset.x
		const fullWidth = count*this.state.width;
		this.setState({selectedIndex: parseInt((x/fullWidth)*count)})
	}

	renderIcons = (ico, theme, index)=>{
		const 
			{cover_path, onSelect} = this.props,
			loading = (this.state.width==0)

		//placeholder
		if (index>this.state.selectedIndex+1 || index<this.state.selectedIndex-1 || loading)
			return <View key={theme} style={{flex:1,width:this.state.width}} />

		return <Items width={this.state.width} key={theme} items={ico} cover_path={cover_path} onSelect={onSelect} />
	}

	render() {
		const {icons} = this.props;
		var i=-1;

		return (
			<Wrap>
				<PagesView>
					{Object.keys(icons).map((i,index)=><PageIndicator key={index} active={this.state.selectedIndex==index} />)}
				</PagesView>

				<ScrollView ref={ref=>this._view=ref} onLayout={this.onLayout} onScroll={this.onScroll} horizontal={true} pagingEnabled={true} removeClippedSubviews={false}>
					{_.map(icons, (ico,theme)=>{i++;return this.renderIcons(ico,theme,i)})}
				</ScrollView>
			</Wrap>
		)
	}
}