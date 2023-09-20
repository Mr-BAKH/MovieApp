import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

import { View, Text, SafeAreaView, Platform, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { styles } from '../theme/pallet';
import React,{useState} from 'react'
import TrendingMoive from '../components/trendingMovies'
import MovieList from '../components/movieList'


const ios = Platform.OS == 'ios';

export default function Home() {

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([1,2,3])
    const [topRated, setTopRated] = useState([1,2,3])

  return (
   <View className='flex-1 bg-neutral-800'>
    {/* searchbar and logo */}
    <SafeAreaView className={ios? '-mb-2': 'my-[40px]'}>
     <StatusBar style={'light'}/>
     <View className='flex-row justify-between items-center mx-4' >
      <Bars3CenterLeftIcon size={hp(4)} strokeWidth={hp(0.15)} color={"white"}/>
      <Text style={{fontSize: hp(4)}} className="text-white font-bold">
       <Text style={styles.text}>M</Text>ovies
      </Text>
      <TouchableOpacity>
       <MagnifyingGlassIcon size={hp(4)} strokeWidth={hp(0.15)} color={'white'}/>
      </TouchableOpacity>
     </View>
    </SafeAreaView>
    <ScrollView
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom:10}}
    >
     {/* Trending movies carousel */}
     <TrendingMoive title={'Trending'} data={trending}/>

     {/*upcoming movies row*/}
     <MovieList title={'Upcoming'} data={upcoming}/>

     {/*Toprating movies row*/}
     <MovieList title={'Top Rating'} data={upcoming}/>
  
    </ScrollView>

   </View>
  )
}