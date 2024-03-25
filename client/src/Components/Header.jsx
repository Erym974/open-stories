import { Image, Animated, View, TouchableHighlight, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import ArrowIcon from '../Svg/ArrowIcon';
import getImagePath from '../Utils/getImagePath';

export default function Header({ objectFit = "cover", uri = 'https://placehold.co/600x400.png', canExpand = false, isDynamic = false, max=240, min=120, offset = new Animated.Value(0), haveBack = false, backDirection = {}, haveAction = false, actionSvg = <></>, actionFnc = () => {} }) {

  const navigation = useNavigation()
  const route = useRoute()

  const animatedHeaderHeight = offset?.interpolate({
    inputRange: [0, (max - min)],
    outputRange: [max, min],
    extrapolate: 'clamp',
  })

  const [height, setHeight] = useState(max);

  useEffect(() => {
    if(isDynamic) setHeight(Number.parseInt(JSON.stringify(animatedHeaderHeight)))
    else setHeight(max)
  }, [isDynamic, offset])

  const expandImage = () => {
    navigation.navigate('fullsize-image', { image: uri, referer: { name: route.name, params: route.params } })
  }

  return (
    <Animated.View style={{ position: 'relative', zIndex: 1, }}>
      <View style={{ position: 'absolute', top: 30, zIndex: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingLeft: 20, paddingRight: 20, height: 40 }} >
        {haveBack ?
        <Link to={backDirection} style={{ zIndex: 2, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ display: 'flex', justifyContent: 'center', height: 40 }}><ArrowIcon /></View>
        </Link> : <View></View>}
        {haveAction ?
        <TouchableHighlight underlayColor="transparent" onPress={actionFnc} style={{ zIndex: 2, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View>{actionSvg}</View>
        </TouchableHighlight> : <View></View>}
      </View>
      <Pressable onPress={() => canExpand && expandImage()} >
        <Image source={{ uri: getImagePath(uri) }} style={{ width: '100%', height, zIndex: 1, backgroundColor: '#fff', objectFit }} />
      </Pressable>
    </Animated.View>
  )
}