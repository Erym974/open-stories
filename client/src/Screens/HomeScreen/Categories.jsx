import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import { Link } from '@react-navigation/native'
import getImagePath from '../../Utils/getImagePath'

export default function Categories() {

    const [categories, setCategories] = useState([
        {
            name: 'Français',
            image: 'http://placehold.co/150x150.png'
        },
        {
            name: 'Américain',
            image: 'http://placehold.co/150x150.png'
        },
        {
            name: 'Vols',
            image: 'http://placehold.co/150x150.png'
        },
        {
            name: 'Meurtres',
            image: 'http://placehold.co/150x150.png'
        },
        {
            name: 'Meurtres',
            image: 'http://placehold.co/150x150.png'
        },
        {
            name: 'Meurtres',
            image: 'http://placehold.co/150x150.png'
        }
    ])

  return (
    <View style={{ marginTop: 20 }}>
      <Heading text="Catégories" />
      <FlatList 
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
            return (
                <View style={styles.container}>
                    <Link to={{ screen: 'card-list', params: { category: item?.name } }}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={{ uri: getImagePath(item?.image) }} style={styles.sliderImage} />
                            <Text style={{ marginTop: 5 }}>{item?.name}</Text>
                        </View>
                    </Link>
                </View>
            )
            
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 10,
    },  
    sliderImage: {
        width: 75,
        height: 75,
        borderRadius: 100,
        objectFit: 'cover',
    }
})