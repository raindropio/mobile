import React from 'react'
import PropTypes from 'prop-types'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { sectionHeight, SectionView, SectionText } from 'co/style/section'
import BasicSectionList from 'co/list/sections/basic'
import Goto from 'co/common/goto'
import { height as gotoHeight } from 'co/common/goto/style'

const emptySections = []

export default class TagsList extends React.Component {
    static propTypes = {
        onItemPress:    PropTypes.func,
        onActionPress:  PropTypes.func,
        
        sections:       PropTypes.arrayOf(
            PropTypes.shape({
                id:     PropTypes.string,
                title:  PropTypes.string,
                item:   PropTypes.shape({
                    title:          PropTypes.string, //key for title in item
                    description:    PropTypes.string, //same for description
                    action:         PropTypes.any //icon. if string - individual (like title), any other type means global for all of this type
                })
            })
        ),

        filter:         PropTypes.string
    }

    getItemLayout = sectionListGetItemLayout({
        getItemHeight: () => gotoHeight,
        getSectionHeaderHeight: () => sectionHeight,
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

        let action = ''
        if (originalSection.item.action)
            if (typeof originalSection.item.action == 'string')
                action = item[originalSection.item.action]
            else
                action = originalSection.item.action

        let iconComponent
        if (originalSection.item.iconComponent)
            if (typeof originalSection.item.iconComponent == 'string')
                iconComponent = item[originalSection.item.iconComponent]
            else
                iconComponent = originalSection.item.iconComponent

        return (
            <Goto 
                label={item[originalSection.item.title]}
                subLabel={originalSection.item.description ? item[originalSection.item.description] : undefined}
                action={action}
                iconComponent={iconComponent}
                onActionPress={(action && this.props.onActionPress) ? ()=>this.props.onActionPress(item, originalSection) : null}
                onPress={()=>this.props.onItemPress(item)} />
        )
    }

    renderSectionHeader = ({section})=>(
		<SectionView>
            <SectionText>{section.title}</SectionText>
        </SectionView>
    )
    
    keyExtractor = ({name})=>name

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
                    return item[sec.item.title].toLowerCase().includes(this.props.filter)
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
                updateCellsBatchingPeriod={500}
                />
        )
    }
}