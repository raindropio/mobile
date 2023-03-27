import t from 't'
import { SectionText } from 'co/style/section'
import { ShortDate } from 'modules/format/date'

export default function({ item: { created }, status }) {
    if (status != 'loaded' &&
        status != 'removed')
        return null

    return (
        <SectionText center>
            {t.s('addSuccess')} <ShortDate date={created} />
        </SectionText>
    )
}