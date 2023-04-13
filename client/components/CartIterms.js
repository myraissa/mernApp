import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Box, Text, Pressable, HStack, Center, Image, VStack, Button } from "react-native";
import {SwipeListView } from "react-native-swipe-list-view";
import Colors from "../data/color";
import products from "../data/Products";


export const Swiper = () => (
  <SwipeListView
    data={products}
    rightOpenValue={-50}
    previewRowkey={0}
    previewOpenValue={-40}
    previewOpenDelay={3000}
    renderItem={renderitem}
    renderHiddenItem={hiddenItem}
    showsVerticalScrollIndicator={false}
  />
);

// Define renderitem before using it in the Swiper component
const renderitem = (data) => {
  return (
    <Pressable onPress={() => console.log("Pressed")}>
      <Box ml={6} mb={3}>
        <HStack
          alignItems="center"
          bg={Colors.white}
          shadow={1}
          rounded={10}
          overflow="hidden"
        >
          <Center w="25%" bg={Colors.gray}>
            <Image
              source={{ uri: data.item.image }}
              alt={data.item.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
          </Center>
          <VStack w="60%" px={2} space={3}>
            <Text isTruncated color={Colors.black} bold fontSize={10}>
              {data.item.name}
            </Text>
          </VStack>
          <Center>
            <Button
              bg={Colors.main}
              _pressed={{ bg: Colors.main }}
              _text={{
                color: Colors.white,
              }}
            >
              5
            </Button>
          </Center>
        </HStack>
      </Box>
    </Pressable>
  );
};


// Hidden
const hiddenItem = () => {
  return (
    <Pressable
      w={50}
      roundedTopRight={10}
      roundedBottomRight={10}
      h="88%"
      ml="auto"
      justifyContent="center"
      bg={Colors.red}
    >
      <Center alignItems="center" space={2}>
        <FontAwesome name="trash" size={24} color={Colors.white} />
      </Center>
    </Pressable>
  );
};


function CartIterms() {
  return (
    <Box mr={6}>
      <Swiper />
    </Box>
  );
}

export default CartIterms;