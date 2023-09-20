import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Aboute from '../screens/Aboute'
import Movie from '../screens/Movie'
import Person from '../screens/Person';
import Search from '../screens/Search';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
     initialRouteName='Home'
    >
      <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
      <Stack.Screen name="About" options={{headerShown:false}} component={Aboute} />
      <Stack.Screen name="Movie" options={{headerShown:false}} component={Movie} />
      <Stack.Screen name="Person" options={{headerShown:false}} component={Person} />
      <Stack.Screen name="Search" options={{headerShown:false}} component={Search} />
    </Stack.Navigator>
  );
}

export default MyStack