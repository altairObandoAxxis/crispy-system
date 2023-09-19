import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { GetDocuments } from '../../commands/Policy';
import { Icon, ListItem, lightColors } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import * as Sharing    from 'expo-sharing';
import { GetDocument } from '../../commands/Util';

const { Content, Title, Chevron } = ListItem;

export const Documents = ({ navigation, route })=>{
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const { params: { policyId } } = route;
    const LoadItems = async () =>{
        try {
            setLoading(true);
            const newItems = await GetDocuments(policyId);
            setItems(newItems);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        LoadItems();
    },[ policyId]);

    const onDocumentSelectedPress = async ( item ) => {
        setLoading(true);
        const fileUri = FileSystem.documentDirectory + `${ encodeURI(item.fileName )}.pdf`;
        const { outData:{ base64: pdf }} = await GetDocument(item.fileName + '.pdf');
       
        await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });
        await Sharing.shareAsync(fileUri);
        setLoading(false);
    }

    const RenderItem = item => <TouchableOpacity key={ item.id } onPress={ ()=> onDocumentSelectedPress( item ) }>
            <ListItem>
                <Icon name='home' type='antd' black />
                <Content>
                    <Title>{ item.name }</Title>
                </Content>
                <Chevron color={ item.response ? lightColors.success : lightColors.warning } />
            </ListItem>
        </TouchableOpacity>
  return <ScrollView  style={{ display: 'flex' }} refreshControl={ <RefreshControl  refreshing={ loading } onRefresh={ LoadItems }/>} >
    { items.map( item => RenderItem(item)) }
  </ScrollView>
}