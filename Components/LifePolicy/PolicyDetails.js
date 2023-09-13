import React from 'react'
import { BottomSheet, ListItem } from '@rneui/themed'
import { UserContext } from '../../util/UserContext';
import ItemConfig from './ItemConfig';
import { TouchableOpacity } from 'react-native';

export const PolicyDetails = () => {
    const { state:{ policy }, setData } = React.useContext(UserContext);
    const onCancel = ()=> setData( current =>({...current, policy: null }));
  return <BottomSheet isVisible={ policy && policy != null } onBackdropPress={ onCancel }>
    {
        ItemConfig().map( item => <TouchableOpacity key={ item.key } onPress={ onCancel }>
            <ListItem containerStyle={ item?.style?.container ?? undefined } bottomDivider>
                { item.icon }
                <ListItem.Content>
                    <ListItem.Title style={ item?.style?.title ?? undefined }> { item.title } </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>)
    }
</BottomSheet>
}