import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

import { theme } from '../theme/pallet';
import { View, Text } from 'react-native'
import React from 'react'

export default function SliceApp() {
  return (
   <View className='justify-center  items-center h-[200px] '>
       <LottieView
         loop
         autoPlay
         source={require('../../assets/lottie/animation_lms3yik5.json')}
         className='w-[160px] h-[160px]'
       />
   </View>
  )
}