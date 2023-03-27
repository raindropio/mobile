import { Info, Wrap, Message } from './style'
import Icon from 'co/icon'

export default ({ message, icon='information', children })=>(
    <Info>
        <Wrap>
            <Icon name={icon} variant='fill' color='info' />
            <Message>{message}</Message>
        </Wrap>

        {children}
    </Info>
)