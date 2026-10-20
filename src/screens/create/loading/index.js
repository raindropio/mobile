import { Backdrop, Text } from './style'
import { ActivityIndicator } from 'co/native'

export default function CreateLoading({ status }) {
    return (
        <Backdrop>
            <ActivityIndicator />
            <Text>{status == 'loading' || status == 'saving' ? 'Saving...' : 'Saved!'}</Text>
        </Backdrop>
    )
}