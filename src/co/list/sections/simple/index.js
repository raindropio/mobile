import PropTypes from 'prop-types'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { SectionView, SectionText } from 'co/style/section'
import BasicSectionList from 'co/list/sections/basic'
import Goto from 'co/goto'
import size from 'modules/appearance/size'

const emptySections = []

const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => size.height.item,
    getSectionHeaderHeight: () => size.height.item,
})

const keyExtractor = ({name, _id})=>name||_id

const renderSectionHeader = ({section})=>(
    <SectionView>
        <SectionText>{section.title}</SectionText>
    </SectionView>
)

export default function SimpleSections(props) {
    const { onItemPress, onActionPress, filter, ListEmptyComponent, keyboardDismissMode } = props

    const renderItem = ({item, section})=>{
        const originalSection = props.sections[section.index]
        const action = originalSection.getItemAttribute(item, 'action')

        return (
            <Goto last
                label={originalSection.getItemAttribute(item, 'title')}
                subLabel={originalSection.getItemAttribute(item, 'description')}
                action={action}
                icon={originalSection.getItemAttribute(item, 'icon')}
                onActionPress={(action && onActionPress) ? ()=>onActionPress(item, originalSection) : null}
                onPress={()=>onItemPress(item, originalSection)} />
        )
    }

    let sections = null

    for(var i in props.sections){
        const sec = props.sections[i]

        const clean = {
            index: i,
            id: sec.id,
            title: sec.title,
            data: props[sec.id] || []
        }

        if (filter)
            clean.data = clean.data.filter(item=>{
                return sec.getItemAttribute(item, 'title').toLowerCase().includes(filter)
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
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={ListEmptyComponent}

            keyboardDismissMode={keyboardDismissMode}
            />
    )
}

SimpleSections.propTypes = {
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