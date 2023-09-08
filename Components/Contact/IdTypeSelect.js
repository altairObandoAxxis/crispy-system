import React from 'react'
import { doCmd } from '../../util/doCmd';
import { Dropdown } from 'react-native-element-dropdown';

const IdTypeSelect = ({ callBack }) => {
    const [ data, setData ] = React.useState();
    const [ value, setValue ]= React.useState(null);

    // Get Id Types from org
    React.useEffect(()=>{
        const loadIdTypes = async()=>{
            const RepoIdTypeCatalog = await doCmd({cmd:'RepoIdTypeCatalog', data:{ operation: 'GET'}});
            setData(RepoIdTypeCatalog.outData);
        }
        loadIdTypes();
    });

    const onSelectionChange = ( item )=>{
        setValue(item.value);
        if(typeof callBack =='function')
            callBack(item.value);
    }

  return <Dropdown 
    data={ data }
    placeholder="Select item"
    searchPlaceholder="Search..."
    search
    labelField='name'
    valueField='code'
    onChange={ onSelectionChange }
    value={ value }/>
}

export default IdTypeSelect