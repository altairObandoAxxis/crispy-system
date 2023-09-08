import React from 'react'

const CountrySelect = ({ callBack }) => {
    const [ data, setData ] = React.useState();
    const [ value, setValue ]= React.useState(null);

    // Get Id Types from org
    React.useEffect(()=>{
        const loadIdTypes = async()=>{
            const RepoCountryCatalog = await doCmd({cmd:'RepoCountryCatalog', data:{ operation: 'GET' }});
            setData(RepoCountryCatalog.outData);
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

export default CountrySelect