import React from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { ButtonGroup, Divider, Text } from '@rneui/themed';
import { doCmd } from '../../util/doCmd'
import { PolicyItem } from './PolicyItem';
import { UserContext } from '../../util/UserContext';

const PolicyList = () => {
    const [ loading, setLoading ] = React.useState(false);
    const [ refresh, setRefresh ] = React.useState(false);
    const [ index, setIndex ] = React.useState(0);
    const [ list, setList ] = React.useState([]);
    const [ page, setPage ] = React.useState();
    const [ noData, setNoData ] = React.useState(false);
    const limit = 20;
    //  Get Contact Id
    const { state: { contact: { id }}} = React.useContext(UserContext)
    const onRefresh = React.useCallback(()=>{
        setRefresh(true);
        setPage(0);
        GetInitialData();
        setTimeout(() => {
            setRefresh(false)
        }, 2000);

    })
    const GetInitialData = async()=>{
        setLoading(true);
        setList([]);
        setNoData(false);
        try {
            const newFilter = index == 0 ? `holderId=${ id }` :
                              index == 1 ? `id in (SELECT lifePolicyId from Insured where contactId=${ id })` :
                              `id in (SELECT lifePolicyId from beneficiary where contactId=${ id })`;
            const response = await doCmd({ cmd:'RepoLifePolicy', data:{ operation:'GET',page: 0, size: limit, filter: newFilter, noTracking: true,include:['Insureds'] }});
            setList(response.outData);
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    }

    const GetMorePolicies = async ()=>{
        if(noData)
            return;

        try {
            setLoading(true);
            const newPage = page + 1;
            const newFilter = index == 0 ? `holderId=${ id }` :
                              index == 1 ? `id in (SELECT lifePolicyId from insured where contactId=${ id })` :
                              `id in (SELECT lifePolicyId from beneficiary where contactId=${ id })`;
            const response = await doCmd({ cmd:'RepoLifePolicy', data:{ operation:'GET', page: newPage, size: limit, filter: newFilter, noTracking: true, include:['Insureds'] }});

            if(response.outData.length > 0){
                setPage(newPage);
                const newData = [...list, ...response.outData ];
                setList(newData);
            }else{
                setNoData(true);
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    }
    // Configure Filter
    React.useEffect(()=>{
        GetInitialData();
        setPage(0);
    }, [ index ]);

    return <View style={{ flex: 1 }}>
        <Text h5 >Search by: </Text>
         <ButtonGroup
             buttons={['Policyholder', 'Insured', 'Beneficiary']}
             selectedIndex={ index }
             onPress={ value => setIndex(value) }
            />
        <Divider />
        <FlatList
            data={ list }
            keyExtractor={ item => item.id.toString() }
            renderItem={ ({ item }) => <PolicyItem { ...item } /> }
            onEndReachedThreshold={0.1}
            onEndReached={ GetMorePolicies }
            refreshControl={ <RefreshControl onRefresh={ onRefresh } refreshing={ refresh }/> }
            ListFooterComponent={ ()=> { return (loading ? <ActivityIndicator color='rgb(0, 120, 212)' /> : null )}}
        />
    </View>
}

export default PolicyList