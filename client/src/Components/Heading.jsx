import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({ text, isViewAll = false }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      { isViewAll && <Text>Voir plus</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
})