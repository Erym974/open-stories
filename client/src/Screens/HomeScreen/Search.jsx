import { View, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Search() {

  const navigation = useNavigation();



  return (
    <View>
      <TextInput 
        placeholder="Rechercher"
        clearButtonMode='always'
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10 }}
        autoCorrect={false}
        onEndEditing={({ nativeEvent : { text } }) => navigation.navigate('card-list', { search: text })}
      />
    </View>
  )
}