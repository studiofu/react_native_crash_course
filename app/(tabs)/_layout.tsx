import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import React from 'react'
import {Tabs, Redirect} from "expo-router";
import { icons } from "../../constants";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
           borderRadius: 20,
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
            tabBarIcon: ({ color, focused }) => (
              <View className={"w-[56px] h-[56px] rounded-full bg-[#F02A4B] mb-[82px]"}>
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Add"
                focused={focused}
              />
              </View>
            ),
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