import React from 'react';
import PropTypes from 'prop-types'
import { Avatar } from '@rneui/themed';
import { View, ScrollView } from 'react-native';

const organizations = [
  { code: 'scrd', name: 'Seguros Crecer S.A', imageUri: null, title: 'SC' },
  {
    code: 'mutucar',
    name: 'Mutualidad de Carabineros S.A',
    imageUri: null,
    title: 'MT',
  },
  { code: 'mic', name: 'Mohandes Insurance', imageUri: null, title: 'ML' },
  {
    code: 'micgeneral',
    name: 'Mohandes Insurance General',
    imageUri: null,
    title: 'MG',
  },
];

export const OrgStack = ({ onUserSelectCallback }) => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 30
        }}>
        {organizations.map((org) => (
          <Avatar
            key={org.code}
            size={64}
            rounded
            title={org.imageUri == null ? org.title : undefined}
            source={{ uri: org.imageUri }}
            onPress={() => onUserSelectCallback(org.code)}
          />
        ))}
      </View>
    </ScrollView>
  );
};


OrgStack.propTypes = {
    onUserSelectCallback: PropTypes.func.isRequired
}