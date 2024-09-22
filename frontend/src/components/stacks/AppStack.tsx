import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestScreen from '../screens/TestScreen';
import AnotherTestScreen from '../screens/AnotherTestScreen';

const Stack = createNativeStackNavigator()

const AppStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name='Test'
        component={TestScreen}
        options={{
          title: 'Test Page',
          headerStyle: {
            backgroundColor: '#2c3e50'
          },
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      />
      <Stack.Screen 
        name='Another' 
        component={AnotherTestScreen} 
        options={{
          title: 'Another Test Page',
          headerStyle: {
            backgroundColor: '#2c3e50'
          },
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppStack;