import { View, TouchableOpacity, Text } from 'react-native';
import { Card, Icon } from "react-native-elements";

function HomeScreen() {
    return (
        <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
            <View className="p-7 items-center">
                <TouchableOpacity className="flex-row items-center p-2.5 rounded-md bg-blue-200 w-56 justify-center" onPress={() => alert('Sign up!')}>
                    <Text className="pr-2 font-bold">Sign up</Text>
                    <Icon name="user-plus" type="font-awesome" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="p-2"/>
                <TouchableOpacity className="flex-row items-center p-2.5 rounded-md bg-blue-200 w-56 justify-center" onPress={() => alert('Create Set!')}>
                    <Text className="pr-2 font-bold">Create Set</Text>
                    <Icon name="creative-commons-share" type="font-awesome-5" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </Card>
    );
}

export default HomeScreen;