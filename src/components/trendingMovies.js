import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


import {image500,fallbackMoviePoster} from '../api/moviedb'
import { View,Image, Text,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function SliceApp({data,title}) {
  const navigation = useNavigation()
  let iteminput = data;

  return (
   <View>
    <Text style={{fontSize:hp(2)}} className='text-white mx-4 mb-5'>{title}</Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap:10, paddingHorizontal:15,}}
     >
      {
      iteminput.map((item)=>{
        return(
          <Trending key={item.id} navigation={navigation} item={item}/>
        )
      })
      }
     </ScrollView>
   </View>
  )
}

const Trending = ({navigation, item})=>{
  const url = image500(item.poster_path)
    return( 
    <TouchableOpacity  
      className='mb-8 overflow-hidden rounded-3xl bg-neutral-950'
      onPress={()=> navigation.push('Movie', item)}
     >
      <Image
       alt={url}
      //  onError={(err)=> console.log('Error',err.nativeEvent)}
       source={{uri:url||fallbackMoviePoster}}
       style={{width:wp(60), height:wp(80)}}
     />
     </TouchableOpacity>)
}