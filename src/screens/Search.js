import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { XMarkIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading'
import {debounce} from 'lodash'
import {fetchSearchMovies} from '../api/moviedb'
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React,{useState, useCallback, useEffect} from 'react'
import { image500 } from '../api/moviedb'

const ios = Platform.OS === 'ios'? '': 'pt-[50px]'

export default function Search() {

    const navigation = useNavigation()
    const [result, setResult] = useState([]);
    const [loading, setloading] = useState(false);

    let movieName ='ladskfjlajkdflajklsdjfl'
 
    const handleSearch  = value =>{
        if(value.nativeEvent.text && value.nativeEvent.text.length>3){
            setloading(true);
            fetchSearchMovies({
                query: value.nativeEvent.text,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(
                data=>{
                    setloading(false);
                    // console.log('got movies', data);
                    if(data && data.results){
                        setResult(data.results)
                        setloading(false)
                    }
                }
            )
        }else{
            setloading(false)
            setResult([])
        }
    }

    // const handledebounce = useCallback(debounce(handleSearch,400),[])

  return (
   <SafeAreaView className={`bg-neutral-800 flex-1 ${ios}`}>
    <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full '>
     <TextInput
      placeholder='Search Movies'
      onChange={handleSearch}
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
                            key={item.id}
                            onPress={()=> navigation.navigate('Movie', item)}
                            >
                            <View className='space-y-2 mb-4'>
                            <Image
                             source={{uri: image500(item.poster_path)}}
                             style={{width:wp(44), height:hp(30)}}
                            />  
                            <Text className="text-neutral-300 ml-1">
                            {
                                item.original_title?.length>22? item.original_title.slice(0,22)+'...': item.original_title
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