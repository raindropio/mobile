import React from 'react'
import SectionList from 'co/list/sections/basic'
import { SectionView, SectionText } from 'co/style/section'
import Icons from './icons'
import { iconSize } from './style'

let widthCache = 0
let columnsCache = 2

export default class PickIcon extends React.PureComponent {
	state = {
        width: widthCache,
        columns: columnsCache
	}

    _bindRef = r=>this._scroll=r
    
	onLayout = ({nativeEvent})=>{
        widthCache = nativeEvent.layout.width
        columnsCache = parseInt(widthCache/iconSize)
        columnsCache = columnsCache<2 ? 2 : columnsCache

		this.setState({
            width: widthCache,
            columns: columnsCache
        })
	}

    keyExtractor(item) {
        return item
    }
    
    renderSectionHeader = ({section})=>{
        const { items } = this.props
        const index = section.data[0]
        return <SectionView><SectionText>{items[index].title}</SectionText></SectionView>
    }

	renderIcons = ({ item })=>{
		if (this.state.width==0)
            return null
            
        const { items, onSelect } = this.props
		return <Icons {...items[item]} onSelect={onSelect} {...this.state} />
	}

	render() {
		return (
            <SectionList 
                ref={this._bindRef}
                sections={this.props.items.map((item,index)=>({ data: [index] }))}
                renderItem={this.renderIcons}
                renderSectionHeader={this.renderSectionHeader}
                keyExtractor={this.keyExtractor}
                onLayout={this.onLayout} />
		)
	}
}