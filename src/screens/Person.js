import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../components/loading'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useRoute, useNavigation } from '@react-navigation/native'

import {fetchPersonDetails,fetchPersonMovies,image500,fallbackPersonImage} from '../api/moviedb'
import { styles, theme } from '../theme/pallet';
import MoveList from '../components/movieList'
import { View, Image, Text, Platform, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'

const ios = Platform.OS === 'ios'? '':'pt-[50px]'

export default function Person() {

  const { params: item} = useRoute()
  const [likebtn, setLikebtn] = useState(false);
  const [loading, setloading] = useState(false);
  const [movies, setMovis]= useState([])
  const [person, setPerson] = useState({})
  const navigation = useNavigation();

  useEffect(()=>{
    setloading(true);
    getPersonDetails(item.id)
    getPersonMovies(item.id)
    console.log('psersonid',item.id)
  },[item])

  const getPersonDetails= async(id)=>{
    try{
      const data = await fetchPersonDetails(id);
      // console.log('got person details', data);
      if(data){
        setPerson(data)
        setloading(false)
      }
    }catch(err){
      console.log('Error from the Screen',err)
    }
  }

  const getPersonMovies= async(id)=>{
    try{
      const data = await fetchPersonMovies(id);
      // console.log('person movies>>', data);
      if(data && data.cast){
        setMovis(data.cast)
        setloading(false)
      }
    }catch(err){
      console.log('Error from the Screen',err)
    }
  }

  return (
    <ScrollView
     className={`flex-1 bg-neutral-900 space-y-6`}
     constentContainerStyle={{ paddingBottom: 50 }}
    >
     <SafeAreaView className={`flex-row justify-between px-[10px] w-full ${ios}`}>
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
      </SafeAreaView>

      {/* person detals */}
      {
        loading?(
          <Loading/>
        ):(
      <View>
       <View
        style={{height: wp(74), width:wp(74),shadowColor:'white'}}
        className='flex-row shadow-2xl m-auto rounded-full justify-center'>
        <Image
         source={{uri: image500(person?.profile_path)|| fallbackPersonImage}}
         style={{height:'100%', width:'100%',shadowColor:'white'}}
         resizeMode ='cover'
         className='rounded-full '
        />
       </View>
       <View className='mt-6'>
        <Text style={{fontSize:hp(5)}} className='text-base pt-4 font-bold text-white text-center'>
          {person?.name}
        </Text>
        <Text style={{fontSize:hp(2)}} className='text-base  font-bold text-neutral-500 text-center'>
          {person?.place_of_birth}
        </Text>
       </View>
       <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>
          Gender
         </Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>
          {person?.gender%2? "Female":"Male"}
         </Text>
        </View>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>Birthday</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>
          {person?.birthday}
         </Text>
        </View>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>known for</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>
          {person?.known_for_department}
         </Text>
        </View>
        <View className='px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>Popularity</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>
          {person?.popularity}
         </Text>
        </View>
       </View>
       <View className='my-6 mx-4 space-y-2'>
        <Text style={{fontSize:hp(2)}} className='text-white'>Biography</Text> 
        <Text 
          style={{fontSize:hp(1.8)}} 
          className='text-neutral-400 tracking-wide'
        >
          {person?.biography}
        </Text> 
       </View>

       {/* movies */}
       {movies.length>0 && <MoveList title={"Movies"} hideSeeAll={true} data={movies}/>}
      </View>
        )
      }
    </ScrollView>
  )
}