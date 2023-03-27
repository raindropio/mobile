import { Warning, Wrap, Message } from './style'
import Icon from 'co/icon'

export default ({ message, icon='alert', children })=>(
    <Warning>
        <Wrap>
            <Icon name={icon} variant='fill' color='warning' />
            <Message>{message}</Message>
        </Wrap>
        
        {children}
    </Warning>
)