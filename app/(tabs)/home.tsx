import { View, Text, SafeAreaView, FlatList, Dimensions, Image,RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useAppwrite from '@/lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import { Models } from 'react-native-appwrite'
import VideoCard from '@/components/VideoCard'

const Home = () => {

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };  

  return (
    <SafeAreaView className="bg-primary h-full"   
    >

      <FlatList 

        data={posts as Models.Document[]} // data is the source of information for the list
        
        keyExtractor={(item, index) => item.$id} // it is used to generate unique key for list items

        // renderItem is a function that takes an item from data and returns a react element
        renderItem={({item}) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />        
        )}

        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6 pt-5" >
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }        
        
        />
    </SafeAreaView>
  )
}

export default Home