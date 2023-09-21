import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';

import { View, Text, SafeAreaView, Platform, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { styles } from '../theme/pallet';
import React,{useState, useEffect} from 'react'
import Loading from '../components/loading'
import TrendingMoive from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { fetchTrendingMovies,fetchTopratedMovies, fetchUpcomingMovies } from '../api/moviedb';


const ios = Platform.OS == 'ios';

export default function Home() {

  const navigation = useNavigation()

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setloading] = useState(true)


    useEffect(()=>{
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatingMovies();
    },[])

    const getTrendingMovies = async()=>{
      const data = await fetchTrendingMovies()
      if(data && data.results) {
        setTrending(data.results)
        setloading(false)
      }
    }
    const getUpcomingMovies = async()=>{
      const data = await fetchUpcomingMovies()
      if(data && data.results) {
        setUpcoming(data.results)
        setloading(false)
      }
    }
    const getTopRatingMovies = async()=>{
      const data = await fetchTopratedMovies()
      if(data && data.results) {
        setTopRated(data.results)
        setloading(false)
      }
    }

  return (
   <View className='flex-1 bg-neutral-800'>
    {/* searchbar and logo */}
    <SafeAreaView className={ios? '-mb-2': 'my-[40px]'}>
     <StatusBar style={'light'}/>
     <View className='flex-row justify-between items-center mx-4' >
      <Bars3CenterLeftIcon size={hp(4)} strokeWidth={hp(0.15)} color={"white"}/>
      <Text style={{fontSize: hp(4)}} className="text-white font-bold">
       <Text style={styles.text}>M</Text>ovChee
      </Text>
      <TouchableOpacity
       onPress={()=> navigation.navigate('Search')}
      >
       <MagnifyingGlassIcon size={hp(4)} strokeWidth={hp(0.15)} color={'white'}/>
      </TouchableOpacity>
     </View>
    </SafeAreaView>
    {
      loading?( 
        <Loading/>
      ):(
        <ScrollView
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingBottom:10}}
        >
        {/* Trending movies carousel */}
        {trending.length >0 && <TrendingMoive title={'Trending'} data={trending}/>}

        {/*upcoming movies row*/}
        {upcoming.length> 0 && <MovieList title={'Upcoming'} hideSeeAll={true} data={upcoming}/>}
        
        {/*Toprating movies row*/}
        {topRated.length>0 && <MovieList title={'Top Rating'} hideSeeAll={true} data={topRated}/>}
        </ScrollView>
      )
    }
   </View>
  )
}