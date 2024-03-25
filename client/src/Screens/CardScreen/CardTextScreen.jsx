import { View, Text, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Header'
import { useRoute } from '@react-navigation/native';
import Hr from '../../Components/Hr';

export default function CardTextScreen() {

    const route = useRoute();
    const { card } = route.params;

    const [scrollOffsetY, setScrollOffsetY] = useState(new Animated.Value(0))


  return (
    <View style={{ flex: 1 }}>
      <Header uri={card?.images?.back} canExpand={true} haveBack={true} backDirection={{ screen: 'card', params: { card } }} max={Dimensions.get('screen').width} isDynamic={true} offset={scrollOffsetY} />
      <ScrollView 
        style={{ flex: 1, padding: 20 }}
        scrollEventThrottle={2}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent: { contentOffset: { y: scrolly } } }) => setScrollOffsetY(new Animated.Value(scrolly))}
        >
          <View>
            <Text style={styles.title}>{card?.title}</Text>
            <Text style={styles.subtitle}>{card?.subtitle}</Text>
            <Hr />
            <View style={{ paddingTop: 10, paddingBottom: 75 }} >
                <Text>
                  {card?.content}
                </Text>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginVertical: 0,
      paddingBottom: 5
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginVertical: 0,
    }
})