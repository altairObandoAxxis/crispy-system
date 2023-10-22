import React, { useState, useEffect } from 'react'
import { Card, Text, Icon, Button } from '@rneui/themed'
import { GetIncomePayments } from '../../commands/Policy';
import { RefreshControl, View, FlatList } from 'react-native'
import PaymentSummary from './PaymentSummary';

export const IncomePayments = ({ route }) => {
    const [ items, setItems ]= useState([]);
    const [ loading, setLoading] = useState(true);
    const [ summary, setSummary ] = useState({pending: 0, payed: 0 });
    const { params: { policyId, code, currency } } = route;
    const LoadItems = async () =>{
        try {
            setLoading(true);
            const newItems = (await GetIncomePayments(policyId)).sort((a,b)=> a.numberInYear - b.numberInYear);
            const { totalPending, totalPayed } = newItems.reduce(( sum, item) =>{
                sum.totalPending += Number(item.minimum || 0);
                sum.totalPayed   += Number(item.payed   || 0);
                return sum;
            },{totalPending: 0, totalPayed: 0 });
            
            setItems(newItems);
            setSummary( current => ({...current, pending: totalPending - totalPayed, payed: totalPayed }));
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        LoadItems();
    },[ policyId]);

    const RenderItem = (item)=> <Card key={item.id} containerStyle={{ borderRadius: 15 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
            <Text>{ item.concept }</Text>
            <Text>{ currency } { Number(item.minimum || 0 ).toLocaleString('en-us') }</Text>
        </View>
        <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
            <View>
                <Text style={{ color: 'gray'}}>Due date { new Date(item.dueDate).toLocaleDateString() }</Text>
                { item.payedDate && item.payedDate != null && <Text style={{ color: 'gray'}}>Pay date { new Date(item.payedDate).toLocaleDateString() }</Text>}
            </View>
            <Button type='clear'> <Icon type='antd' name='payment' color={ Number(item.payed) ? 'green': 'red'}/></Button>
        </View>
    </Card>

  return <View style={{ display:'flex'}}>
    <PaymentSummary totalPayed={ summary.payed } totalPending={ summary.pending } code={ code } currency={ currency } />
    <View style={{ maxHeight: 600 }}>
        <FlatList
                data={ items }
                keyExtractor={ item => item.id }
                renderItem={ ({item}) =>  RenderItem(item) }
                refreshControl={<RefreshControl onRefresh={ LoadItems } refreshing={loading} />}
                />
        </View>     
    </View>
}
