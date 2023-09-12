import React, { useState } from 'react'
import { PricingCard } from '@rneui/base';
import { RefreshControl, ScrollView } from 'react-native';
import { GetDashboarData } from '../../commands/Dashboard';
import { UserContext } from '../../util/UserContext';

const Dashboard = ({ navigation }) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);
    const { state: { contact: { id } }, setData: setUserData } = React.useContext(UserContext);

    const LoadDashboard = async ()=>{
      setLoading(true);
      const data = await GetDashboarData(id, navigation);
      setData(data);
      setLoading(false);
    }

    React.useEffect(()=>{
      LoadDashboard();
    },[]);

    React.useEffect(()=>{
      if(data.length > 0)
        setUserData( current => ({...current, totalPolicy: data[0].total, totalPayments: data[1].total, totalClaims: data[2].total }) )
    },[ data ])

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