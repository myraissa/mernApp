import { Box, Text, View, Center, ScrollView, HStack, Button } from "react-native";
import React from "react";
import CartEmpty from "../components/CartEmpty";
import CartIterms from "../components/CartIterms";
import Colors from "../data/color";

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={Colors.bleuCobalt}>
        {/* header */}
        <Center w="full" py={5}>
          <Text color={Colors.black} fontSize={20} bold>
            Cart
          </Text>
        </Center>
        {/* if cart is empty 
        <CartEmpty />*/}
        {/* Cart Items */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartIterms />
          {/* Chekout */}
          <Center px={5} >
            <Button bg={Colors.black} color={Colors.white} mt={10}>
            Vérifier
            </Button>
          </Center>
        </ScrollView>

    </Box>
  );
}

export default CartScreen;