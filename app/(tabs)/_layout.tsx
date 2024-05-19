import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from 'react'
import {Tabs, Redirect} from "expo-router";
import { icons } from "../../constants";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import * as Animatable from 'react-native-animatable';
import { animate1, animate2 } from "./animate";

const TabIcon = ({ icon, color, name, focused } : {
  icon: any,
  color: string,
  name: string,
  focused: boolean
}) => {
  return (
    <View className="flex items-center justify-center gap-2 bg-transparent">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

// animation: https://www.youtube.com/watch?v=gbTFbPQnK9I



const TabsLayout = () => {
  return (    
    <>
    <Tabs
      screenOptions={{
        headerShown: false,
      
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          backgroundColor: 'rgba(255, 20, 0, 0.0)',
          //borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,      
        },
        tabBarStyle: {
          //position: "absolute",
          // left: 20,
          // bottom: 20,
          // borderRadius: 20,
          // bottom: 10,
          // left:10,
          // right:10,
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}    
    >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,            
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add"          
          options={{
            title: "Add",            
            headerShown: false,
            tabBarButton: (props) => {
              const {
                onPress,
                // extra data,
                accessibilityState,
              } = props;

              const focused = accessibilityState?.selected;

              const viewRef = useRef<Animatable.View>(null);
              const circleRef = useRef(null);
              const textRef = useRef(null);

              useEffect(() => {
                if(focused) {
                  viewRef?.current?.animate(animate1);
                }else {
                  viewRef?.current?.animate(animate2);
                }
              },[focused]);

              return (<TouchableOpacity onPress={onPress}                 
                activeOpacity={0.5} className="flex justify-center items-center"
              >                
                <Animatable.View className="h-[50px] w-[50px] rounded-full bg-red-700 items-center justify-center flex"
                  ref={viewRef}
                  duration={500}                  
                >                  
                  <Image
                      source={icons.plus}
                      resizeMode="contain"                      
                      className="w-6 h-6"
                    />                  
                  <Text className="text-white">Add</Text>
                </Animatable.View>
              </TouchableOpacity>)
            },
            // tabBarIcon: ({ color, focused }) => (
            //   <View className={"w-[56px] h-[56px] rounded-full bg-[#F02A4B] mb-[82px]"}>
            //   <TabIcon
            //     icon={icons.plus}
            //     color={color}
            //     name="Add"
            //     focused={focused}
            //   />
            //   </View>
            // ),
          }}
        />                

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />        
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout