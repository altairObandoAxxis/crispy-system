import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { GetRequirements } from '../../commands/Policy';
import { Icon, ListItem, lightColors } from '@rneui/themed';

const { Content, Subtitle, Title, Chevron } = ListItem;

export const Requirements = ({ navigation, route }) => {
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const { params: { policyId } } = route;
    const LoadItems = async () =>{
        try {
            setLoading(true);
            const newItems = await GetRequirements(policyId);
            setItems(newItems);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        LoadItems();
    },[ policyId]);

    const RenderItem = item => <TouchableOpacity key={ item.id }>
        <ListItem>
            <Icon name={ item.response ? 'check-circle' : 'warning'  } type='antd' color='grey' />
            <Content>
                <Title>{ item.name }</Title>
                <Subtitle>{ item.code }</Subtitle>
            </Content>
            <Chevron color={ item.response ? lightColors.success : lightColors.warning } />
        </ListItem>
    </TouchableOpacity>
  return <ScrollView  style={{ display: 'flex' }} refreshControl={ <RefreshControl  refreshing={ loading } onRefresh={ LoadItems }/>} >
    { items.map( item => RenderItem(item)) }

  </ScrollView>
}