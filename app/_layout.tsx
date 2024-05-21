import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet } from 'react-native';
import GlobalProvider from '@/context/GlobalProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // font theme set in tailwind config
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),    
  });

  useEffect(() => {
    
    if(error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />            
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />  
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />  
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />  
    </Stack>
    </GlobalProvider>
  )

  return (
    // <View style={styles.container}>
    //   <Text>Root Layout</Text>
    // </View>
    <>
    <Text>Header</Text>
      <Slot />
    <Text>Footer</Text>
    </>
  )

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
