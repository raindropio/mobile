import { Component } from 'react';
import PropTypes from 'prop-types'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { SectionView, SectionText } from 'co/style/section'
import BasicSectionList from 'co/list/sections/basic'
import Goto from 'co/goto'
import size from 'modules/appearance/size'

const emptySections = []

export default class TagsList extends Component {
    static propTypes = {
        onItemPress:    PropTypes.func,
        onActionPress:  PropTypes.func,

        sections:       PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.string,
                title:              PropTypes.string,
                getItemAttribute:   PropTypes.func, //(item, section, key)
            })
        ),

        filter:         PropTypes.string
    }

    getItemLayout = sectionListGetItemLayout({
        getItemHeight: () => size.height.item,
        getSectionHeaderHeight: () => size.height.item,
    })

    shouldComponentUpdate(nextProps){
        if (this.props.sections != nextProps.sections)
            return true

        if (this.props.filter != nextProps.filter)
            return true

        for(var i in this.props.sections)
            if (this.props[this.props.sections[i].id] != nextProps[this.props.sections[i].id])
                return true

        return false
    }

    renderItem = ({item, section})=>{
        const originalSection = this.props.sections[section.index]
        const action = originalSection.getItemAttribute(item, 'action')

        return (
            <Goto last
                label={originalSection.getItemAttribute(item, 'title')}
                subLabel={originalSection.getItemAttribute(item, 'description')}
                action={action}
                icon={originalSection.getItemAttribute(item, 'icon')}
                onActionPress={(action && this.props.onActionPress) ? ()=>this.props.onActionPress(item, originalSection) : null}
                onPress={()=>this.props.onItemPress(item, originalSection)} />
        )
    }

    renderSectionHeader = ({section})=>(
		<SectionView>
            <SectionText>{section.title}</SectionText>
        </SectionView>
    )

    keyExtractor = ({name, _id})=>name||_id

    render() {
        let sections = null

        for(var i in this.props.sections){
            const sec = this.props.sections[i]

            const clean = {
                index: i,
                id: sec.id,
                title: sec.title,
                data: this.props[sec.id] || []
            }

            if (this.props.filter)
                clean.data = clean.data.filter(item=>{
                    return sec.getItemAttribute(item, 'title').toLowerCase().includes(this.props.filter)
                })

            if (clean.data.length){
                if (!sections)
                    sections = []

                sections.push(clean)
            }
        }

        return (
            <BasicSectionList 
                sections={sections || emptySections}
                keyExtractor={this.keyExtractor}
                getItemLayout={this.getItemLayout}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                ListEmptyComponent={this.props.ListEmptyComponent}

                keyboardDismissMode={this.props.keyboardDismissMode}
                />
        )
    }
}