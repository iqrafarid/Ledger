import PeopleListScreen from './screens/PeopleListScreen';
import PersonDetailScreen from './screens/PersonDetailScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import AddPersonScreen from './screens/AddPersonScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function PeopleStack() {
  return (
    <Stack.Navigator initialRouteName="PeopleList">
      <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      <Stack.Screen name="PersonDetail" component={PersonDetailScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="AddPerson" component={AddPersonScreen} />
    </Stack.Navigator>
  );
}