import { Wrap, Button } from './style'

export default function Segmented({ selectedIndex=-1, values=[], onChange }) {
    return (
        <Wrap>
            {values.map((title, index)=>(
                <Button 
                    key={title}
                    onPress={()=>onChange(index)}
                    background={selectedIndex==index ? 'color.accent' : undefined}
                    title={title} />
            ))}
        </Wrap>
    )
}