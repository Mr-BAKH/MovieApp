import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { XMarkIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading'

import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React,{useState} from 'react'

const ios = Platform.OS === 'ios'? '': 'pt-[50px]'

export default function Search() {

    const navigation = useNavigation()
    const [result, setResult] = useState([]);
    const [loading, setloading] = useState(false);
    let movieName ='ladskfjlajkdflajklsdjfl'

  return (
   <SafeAreaView className={`bg-neutral-800 flex-1 ${ios}`}>
    <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full '>
     <TextInput
      placeholder='Search Movies'
      placeholderTextColor={'lightgray'}
      className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
     />
     <TouchableOpacity
      onPress={()=> navigation.navigate('Home')}
      className='rounded-full p-3 m-1 bg-neutral-500'
     >
      <XMarkIcon size={hp(4)} color={'white'}/>
     </TouchableOpacity>
    </View>
    {/* result */}
    {
        loading?(
            <Loading/>
        ):
            result.length>0 ? (
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                className='space-y-3'
                >
                <Text className='text-white font-semibold ml-1'>Result ({result.length})</Text>
                <View className='flex-row justify-between flex-wrap'>
                {
                    result.map((item,index)=>{
                        return(
                            <TouchableOpacity
                            key={index}
                            onPress={()=> navigation.navigate('Movie', item)}
                            >
                            <View className='space-y-2 mb-4'>
                            <Image
                             source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
                             style={{width:wp(44), height:hp(30)}}
                            />  
                            <Text className="text-neutral-300 ml-1">
                            {
                                movieName.length>22? movieName.slice(0,22)+'...': movieName
                            }
                            </Text>
                            </View>
    
                            </TouchableOpacity>
                        )
                    })
                }
    
                </View>
                </ScrollView>
    
            ):(
                <View className='flex-row justify-center'>
                 <Image
                  source={require('../../assets/image/search.png')}
                  style={{width:wp(96), height:wp(96)}}
                 />
                </View>
            )
    }
    
   </SafeAreaView>
  )
}