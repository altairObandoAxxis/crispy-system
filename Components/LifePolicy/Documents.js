import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { GetDocuments } from '../../commands/Policy';
import { Icon, ListItem, lightColors } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import * as Sharing    from 'expo-sharing';
import { GetDocument } from '../../commands/Util';
import * as Intent from 'expo-intent-launcher';

const { Content, Title } = ListItem;

export const Documents = ({ route })=>{
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
        if(loading) return;
        setLoading(true);
        try {
            const fileUri = FileSystem.documentDirectory + `${ encodeURI(item.fileName )}.pdf`;
            const { outData:{ base64: pdf }} = await GetDocument(item.fileName + '.pdf');
            if ( !pdf ){
                Alert.alert('Not found', ' Error getting document');
                return;
            }
            await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });
            if(Platform.OS == 'ios')
                await Sharing.shareAsync(fileUri);
            else{
                const contentUri = await FileSystem.getContentUriAsync(fileUri);
                await Intent.startActivityAsync('android.intent.action.VIEW',{
                    data: contentUri,
                    type : 'application/pdf',
                    flags: 1,
                });
            }
        } catch (error) {
            Alert.alert('Error', JSON.stringify(error));
        }finally{
            setLoading(false);
        }
       
    }

    const RenderItem = item => <TouchableOpacity key={ item.id } onPress={ ()=> onDocumentSelectedPress( item ) }>
            <ListItem>
                <Icon name='home' type='antd' black />
                <Content>
                    <Title>{ item.name }</Title>
                </Content>
            </ListItem>
        </TouchableOpacity>
  return <ScrollView  style={{ display: 'flex' }} refreshControl={ <RefreshControl  refreshing={ loading } onRefresh={ LoadItems }/>} >
    { items.map( item => RenderItem(item)) }
  </ScrollView>
}