import { Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text>Home Screen</Text>
        </View>
    );
}

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