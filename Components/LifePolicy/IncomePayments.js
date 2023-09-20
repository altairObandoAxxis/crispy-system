import React, { useState, useEffect } from 'react'
import { Text, ListItem, Icon } from '@rneui/themed'
import { GetIncomePayments } from '../../commands/Policy';
import { TouchableOpacity, ScrollView, RefreshControl, View } from 'react-native'


const { Content, Title } = ListItem;

export const IncomePayments = ({ route }) => {
    const [ items, setItems ]= useState([]);
    const [ loading, setLoading] = useState(true);
    const { params: { policyId } } = route;
    const LoadItems = async () =>{
        try {
            setLoading(true);
            const newItems = await GetIncomePayments(policyId);
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
            <Content>
                <Title>{ Number(item.minimum || 0 ).toLocaleString('en-us') }</Title>
                <ListItem.Subtitle> { item.concept }</ListItem.Subtitle>
            </Content>
        </ListItem>
    </TouchableOpacity>

  return <ScrollView  style={{ display: 'flex' }} refreshControl={ <RefreshControl  refreshing={ loading } onRefresh={ LoadItems }/>} >
        { items.map( item => RenderItem(item)) }
    </ScrollView>
}
