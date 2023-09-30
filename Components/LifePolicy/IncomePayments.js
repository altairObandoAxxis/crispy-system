import React, { useState, useEffect } from 'react'
import { ListItem, Card, Avatar, Icon } from '@rneui/themed'
import { GetIncomePayments } from '../../commands/Policy';
import { TouchableOpacity, ScrollView, RefreshControl, View, FlatList } from 'react-native'


const { Content, Title } = ListItem;

export const IncomePayments = ({ route }) => {
    const [ items, setItems ]= useState([]);
    const [ loading, setLoading] = useState(true);
    const [ summary, setSummary ] = useState({pending: 0, payed: 0 });
    const [ selected, setSelected ] = useState([]);
    const { params: { policyId } } = route;
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
    const today = new Date();
    const onItemSelected = item =>{
        if(selected.some(sel => sel.id == item.id)){
            setSelected( current => [...current.filter(i => i.id != item.id)]);
        }else{
            setSelected( current => [...current, item ]);
        }
    }

    const RenderItem = ({item}) => <ListItem bottomDivider Component={ TouchableOpacity } key={ item.id }>
            <Icon 
                name='calendar' 
                type='material-community'
                color={ item.payed > 0 ? 'green': new Date(item.dueDate) <= today? 'red': 'black' } />
            <Content>
                <Title>{ Number(item.minimum || 0 ).toLocaleString('en-us') }</Title>
                <ListItem.Subtitle> Concept { item.concept }</ListItem.Subtitle>
                <ListItem.Subtitle> Due date { new Date(item.dueDate).toLocaleDateString() } </ListItem.Subtitle>
            </Content>
            <ListItem.CheckBox 
                checked={ item.payed >0 || selected.some( sel => sel.id == item.id) }
                onPress={ ()=> { onItemSelected(item) }}
                 />
        </ListItem>
    

  return <View>
    <Card containerStyle={{ maxHeight: '15%'}}>
        <Card.Title>Pending Amount $ { summary.pending.toLocaleString() } </Card.Title>
    </Card>
    <Card containerStyle={{ maxHeight: '70%' }}>
        <FlatList 
         data={ items }
         keyExtractor={ item => item.id }
         renderItem={ RenderItem }
         refreshControl={<RefreshControl onRefresh={ LoadItems } refreshing={loading} />}
        />
    </Card>
    <Card containerStyle={{ maxHeight: 'auto' }} >
        <Card.Title> Payed Amount  </Card.Title>
    </Card>
    </View>
}
