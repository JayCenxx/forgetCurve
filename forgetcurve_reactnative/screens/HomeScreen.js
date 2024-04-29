import { View, TouchableOpacity, Text, Button } from 'react-native';
import { Card, Icon } from "react-native-elements";

function HomeScreen({ navigation }) {
    return (
        <>
            <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                <View className="p-10 items-center">
                    <TouchableOpacity className="flex-row items-center p-2.5 rounded-md bg-blue-200 w-56 justify-center" onPress={() => alert('Sign up!')}>
                        <Text className="pr-2 font-bold">Sign up</Text>
                        <Icon name="user-plus" type="font-awesome" size={24} color="blue" />
                    </TouchableOpacity>
                    <Text className="p-2" />
                    <TouchableOpacity className="flex-row items-center p-2.5 rounded-md bg-blue-200 w-56 justify-center" onPress={() => alert('Create Set!')}>
                        <Text className="pr-2 font-bold">Create Set</Text>
                        <Icon name="creative-commons-share" type="font-awesome-5" size={24} color="blue" />
                    </TouchableOpacity>
                </View>
            </Card>
            <View className="pt-10 pl-4">
                <Text className="pr-2 font-bold">Recommended sets:</Text>
            </View>
            <View className="flex flex-wrap flex-row">
                <View className="w-1/2">
                    <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View className="p-3 items-center">
                            <Text className="font-bold pb-1">Science</Text>
                            <Text className="text-xs pb-1">0.0 Stars</Text>
                            <Text className="text-xs pb-1">4 terms  0 Views</Text>
                            <Text className="text-xs pb-1">Created June 2023</Text>
                            <Text className="text-xs pb-1">Review in 1 day</Text>
                        </View>
                    </Card>
                </View>
                <View className="w-1/2">
                    <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View className="p-3 items-center">
                            <Text className="font-bold pb-1">Math</Text>
                            <Text className="text-xs pb-1">0.0 Stars</Text>
                            <Text className="text-xs pb-1">4 terms  0 Views</Text>
                            <Text className="text-xs pb-1">Created June 2023</Text>
                            <Text className="text-xs pb-1">Review in 1 day</Text>
                        </View>
                    </Card>
                </View>
            </View>
            <View className="flex-1 justify-end p-4">
                <Button color="blue" title="About Us" onPress={() => navigation.navigate('AboutUs')} />
            </View>
        </>
    );
}

export default HomeScreen;