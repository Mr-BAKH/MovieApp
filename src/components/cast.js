import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {image185, fallbackPersonImage} from '../api/moviedb'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function SliceApp({cast,navigation}){
    let personName ='keanu Reevs';
    let characterName = 'John wick';
  return (
    <View className='my-6'>
     <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
     <ScrollView
      horizontal
      showHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}
     >
      {
        cast && cast.map((item,index)=>{
          console.log(item.id)
            return(
                <TouchableOpacity
                 key={item.id+index}
                 className='mr-4 items-center'
                 onPress={()=> navigation.navigate('Person', item)}
                >
                 <Image
                  className='rounded-full'
                  style={{width:hp(10), height:hp(10)}}
                  // source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
                  source={{uri:image185(item?.profile_path)|| fallbackPersonImage}}
                  />
                 <Text className='text-white text-xs mt-1'>
                  {
                    item?.character.length>10 ? item?.character.slice(0,10)+'...': item?.character
                  }
                 </Text>
                 <Text className='text-neutral-400 text-xs mt-1'>
                  {
                    item?.original_name.length>10 ? item?.original_name.slice(0,10)+'...': item?.original_name
                  }
                 </Text>
                </TouchableOpacity>
            )
        })
      }
     </ScrollView>
    
    </View>
  )
}