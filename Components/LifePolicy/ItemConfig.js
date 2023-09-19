import { AntDesign } from '@expo/vector-icons'

const ItemConfig = ( navigation ) =>([
    { key: 'coverages',    title: 'Coverages',       icon: <AntDesign name='CodeSandbox' color='black' size={24} />, onPress: ()=> navigation.navigate('Coverages')},
    { key: 'requirements', title: 'Requirements',    icon: <AntDesign name='warning'     color='black' size={24} />, onPress: ()=> navigation.navigate('Requirements')},
    { key: 'documents',    title: 'Documents',       icon: <AntDesign name='pdffile1'    color='black' size={24} />, onPress: ()=> navigation.navigate('Documents')},
    { key: 'payments',     title: 'Income Payments', icon: <AntDesign name='calendar'    color='black' size={24} />, onPress: ()=> navigation.navigate('Coverages')},
    { key: 'cancel',       title: 'Cancel',          icon: <AntDesign name='close'       color='red'   size={24} />, onPress: ()=> console.log('Action cancelled'), style:{ container:{ backgroundColor:'red'}, title: {color:'white'}}},
])


export default ItemConfig