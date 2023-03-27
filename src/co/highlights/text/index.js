import { Wrap, Tick } from './style'

export default function HighlighText({ children, color, ...etc }) {
    return (
        <Wrap {...etc}>
            <Tick color={color} />
            {children}
        </Wrap>
    )
}