import { PricingCard, Text, lightColors } from '@rneui/themed'
import React from 'react'
import { ScrollView } from 'react-native';
import { formatNumber } from '../../commands/Dashboard';

export const Coverages = ({ navigation, route }) => {
    const { params: { Coverages, currency } } = route;
    const onCoveragePress =( coverageCode )=>{
        navigation.navigate('Claims', coverageCode );
    }

    return <ScrollView style={{ display: 'flex' }}>
        {
            (Coverages || []).length > 0 ? 
            Coverages.map( cov => <PricingCard 
                color={ lightColors.primary }
                info={[ `Coverage Code: ${ cov.code }` ,cov.basic ? 'Basic Coverage': 'Additional Coverage', `Insured sum: ${ formatNumber(cov.limit) }`]}
                key={ cov.id }
                title={ cov.name }
                price={ `${ currency } ${Number(cov.premium).toLocaleString('en-us')}`}
                button={{title:' Make a Claim', icon:'report-problem', color:'warning', onPress: ()=>{  onCoveragePress( cov.code ) }}}/>) : <Text> No Coverages Found </Text>
                
        }
    </ScrollView>
}
