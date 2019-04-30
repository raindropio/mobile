import React from 'react'
import PropTypes from 'prop-types'
import { SectionView, SectionText } from 'co/style/section'
import BasicSectionList from 'co/list/sections/basic'
import Goto from 'co/common/goto'

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
        if (this.props.filter && !item[section.item.title].toLowerCase().includes(this.props.filter))
            return null

        let action = ''
        if (section.item.action)
            if (typeof section.item.action == 'string')
                action = item[section.item.action]
            else
                action = section.item.action

        return (
            <Goto 
                label={item[section.item.title]}
                subLabel={section.item.description ? item[section.item.description] : undefined}
                action={action}
                onActionPress={(action && this.props.onActionPress) ? ()=>this.props.onActionPress(item, section) : null}
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
        const sections = this.props.sections.map(sec=>{
            return {
                ...sec,
                data: this.props[sec.id]
            }
        })

        return (
            <BasicSectionList 
                sections={sections}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                />
        )
    }
}