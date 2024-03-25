import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import { Link } from '@react-navigation/native'
import getImagePath from '../../Utils/getImagePath'

export default function Slider({ title = "Titre de section", cards }) {

  return (
    <View>
      <Heading text={title} />
      <FlatList 
        data={cards}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
            return (
                <Link to={{ screen: 'card', params: { id: item?.id } }} style={{ marginRight: 10 }}>
                    <View>
                        <Image source={{ uri: getImagePath(item?.images?.thumbnail) }} style={styles.sliderImage} />
                    </View>
                </Link>
            )
            
        }}
      />
    </View>
  )

}

const styles = StyleSheet.create({
    sliderImage: {
        width: 225,
        height: 150,
        borderRadius: 20,
        objectFit: 'cover',
    }
})