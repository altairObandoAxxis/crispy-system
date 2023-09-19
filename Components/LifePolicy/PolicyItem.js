import React from 'react'
import { Icon, ListItem } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { PolicyItemDetails } from './PolicyItemDetails';

const formatDate =(date)=> new Date(date).toISOString().split('T',1).pop();

const { Content, Title, Subtitle } = ListItem;
export const PolicyItem =({ policy, navigation })=> {
    const { showActionSheetWithOptions } = useActionSheet();
    const color = policy.inactiveDate != null ?'red': policy.activeDate != null ?'green': 'grey';
    const icon  = policy.inactiveDate != null ?'heart-off': policy.activeDate != null ?'heart': 'heart-off-outline';
    
    const onItemPress = ( )=> PolicyItemDetails({ showActionSheetWithOptions, policy, navigation });
    
    return <TouchableOpacity onPress={ onItemPress } >
        <ListItem key={ policy.id } bottomDivider>
            <Icon name={ icon } type='material-community' color={ color } />
            <Content>
                <Title> { policy.id  + ' -  '+ policy.code } </Title>
                <Subtitle>{`${ policy?.MainInsured?.name ?? policy.Holder.FullName }  - ${ formatDate(policy.start)} to ${formatDate(policy.end)}`}</Subtitle>
            </Content>
        </ListItem>
    </TouchableOpacity>
}