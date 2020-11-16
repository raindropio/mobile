import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { mediumFade } from 'co/style/animation'
import { connect } from 'react-redux'
import { hideSection } from 'data/actions/config'
import { RectButton } from 'react-native-gesture-handler'

import { SectionView, SectionText } from 'co/style/section'
import { ButtonsWrap, Button } from 'co/navigation/header'

class FiltersItemsHeader extends React.Component {
    onSectionPress = ()=>{
        mediumFade()
        this.props.hideSection('filters', !this.props.hidden)
    }

    render() {
        const { hidden } = this.props

        return (
            <RectButton onPress={this.onSectionPress}>
                <SectionView>
                    <SectionText>{_.capitalize(t.s('fastFilter'))}</SectionText>
    
                    <ButtonsWrap>
                        {!!hidden && (
                            <Button 
                                icon='arrow-down-s'
                                color='text.secondary'
                                onPress={this.onSectionPress} />
                        )}
                    </ButtonsWrap>
                </SectionView>
            </RectButton>
        )
    }
}

export default connect(
	(state) => ({
        hidden: state.config.filters_hide
    }),
	{ hideSection }
)(FiltersItemsHeader)