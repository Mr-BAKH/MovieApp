import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../components/loading'
import { View, Text, ImageBackground, ScrollView, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import React,{useEffect,useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { styles, theme } from '../theme/pallet';
import {image500,fallbackMoviePoster, fetchSimilarDetails,fetchCreditDetails,fetchMovieDetails} from '../api/moviedb'


const ios = Platform.OS === 'ios'? '':'pt-[50px]'
export default function Movie() {

    let movieName = 'antoney gorbachofantoney gorbachof'

    const navigation = useNavigation();
    const [likebtn, setLikebtn] = useState(false)
    const [cast, setCast] = useState([])
    const [loading, setloading] = useState(true)
    const [similarMovies, setSimilarMovies] = useState([])
    const [movie, setMovie] = useState({})
    const {params:item} = useRoute()

    useEffect(()=>{
      setloading(true)
      getMovieDetail(item.id)
      getMovieCredits(item.id)
      getSimilarMovies(item.id)
    },[item])

    const getMovieDetail = async(id)=>{
      try{
        const data = await fetchMovieDetails(id);
        if(data){
          // console.log('data from movie Detail', data)
          setMovie(data)
          setloading(false)
        }

      }catch(e){
        console.log('Error from movie Details:',e)
      }
    }

    const getSimilarMovies = async(id)=>{
      try{
        const data = await fetchSimilarDetails(id);
        if(data && data.results){
          // console.log('Similar', data)
          setSimilarMovies(data.results)
          setloading(false)
        }

      }catch(e){
        console.log('Error from movie Details:',e)
      }
    }

    const getMovieCredits = async(id)=>{
      try{
        const data = await fetchCreditDetails(id)
        // console.log('got credit,',data)
        if(data && data.cast){
          setCast(data.cast)
        }
      }catch(err){
        console.log(err)
      }
    }

  return (
    <ScrollView
     constentContainerStyle={{ paddingBottom: 20 }}
     className={`flex-1 bg-neutral-900 `}
    >
     {/* backbutton and movie poster */}
     {
      loading? (
        <Loading/>
      ):(
        <ImageBackground
         source={{uri:image500(movie.poster_path)}|| fallbackMoviePoster }
         className={ios}
        style={{width:wp(100), height:hp(55)}}
      >
        <View className='flex-row justify-between px-[10px] w-full'>
          <TouchableOpacity 
          style={styles.background} 
          className='rounded-xl p-1'
          onPress={()=> navigation.goBack()}
          >
          <ChevronLeftIcon size={hp(4.5)} strokeWidth={hp(0.15)} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity 
          className='rounded-xl p-1'
          onPress={()=> setLikebtn(!likebtn)}
          >
          <HeartIcon size={hp(4.5)} color={likebtn? theme.text :'white'} />
          </TouchableOpacity>
        </View>
        <LinearGradient
        colors={['transparent', 'rgba(23,23,23,0.4)', 'rgba(23,23,23,1)']}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 0.7 }}
        style={{ width: wp(100), height: hp(55) }}
        >
        </LinearGradient>
       </ImageBackground>

      )
     }

     {/* movie details */}
     <View style={{marginTop:-(hp(5))}} className='mb-4'>
      <Text 
       style={{fontSize:hp(3)}} 
       className='text-white text-center tracking-wider font-bold'
      >
       {movie?.title}
      </Text>
     </View>
     
     {/* status , relese, runtime */}
     {movie.id?(
      <Text
        style={{fontSize:hp(1.8)}}
        className="text-neutral-400 font-semibold text-base text-center"
      >{movie?.status} . {movie?.release_date.split('-')[0]} . {movie?.runtime} min
      </Text>
     ): null
    }

     {/* genres */}
     <View className='flex-row justify-center mx-4 mb-4 space-x-2'>
     {
      movie?.genres?.map((item,index)=>{
        let showDot = index+1 != movie.genres.length
        return(
          <Text
          key={index}
          style={{fontSize:hp(1.8)}}
          className="text-neutral-400 font-semibold text-base text-center"
          >{item?.name} {showDot?".":null}
          </Text>
        )
      })
     }
     </View>

     {/* description */}
     <Text 
      style={{fontSize:hp(1.8)}}
      className='text-neutral-400 mx-4 tracking-wide'
     >
      {
        movie?.overview
      }
     </Text>
     
     {/* cast */}
     { cast.length>0 && <Cast navigation={navigation} cast={cast}/>}

     {/* similar movie */}
     {similarMovies.length>0 && <MovieList title='Similar Movie' hideSeeAll={true} data={similarMovies}/>}
     
    </ScrollView>
  )
}