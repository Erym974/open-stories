import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, useRoute } from '@react-navigation/native';
import ArrowIcon from '../../Svg/ArrowIcon';
import { Dimensions } from 'react-native';
import getImagePath from '../../Utils/getImagePath';

export default function ImageScreen() {

    const route = useRoute();
    const { image, referer } = route.params;

  return (
    <View>
        <View style={{ position: 'absolute', top: 30, zIndex: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingLeft: 20, paddingRight: 20 }} >
            <Link to={{ screen: referer.name, params: referer.params }} style={{ zIndex: 2, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View><ArrowIcon /></View>
            </Link>
        </View>
        <Image source={{ uri: getImagePath(image) }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex: 1, objectFit: 'contain' }} />
    </View>
  )
}