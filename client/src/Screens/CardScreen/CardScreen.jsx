import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../Components/Header';
import { Dimensions } from 'react-native';
import ArrowIcon from '../../Svg/ArrowIcon';
import EyeIcon from '../../Svg/EyeIcon';
import HearthIcon from '../../Svg/HearthIcon';
import images from './../../Utils/images';
import * as SecureStore from 'expo-secure-store';

export default function CardScreen() {

  const navigation = useNavigation();
  const route = useRoute();
  const { id, referer, card: cardToShow = null } = route.params;
  const [scrollOffsetY, setScrollOffsetY] = useState(new Animated.Value(0));
  
  const [cardLiked, setCardLiked] = useState(true)

  const [card, setCard] = useState({
    id: 1,
    title: 'Card 1',
    subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, eos magnam similique, pariatur, consectetur est aperiam neque optio nulla eaque esse qui veritatis voluptatem',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, eos magnam similique, pariatur, consectetur est aperiam neque optio nulla eaque esse qui veritatis voluptatem',
    images
  });

  useEffect(() => {
    if (!id && !cardToShow) {
      navigation.navigate('home');
    }

    if(cardToShow) {
      setCard(cardToShow);
    }

  }, [id, navigation]);

  const likeCard = async () => {
    setCardLiked(!cardLiked)

    const uniqId = await SecureStore.getItemAsync('uniq-id');

    

  }

  return (
    <View style={{ flex: 1 }}>
      <Header uri={card?.images?.front} canExpand={true} isDynamic={false} offset={scrollOffsetY} haveBack={true} backDirection={referer ? referer : { screen: 'home' }} max={Dimensions.get('screen').width} haveAction={true} actionSvg={<HearthIcon isLiked={cardLiked} />} actionFnc={likeCard} />
      <ScrollView 
        style={{ flex: 1, padding: 20 }}
        scrollEventThrottle={2}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent: { contentOffset: { y: scrolly } } }) => setScrollOffsetY(new Animated.Value(scrolly))}>
          <View>
            <Text style={styles.title}>{card?.title}</Text>
            <Text style={styles.subtitle}>{card?.subtitle}</Text>
          </View>
      </ScrollView>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, paddingBottom: 25 }}>
        <Link to={{ screen: 'card', params: { id: id - 1 } }}><View><ArrowIcon /></View></Link>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          <Link to={{ screen: 'card-text', params: { card } }} ><View><EyeIcon /></View></Link>
        </View>
        <Link to={{ screen: 'card', params: { id: card?.id + 1 } }} ><View style={{ transform: [{ rotate: "-180deg" }] }}><ArrowIcon /></View></Link>
      </View>
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