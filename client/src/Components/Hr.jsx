import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function Hr() {
  return (
    <View
        style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingTop: 10,
            paddingBottom: 10
        }}
    />
  )
}