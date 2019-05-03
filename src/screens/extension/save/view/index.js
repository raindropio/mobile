import t from 't'
import _ from 'lodash'
import React from 'react'
import { LayoutAnimation } from 'react-native'
import { ButtonLink, ButtonIcon } from 'co/common/button'
import { Wrap, Body, Toolbar, Backdrop, Loading, Title, Icon } from './style'

const
	star = require('assets/images/star.png'),
	starFilled = require('assets/images/starFilled.png'),
	addTags = require('assets/images/addTags.png'),
    edit = require('assets/images/edit.png')

export default class SaveView extends React.PureComponent {
    closeButton = <ButtonIcon white source={require('assets/images/closeCircle.png')} onPress={this.props.onClose} style={{opacity: 0.8}} />

    componentDidUpdate(prevProps) {
		if (this.props.status != prevProps.status || this.props.collection.color != prevProps.collection.color)
			LayoutAnimation.easeInEaseOut()
	}

    render() {
        const {item, status, collection, onAddTags, onToggleImportant, onEdit, onClose, onTryAgain} = this.props

        let content = null, dismissEnabled = true, showBody = true
    
        switch(status){
            case 'error': 
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Title>{t.s('error')}</Title>
                        <ButtonLink white onPress={onTryAgain}>{t.s('tryAgain')}</ButtonLink>
                        {this.closeButton}
                    </Toolbar>
                )
            break;
    
            case 'notFound':
                showBody = false;
            break;

            case 'loading':
            case 'saving':
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Loading color="white" />
                        <Title>Saving to {collection.title}...</Title>
                        <ButtonLink white onPress={onClose}>{t.s('cancel')}</ButtonLink>
                    </Toolbar>
                )
            break;
            
            case 'removed':
            case 'loaded':
                content = (
                    <Toolbar>
                        <Title>{_.capitalize(t.s('saved'))}</Title>
                        {item ? [
                            <ButtonIcon key='addTags' white source={addTags} onPress={onAddTags} />,
                            <ButtonIcon key={'important'+item.important} white source={item.important ? starFilled : star} onPress={onToggleImportant} />,
                            <ButtonIcon key='edit' white source={edit} onPress={onEdit} />
                        ] : null}
                        {this.closeButton}
                    </Toolbar>
                )
            break;
        }
    
        return (
            <Wrap>
                <Backdrop.Touch onPressIn={dismissEnabled ? onClose : undefined}>
                    <Backdrop.View />
                </Backdrop.Touch>
    
                <Body color={collection.color} show={showBody}>
                    {content}
                </Body>
            </Wrap>
        )
    }
}