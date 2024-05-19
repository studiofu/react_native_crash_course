import React from 'react'
import { View,Text, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Redirect, router } from "expo-router";

import { Link } from 'expo-router';
import { Image } from 'react-native';
import {images } from '../constants';

import CustomButton from '../components/CustomButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// https://www.youtube.com/watch?v=ZBCUegTZF7M


//const Stack = createNativeStackNavigator();

// function HomeScreen() {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const IndexPage = () => {

  return (
      <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Aora!</Text>
      <Link href="/home" >
        Go to Home
      </Link>
    </View>
  )
  

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="home" component={HomeScreen} />
  //     </Stack.Navigator>

  //   </NavigationContainer>
  // )


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{
        height: '100%'
      }}>

        <View className='w-full justify-center items-center h-full px-4'>
            <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain'/>
            <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain'/>

            <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />            
          </View>


          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />          

        </View>

      </ScrollView>
    </SafeAreaView>


    // <View className="flex-1 items-center justify-center">
    //   <Text className="text-2xl font-bold">Aora!</Text>
    //   <Link href="/home" >
    //     Go to Home
    //   </Link>
    // </View>
  )
}

export default IndexPage
