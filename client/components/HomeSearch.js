import React from "react";
import { Text, HStack, Input, Box } from "native-base";
import Colors from "../data/color";
import { Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

function HomeSearch() {
  const navigation = useNavigation()
    return (
        <HStack
          space={3}
          w="full"
          px={6}
          bg={Colors.bleuCobalt}
          py={4} 
          alignItems="center" 
          safeAreaTop 
        >
           <Input 
             placeholder="Search..." 
             w="85%" 
             bg={Colors.white} 
             type="search" 
             variant="filled"
             h={12} 
             borderWidth={0} 
             _focus={{            //le couleur reste fix
              bg: Colors.white,
             }}
             />
           <Pressable ml={3} onPress={() => NavigationPreloadManager.navigate("Cart")}>
              <FontAwesome5 name="shopping-basket" size={24} color={Colors.white} />
              <Box 
              px={1} 
              rounded="full" 
              position="absolute" 
              top={-13} 
              left={2} 
              bg={Colors.black}
              _text={{
                color:Colors.white, 
                fontSize: "11px",
              }}
              >
                0
              </Box>
           </Pressable>
        </HStack>
    );
}

export default HomeSearch ; 