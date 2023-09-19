import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native';
import { PricingCard, Text, lightColors } from '@rneui/themed'
import { formatNumber } from '../../commands/Dashboard';
import { GetCoverages } from '../../commands/Policy';

export const Coverages = ({ navigation, route }) => {
    const [ Coverages, setCoverages ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const { params: { policyId, currency } } = route;
    const onCoveragePress =( coverageCode )=>{
        navigation.navigate('Claims', coverageCode );
    }

    async function FetchCoverages(){
        try {
            setLoading(true);
            const newCoverages = await GetCoverages(policyId);
            setCoverages(newCoverages);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(!policyId)
            return;
        FetchCoverages();
        
    }, [policyId] );

    return <ScrollView style={{ display: 'flex' }} refreshControl={ <RefreshControl onRefresh={ FetchCoverages } refreshing={ loading } /> }>
        {
            Coverages.map( cov => <PricingCard 
                color={ lightColors.primary }
                info={[ `Coverage Code: ${ cov.code }` ,cov.basic ? 'Basic Coverage': 'Additional Coverage', `Insured sum: ${ formatNumber(cov.limit) }`]}
                key={ cov.id }
                title={ cov.name }
                price={ `${ currency } ${Number(cov.basePremium).toLocaleString('en-us')}`}
                button={{title:' Make a Claim', icon:'report-problem', color:'warning', onPress: ()=>{  onCoveragePress( cov.code ) }}}/>) 
        }
    </ScrollView>
}
