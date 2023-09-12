import React from 'react'
import { Icon, ListItem } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { UserContext } from '../../util/UserContext';

const formatDate =(date)=> new Date(date).toISOString().split('T',1).pop();

const { Content, Title, Subtitle } = ListItem;
export const PolicyItem =(props)=> {
    const color = props.inactiveDate != null ?'red': props.activeDate != null ?'green': 'grey';
    const icon  = props.inactiveDate != null ?'heart-off': props.activeDate != null ?'heart': 'heart-off-outline';
    const { setData } = React.useContext(UserContext);

    const onItemPress = ()=>{
        setData( current => ({...current, policy: props }));
    }    
    return <TouchableOpacity onPress={ onItemPress } >
        <ListItem key={ props.id } bottomDivider>
            <Icon name={ icon } type='material-community' color={ color } />
            <Content>
                <Title> { props.code } </Title>
                <Subtitle>{`${ props.MainInsured.name }  - ${ formatDate(props.start)} to ${formatDate(props.end)}`}</Subtitle>
            </Content>
        </ListItem>
    </TouchableOpacity>
}