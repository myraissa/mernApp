import { FontAwesome } from "@expo/vector-icons";
import { Box, Text, View, Center, Button } from "react-native";
import React from "react";
import Colors from "../data/color";

function CartEmpty() {
  return (
    <Box flex={1} px={4}>
        <Center h='90%'>
            <Center w={200} h={200} bg={Colors.white} rounded="full">
                <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
            </Center>
            <Text color={Colors.main} bold mt={5}>
                Carte vide
            </Text>
        </Center>
        <Button bg={Colors.black} color={Colors.white}>
            Commencer à magasiner
        </Button>
    </Box>
  );
}

export default CartEmpty;