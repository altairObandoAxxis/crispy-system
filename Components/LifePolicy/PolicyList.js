import React from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View, Platform } from 'react-native';
import { ButtonGroup, Divider, SearchBar } from '@rneui/themed';
import { doCmd } from '../../util/doCmd'
import { PolicyItem } from './PolicyItem';
import { UserContext } from '../../util/UserContext';
import { GetPolicies } from '../../commands/Policy';

const PolicyList = ({ navigation }) => {
    const [ loading, setLoading ] = React.useState(false);
    const [ refresh, setRefresh ] = React.useState(false);
    const [ index, setIndex ] = React.useState(0);
    const [ list, setList ] = React.useState([]);
    const [ page, setPage ] = React.useState();
    const [ noData, setNoData ] = React.useState(false);
    const [ search, updateSearch ] = React.useState('');
    const limit = 25;
    //  Get Contact Id
    const { state: { contact: { id } }} = React.useContext(UserContext);
    const onRefresh = React.useCallback(()=>{
        setRefresh(true);
        setPage(0);
        GetInitialData();
        setTimeout(() => {
            setRefresh(false)
        }, 2000);

    });

    const GetInitialData = async()=>{
        setLoading(true);
        setList([]);
        setNoData(false);
        try {
            let newFilter = index == 0 ? `holderId=${ id }` :
                            index == 1 ? `id in (SELECT lifePolicyId from Insured where contactId=${ id })` :
                            `id in (SELECT lifePolicyId from beneficiary where contactId=${ id })`;
            newFilter += ' AND active=1';
            if(search && search != null)
                newFilter += ` AND code LIKE '%${ search }%'`;

            const response = await GetPolicies(0, limit, newFilter);
            setList(response);
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
            let newFilter = index == 0 ? `holderId=${ id }` :
                            index == 1 ? `id in (SELECT lifePolicyId from insured where contactId=${ id })` :
                            `id in (SELECT lifePolicyId from beneficiary where contactId=${ id })`;
            newFilter += ' AND active=1';
            if(search && search != null)
                newFilter += ` AND code LIKE '%${ search }%'`;
            const response = await GetPolicies(newPage, limit, newFilter);

            if(response.length > 0){
                setPage(newPage);
                const newData = [...list, ...response ];
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
    }, [ index, id ]);

    // Configure Search
    React.useEffect(()=>{
        const updateQuery = setTimeout(() => {
            GetInitialData()
        }, 1500);
        return ()=> clearTimeout(updateQuery);
    },[ search ]);


    return <View style={{ flex: 1 }}>
        <SearchBar 
            placeholder='Type a policy code' 
            onChangeText={ newValue => updateSearch(newValue) } 
            value={ search }
            platform={ Platform.OS }/>
         <ButtonGroup
             buttons={['Policyholder', 'Insured', 'Beneficiary']}
             selectedIndex={ index }
             onPress={ value => setIndex(value) }
            />
        <Divider />
        <FlatList
            data={ list }
            keyExtractor={ item => item.id.toString() }
            renderItem={ ({ item }) => <PolicyItem  policy={ item } navigation={ navigation } /> }
            onEndReachedThreshold={0.1}
            onEndReached={ GetMorePolicies }
            refreshControl={ <RefreshControl onRefresh={ onRefresh } refreshing={ refresh }/> }
            ListFooterComponent={ ()=> { return (loading  && !refresh ? <ActivityIndicator color='rgb(0, 120, 212)' /> : null )}}
        />
    </View>
}

export default PolicyList