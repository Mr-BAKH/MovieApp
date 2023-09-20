import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../components/loading'
import { View, Text, ImageBackground, ScrollView, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import React,{useEffect,useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { styles, theme } from '../theme/pallet';



const ios = Platform.OS === 'ios'? '':'pt-[50px]'
export default function Movie() {

    let movieName = 'antoney gorbachofantoney gorbachof'

    const navigation = useNavigation();
    const [likebtn, setLikebtn] = useState(false)
    const [cast, setCast] = useState([1,2,3,4,5])
    const [loading, setloading] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
    const {params:item} = useRoute()

    useEffect(()=>{
        //cal the movie details api
    },[item])

  return (
    <ScrollView
     constentContainerStyle={{ paddingBottom: 20 }}
     className={`flex-1 bg-neutral-900 `}
    >
     {/* backbutton and movie poster */}
     {
      loading? (
        <Loading/>
      ):(
        <ImageBackground
         source={{uri:'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'}}
         className={ios}
        style={{width:wp(100), height:hp(55)}}
      >
        <View className='flex-row justify-between px-[10px] w-full'>
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
        </View>
        <LinearGradient
        colors={['transparent', 'rgba(23,23,23,0.4)', 'rgba(23,23,23,1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.65 }}
        style={{ width: wp(100), height: hp(55) }}
        >
        </LinearGradient>
       </ImageBackground>

      )
     }

     {/* movie details */}
     <View style={{marginTop:-(hp(5))}} className='mb-4'>
      <Text 
       style={{fontSize:hp(3)}} 
       className='text-white text-center tracking-wider font-bold'
      >
       {movieName}
      </Text>
     </View>
     {/* status , relese, runtime */}
     <Text
      style={{fontSize:hp(1.8)}}
      className="text-neutral-400 font-semibold text-base text-center"
     >Released. 2020 . 170 min
     </Text>

     {/* genres */}
     <View className='flex-row justify-center mx-4 mb-4 space-x-2'>
      <Text
       style={{fontSize:hp(1.8)}}
       className="text-neutral-400 font-semibold text-base text-center"
      >Action .
      </Text>
      <Text
       style={{fontSize:hp(1.8)}}
       className="text-neutral-400 font-semibold text-base text-center"
      >Thrill .
      </Text>
      <Text
       style={{fontSize:hp(1.8)}}
       className="text-neutral-400 font-semibold text-base text-center"
      >Comedy
      </Text>
     </View>

     {/* description */}
     <Text 
      style={{fontSize:hp(1.8)}}
      className='text-neutral-400 mx-4 tracking-wide'
     >a;sdkfja;sdkfjal;sdjf;alasdfadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsdkjf;asdfja;sdlkfjlkj;jkadjf;aklsdjf;lakjdsf;asidfj;asidjf;alsdjf;ladsjf;alsdjf;ajds;;asdfklja;sdlfkja;sdfj;asdlfja;dj
     </Text>
     
     {/* cast */}
     <Cast navigation={navigation} cast={cast}/>

     {/* similar movie */}
     <MovieList title='Similar Movie' hideSeeAll={true} data={similarMovies}/>
    </ScrollView>
  )
}