import React, { useEffect } from 'react';
import { GetDocument } from '../../commands/Util';
import { Alert, ScrollView, RefreshControl } from 'react-native';

export const DocumentViewer = ({ navigation, route })=>{
    const fileName = route?.params?.fileName ?? undefined;
    const [ loading , setLoading ] = React.useState(true);
    const [ base64,   setBase64 ] = React.useState(null);
    const LoadFile = async () => {
        setLoading(true);
        try {
            const response = await GetDocument(fileName);
            if(!response.ok){
                Alert.alert('Error', 'Document not found');
                return;
            }
            const { outData:{ base64: file } } = response;
            setBase64(file);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        LoadFile();
    }, [ fileName ]);
    return <ScrollView style={{ display: 'flex'}} refreshControl={ <RefreshControl refreshing={ loading } onRefresh={ LoadFile } />} >
        {/* <Pdf 
            source={{ uri: 'data:application/pdf;base64,' + base64, cache: true }} /> */}
    </ScrollView>

}