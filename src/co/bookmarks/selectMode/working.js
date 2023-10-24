import { Backdrop } from './working.style'
import { ActivityIndicator } from 'co/native'

export default function SelectModeWorking({ working }) {
    return (
        <Backdrop>
            <ActivityIndicator />
        </Backdrop>
    )
}