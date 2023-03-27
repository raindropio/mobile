import { Component } from 'react';
import t from 't'
import { mediumFade } from 'co/style/animation'
import { connect } from 'react-redux'
import { hideSection } from 'data/actions/config'
import { RectButton } from 'react-native-gesture-handler'

import { SectionView, SectionText } from 'co/style/section'
import Button from 'co/button'

class TagsItemsHeader extends Component {
    onSectionPress = ()=>{
        mediumFade()
        this.props.hideSection('tags', !this.props.hidden)
    }

    render() {
        const { hidden } = this.props

        return (
            <RectButton onPress={this.onSectionPress}>
                <SectionView>
                    <SectionText>{t.s('tags')}</SectionText>
    
                    {!!hidden && (
                        <Button 
                            icon='arrow-down-s'
                            color='text.secondary'
                            onPress={this.onSectionPress} />
                    )}
                </SectionView>
            </RectButton>
        )
    }
}

export default connect(
	(state, { hidden }) => ({
        hidden: typeof hidden != 'undefined' ? hidden : state.config.tags_hide
    }),
	{ hideSection }
)(TagsItemsHeader)