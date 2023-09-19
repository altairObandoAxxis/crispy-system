import { Skeleton } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'


export const ListSkeleton = () => {
  return <View style={{ display: 'flex', flexDirection: 'column',gap: 15,alignContent:'center', padding: 15 }}>
    <Skeleton animation='pulse' height={ 150 }/>
    <Skeleton animation='pulse' height={ 150 }/>
    <Skeleton animation='pulse' height={ 150 }/>
    <Skeleton animation='pulse' height={ 150 }/>
  </View>
}
