import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRoute } from '@react-navigation/native'
import ArrowIcon from '../../Svg/ArrowIcon';
import Hr from '../../Components/Hr';
import images from './../../Utils/images';
import getImagePath from '../../Utils/getImagePath';

export default function CardListScreen() {

  const navigation = useNavigation()
  const route = useRoute();
  const { category = null, search = null } = route.params || {};
  
  const [cards, setCarts] = useState([
    {
        id: 1,
        name: 'Slider 1',
        images
    },
    {
        id: 2,
        name: 'Slider 2',
        images
    },
    {
        id: 3,
        name: 'Slider 3',
        images
    },
    {
        id: 4,
        name: 'Slider 4',
        images
    },
    {
        id: 5,
        name: 'Slider 5',
        images
    },
    {
        id: 6,
        name: 'Slider 6',
        images
    },
    {
        id: 7,
        name: 'Slider 7',
        images
    },
    {
        id: 8,
        name: 'Slider 8',
        images
    },
    {
        id: 9,
        name: 'Slider 9',
        images
    },
    {
        id: 10,
        name: 'Slider 10',
        images
    },
    {
        id: 11,
        name: 'Slider 11',
        images
    },
    {
        id: 12,
        name: 'Slider 12',
        images
    }
  ])

  useEffect(() => {
    if(!category && !search) return navigation.navigate('home');

    if(category) {

    } else {
      
    }

  }, [category, search])
  
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, paddingTop: 40 }}>
        <Link to={{ screen: 'home' }}>
          <View>
            <ArrowIcon />
          </View>
        </Link>
        <Text style={styles.heading}>{category || search }</Text>
      </View>
      <Hr />
      <View style={{ height: '100%', paddingBottom: 100 }}>
        <ScrollView style={{ flex : 1 }}>
          <View style={{ display: 'flex', gap: 10, paddingTop: 15, paddingBottom: 15 }}>
              {cards.map((item, key) => <Link key={key} to={{ screen: 'card', params: { id: item?.id, referer: { screen: 'card-list', params: { category } } } }} style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                 <View style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingBottom: 10 }}>
                    <Image source={{ uri: getImagePath(item?.images?.front) }} style={styles.image} />
                    <Text style={styles.title}>{item?.name}</Text>
                  </View>
              </Link>)}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 0,
    paddingBottom: 5,
    paddingRight: 55
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 5,
    borderRadius: 10,
    objectFit: 'cover',
  }
})