import { Dimensions, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from './Slider'
import Categories from './Categories'
import Header from '../../Components/Header'
import Search from './Search'
import images from './../../Utils/images';
import axios from './../../Utils/axios';

export default function HomeScreen() {

//   const [sliders, setSliders] = useState([
//     {
//         id: 1,
//         name: 'Slider 1',
//         images
//     },
//     {
//         id: 2,
//         name: 'Slider 2',
//         images
//     },
//     {
//         id: 3,
//         name: 'Slider 3',
//         images
//     }
//   ])

    const [newest, setNewest] = useState([])
    const [populares, setPopulars] = useState([])

    // const [populares, setPopulars] = useState([
    //     {
    //         id: 1,
    //         name: 'Slider 1',
    //         images
    //     },
    //     {
    //         id: 2,
    //         name: 'Slider 2',
    //         images
    //     },
    //     {
    //         id: 3,
    //         name: 'Slider 3',
    //         images
    //     }
    // ])

    useEffect(() => {
        loadCategories()
        loadNewest()
        loadLikest()
    }, [])

    const loadCategories = async () => {

    }
    const loadNewest = async () => {
        // const response = await axios.get('/api/stories?a=newestt&l=4')
        // console.log(response);
        fetch('https://192.168.1.30:3000/api/stories?a=newestt&l=4')
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Faire quelque chose avec les données JSON
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }
    const loadLikest = async () => {
        const response = await axios.get('/api/stories?a=newestt&l=4')
        console.log(response);
    }

  return (
    <View>
        <ScrollView>
            <Header max={200} />
            <View style={{ padding: 20 }}>
                <Search />
                <Slider title="Les Nouveautés" cards={newest} />
                <Categories />
                <Slider title="Les plus Populaires" cards={populares} />
            </View>
        </ScrollView>
    </View>
  )
}