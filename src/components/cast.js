import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
            return(
                <TouchableOpacity
                 Key={index}
                 className='mr-4 items-center'
                 onPress={()=> navigation.navigate('Person', personName)}
                >
                 <Image
                  className='rounded-full'
                  style={{width:hp(10), height:hp(10)}}
                  source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
                 />
                 <Text className='text-white text-xs mt-1'>
                  {
                    characterName.length>10 ? characterName.slice(0,10)+'...': characterName
                  }
                 </Text>
                 <Text className='text-neutral-400 text-xs mt-1'>
                  {
                    personName.length>10 ? personName.slice(0,10)+'...': personName
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