import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../components/loading'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useRoute, useNavigation } from '@react-navigation/native'

import { styles, theme } from '../theme/pallet';
import MoveList from '../components/movieList'
import { View, Image, Text, Platform, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'

const ios = Platform.OS === 'ios'? '':'pt-[50px]'

export default function Person() {

  const [likebtn, setLikebtn] = useState(false);
  const [loading, setloading] = useState(true);
  const [person, setPerson] = useState([1,2,3,4])
  const navigation = useNavigation();

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
         source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
         style={{height:'100%', width:'100%',shadowColor:'white'}}
         resizeMode ='cover'
         className='rounded-full '
        />
       </View>
       <View className='mt-6'>
        <Text style={{fontSize:hp(5)}} className='text-base pt-4 font-bold text-white text-center'>keaun Reevs</Text>
        <Text style={{fontSize:hp(2)}} className='text-base  font-bold text-neutral-500 text-center'>London, United kingdom</Text>
       </View>
       <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>Gender</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>Male</Text>
        </View>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>Birthday</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>1964-09-01</Text>
        </View>
        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>known for</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>Acting</Text>
        </View>
        <View className='px-2 items-center'>
         <Text style={{fontSize:hp(2)}} className='text-white font-semibold'>Popularity</Text>
         <Text style={{fontSize:hp(1.7)}} className='text-neutral-300'>64.23</Text>
        </View>
       </View>
       <View className='my-6 mx-4 space-y-2'>
        <Text style={{fontSize:hp(2)}} className='text-white'>Biography</Text> 
        <Text style={{fontSize:hp(1.8)}} className='text-neutral-400 tracking-wide'>
        BiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiographyBiography
        </Text> 
       </View>
       {/* movies */}
       <MoveList title={"Movies"} hideSeeAll={true} data={person}/>
      </View>
          
        )
      }
    </ScrollView>
  )
}