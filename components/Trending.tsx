import { useState } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";
import { animate1,zoomIn,zoomOut } from "@/app/(tabs)/animate";

//export const animate1 = { 0: { opacity: 0.5, scale: 1, translateY: 0 }, 1: { opacity: 1, scale: 1.5, translateY:-30 } };



interface TrendingItemProps {
  activeItem: string;
  item: any;
}

const TrendingItem = ({ activeItem, item } : 
  TrendingItemProps
) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? animate1 : animate1}
      //animation={animate1}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {       
            if(status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false);                
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: any[];
}

const Trending = ({ posts } : 
  TrendingProps
) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems } : 
    { viewableItems: any[] }  
  ) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal // Render items horizontally
      
      keyExtractor={(item) => item.$id} // it is used to generate unique key for list items
      renderItem={({ item }) => ( 
        <TrendingItem activeItem={activeItem} item={item} key={item.$id}/>
      )}      

      onViewableItemsChanged={viewableItemsChanged} // Called when the viewability of rows changes, as defined by the viewabilityConfig prop
      
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }} // Determines the criteria for determining whether an item is considered viewable in the list

      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
