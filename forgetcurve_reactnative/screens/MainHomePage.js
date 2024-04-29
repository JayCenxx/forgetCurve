import { Icon } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function MainHomePage() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Unicard',
                    headerTintColor: 'blue',
                    headerRight: () => (
                        <Icon
                            name='search'
                            type='feather'
                            size={24}
                            iconStyle={{ width: 24 }}
                            color="blue"
                            onPress={() => alert('Search set!')}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default MainHomePage;