import React from 'react'
import {  Card, Text } from '@rneui/themed'
import { View } from 'react-native'
const PaymentSummary = ({ totalPayed, totalPending, code, currency }) => {
  return <Card containerStyle={{ borderRadius: 10, shadowRadius: 10, marginBottom: 5 }}>
    <Card.Title style={{ textAlign: 'center'}} h3> { code } Overview</Card.Title>
    <Card.Divider />
    <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{ flexDirection:'column', padding: 10, gap: 15 }}>
            <Text style={{ color: 'red'}}>Pending Amount</Text>
            <Text style={{ color: 'red'}}> { currency } { totalPending.toLocaleString('en-us') }</Text>
        </View>
        <Card.Divider orientation='vertical'/>
        <View style={{ flexDirection:'column', padding: 10, gap: 15 }}>
            <Text style={{ color: 'green'}}>Payed Amount</Text>
            <Text style={{ color: 'green'}}> { currency } { totalPayed.toLocaleString('en-us')} </Text>
        </View>
    </View>
    </Card>
}

export default PaymentSummary