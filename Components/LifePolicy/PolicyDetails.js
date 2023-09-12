import React from 'react'
import { BottomSheet, ListItem } from '@rneui/themed'
import { UserContext } from '../../util/UserContext';

export const PolicyDetails = () => {
    const { state:{ policy }, setData } = React.useContext(UserContext);
    const onCancel = ()=> setData( current =>({...current, policy: null }));
  return <BottomSheet isVisible={ policy && policy != null } onBackdropPress={ onCancel }>
  <ListItem key='coverages'>
      <ListItem.Content>
          <ListItem.Title> Coverages </ListItem.Title>
      </ListItem.Content>
  </ListItem>
  <ListItem key='requirements'>
      <ListItem.Content>
          <ListItem.Title> Requirements </ListItem.Title>
      </ListItem.Content>
  </ListItem>
  <ListItem key='Documents'>
      <ListItem.Content>
          <ListItem.Title> Documents </ListItem.Title>
      </ListItem.Content>
  </ListItem>
  <ListItem key='payments'>
      <ListItem.Content>
          <ListItem.Title> Income Payments </ListItem.Title>
      </ListItem.Content>
  </ListItem>
  <ListItem key='Cancel' containerStyle={{ backgroundColor:'red'}} onPress={ onCancel }>
      <ListItem.Content>
          <ListItem.Title style={{ color: 'white' }}> Cancel </ListItem.Title>
      </ListItem.Content>
  </ListItem>
</BottomSheet>
}