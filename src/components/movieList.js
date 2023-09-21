import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import {image185, fallbackMoviePoster} from '../api/moviedb'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import {styles} from '../theme/pallet'

export default function SliceApp({title, data, hideSeeAll}) {

  
    const navigation = useNavigation()
    let itemInput = data;

  return (
    <View className='mb-8 space-y-4'>
     <View className='mx-4 flex-row justify-between items-center'>
      <Text style={{fontSize:hp(2)}} className='text-white'>{title}</Text>
      {
        !hideSeeAll &&(
        <TouchableOpacity>
        <Text style={[styles.text,{fontSize:hp(2)}]}>Sell All</Text>
        </TouchableOpacity>
        )
      }
     </View>
     {/* movie row */}
     <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap:10, paddingHorizontal:15,}}   
     >
      {
        itemInput.map((item,index)=>{
          const name = item.title;
          // console.log(item.id)
            return(
                <TouchableOpacity
                 key={item.id+index}
                 onPress={()=> navigation.push('Movie',item)}
                >
                 <View className='space-y-1'>
                  <Image
                    source={{uri:image185(item.poster_path)|| fallbackMoviePoster}}
                    className='rounded-3xl'
                    resizeMode='cover'
                    style={{width:wp(33), height:hp(22)}}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {name && name.length>0 ? name.slice(0,14)+'...': name}
                  </Text>
                 </View>
                </TouchableOpacity>
            )
        })
      }
     </ScrollView>
    </View>
  )
}