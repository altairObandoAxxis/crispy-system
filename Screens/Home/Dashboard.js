import React, { useState } from 'react'
import { PricingCard } from '@rneui/base';
import { RefreshControl, ScrollView } from 'react-native';
import { GetDashboarData } from '../../commands/Dashboard';
import { UserContext } from '../../util/UserContext';

const Dashboard = ({ navigation }) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);
    const { state, setData: setUserData } = React.useContext(UserContext);

    const LoadDashboard = async ()=>{
      const contactId = state?.contact?.id ?? 0;
      if(contactId == 0)
        return;
      setLoading(true);
      const data = await GetDashboarData(contactId, navigation);
      if(data.length === 0)
        return;
      const [ totalPolicy, totalPayments, totalClaims ] = data;
      setUserData( current => ({...current, totalPolicy, totalPayments, totalClaims }) );
      setData(data);
      setLoading(false);
    }

    React.useEffect(()=>{
      LoadDashboard();
    },[ state?.contact?.id ?? false ]);
    return <ScrollView refreshControl={ <RefreshControl refreshing={ loading } onRefresh={ LoadDashboard }  />  } >
      {data.map( (item, index ) => <PricingCard 
      key={index} 
      title={ item.title }
      color={ item.color }
      price={ item.price }
      info ={ item.info  }
      button={ item.button }
      onButtonPress={ item.onButtonPress }
      />)}
    </ScrollView>
}

export default Dashboard