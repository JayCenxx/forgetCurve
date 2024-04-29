import { Text, View, Image, ScrollView } from 'react-native';
import { Card } from "react-native-elements";

// const RoundImage = ({ imageSource }) => (
//     <View className="w-25 h-25 rounded-full border-2 border-black">
//       <Image source={imageSource}/>
//     </View>
//   );

function AboutUs() {
    return (
        <View className="flex-1 bg-blue-600">
            <Text className="text-white justify-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
            <ScrollView>
                
            </ScrollView>
        </View>
    );
}

export default AboutUs;