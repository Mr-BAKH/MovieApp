import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import {styles} from '../theme/pallet'

export default function SliceApp({title,data,hideSeeAll}) {

    let movieName = 'antoney gorbachof'
    const navigation = useNavigation()

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
        data.map((item,index)=>{
            return(
                <TouchableOpacity
                 key={index}
                 onPress={()=> navigation.navigate('Movie',item)}
                >
                 <View className='space-y-1'>
                  <Image
                    source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
                    className='rounded-3xl'
                    resizeMode='cover'
                    style={{width:wp(33), height:hp(22)}}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {movieName.length>0 ? movieName.slice(0,20)+'...': movieName}
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