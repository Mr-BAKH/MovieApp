import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Image,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function SliceApp({trending,title}) {
  const navigation = useNavigation()
  let item = ''

  return (
   <View>
    <Text style={{fontSize:hp(2)}} className='text-white mx-4 mb-5'>{title}</Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap:10, paddingHorizontal:15,}}
     >
      <Trending navigation={navigation} item={item}/>
      <Trending navigation={navigation} item={item}/>
      <Trending navigation={navigation} item={item}/>
      <Trending navigation={navigation} item={item}/>
     </ScrollView>
   </View>
  )
}

const Trending = ({navigation, item})=>{
  return(
  <TouchableOpacity  
   className='mb-8 overflow-hidden rounded-3xl bg-red-100'
   onPress={()=> navigation.navigate('Movie', item)}
  >
   <Image
    source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
    style={{width:wp(60), height:wp(80)}}
   />
  </TouchableOpacity>
  )
}