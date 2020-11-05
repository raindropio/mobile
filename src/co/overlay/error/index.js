import { Alert } from 'react-native'
import t from 't'

export function Error(error) {
    Alert.alert(
        t.s('error'),
        error.error && t.has('server'+error.error) ? t.s('server'+error.error) : error.message
    )
}