import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import DocumentPicker from 'react-native-document-picker'
import Goto from 'co/common/goto'

export default class AddFile extends React.PureComponent {
    onPress = async ()=>{
        let files = []
        try{
            files = await DocumentPicker.pickMultiple({
                type: [
                    DocumentPicker.types.images,
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.plainText,
                    DocumentPicker.types.video,
                    ...Platform.select({
                        ios: ['com.microsoft.word.doc', 'com.microsoft.excel.xls', 'com.microsoft.powerpoint.​ppt', 'org.openxmlformats.wordprocessingml.document', 'org.openxmlformats.spreadsheetml.sheet', 'org.openxmlformats.presentationml.presentation', 'org.openxmlformats.presentationml.slideshow'],
                        android: ['application/*']//doc,etc...
                    })
                ],
            })
        }catch(e){}

        if (!files.length)
            return

        Navigation.replace(this.props, 'bookmark/add/save', {
            values: files.map(({name, uri, type})=>({
                uri,
                name,
                type
            })),
            type: 'file',
            collectionId: this.props.collectionId
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon={require('assets/images/document.png')}
                label={t.s('add')+' '+t.s('file').toLowerCase()}
                subLabel='PDF, Office, Video'
                onPress={this.onPress} />
        )
    }
}