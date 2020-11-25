import t from 't'
import _ from 'lodash-es'
import React from 'react'
import { LayoutAnimation } from 'react-native'
import { ButtonLink, ButtonIcon } from 'co/common/button'
import { Wrap, Body, Toolbar, Backdrop, Loading, Title } from './style'

export default class SaveView extends React.PureComponent {
    closeButton = (
        <ButtonIcon 
            name='close'
            color='background.regular' 
            onPress={this.props.onClose} />
    )

    componentDidUpdate(prevProps) {
		if (this.props.status != prevProps.status)
			LayoutAnimation.easeInEaseOut()
	}

    render() {
        const {item, status, message, collection, onAddTags, onToggleImportant, onEdit, onClose, onTryAgain} = this.props

        let content = null, dismissEnabled = true, showBody = true
    
        switch(status){
            case 'error': 
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Title>{message||t.s('error')}</Title>
                        {/*<ButtonLink white onPress={onTryAgain}>{t.s('tryAgain')}</ButtonLink>*/}
                        {this.closeButton}
                    </Toolbar>
                )
            break;
    
            case 'new':
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
                            <ButtonIcon key='addTags' name='hashtag' color='background.regular' onPress={onAddTags} />,
                            <ButtonIcon key={'important'+item.important} name='heart-3' variant={item.important ? 'fill' : 'line'} color='background.regular' onPress={onToggleImportant} />,
                            <ButtonIcon key='edit' name='edit-box' color='background.regular' onPress={onEdit} />
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
    
                <Body show={showBody}>
                    {content}
                </Body>
            </Wrap>
        )
    }
}