import React, { useState } from 'react'
import { PricingCard } from '@rneui/base';
import { RefreshControl, ScrollView } from 'react-native';
import { GetDashboarData } from '../../commands/Dashboard';
import { UserContext } from '../../util/UserContext';

const Dashboard = ({ navigation }) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);
    const { state: { contact: { id } }} = React.useContext(UserContext);

    const LoadDashboard = async ()=>{
      setLoading(true);
      const data = await GetDashboarData(id, navigation);
      setData(data);
      setLoading(false);
    }

    React.useEffect(()=>{
      LoadDashboard();
    },[]);

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