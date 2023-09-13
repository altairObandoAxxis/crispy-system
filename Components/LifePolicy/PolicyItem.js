import React from 'react'
import { Icon, ListItem } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import ItemConfig from './ItemConfig';
import { AntDesign } from '@expo/vector-icons';

const formatDate =(date)=> new Date(date).toISOString().split('T',1).pop();

const { Content, Title, Subtitle } = ListItem;
export const PolicyItem =(props)=> {
    const { showActionSheetWithOptions } = useActionSheet();
    const color = props.inactiveDate != null ?'red': props.activeDate != null ?'green': 'grey';
    const icon  = props.inactiveDate != null ?'heart-off': props.activeDate != null ?'heart': 'heart-off-outline';
    
    const onItemPress = ()=>{
        const options = ItemConfig().map(item => item.title);
        const destructiveButtonIndex = options.length - 1;
        const cancelButtonIndex = options.length - 1;
        showActionSheetWithOptions({
            options,
            icons: ItemConfig().map(item => item.icon),
            cancelButtonIndex,
            destructiveButtonIndex,
            useModal: true
          }, (selectedIndex ) => {
            switch (selectedIndex) {
              case 1:
                // Save
                break;
      
              case destructiveButtonIndex:
                // Delete
                break;
      
              case cancelButtonIndex:
                // Canceled
            }});
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