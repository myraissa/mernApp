import { Text, Flex, ScrollView, Pressable, Box, Heading, View } from 'native-base'
import products from "../data/Products";
import Colors from "../data/color";
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';



function HomeProduct ()  {
  const navigation = useNavigation()
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://example.com/api/data')
    .then(response => setData(response.data))
    .catch(error => console.log(error));
  }, []);
  
    return (
      <View>
        <Text>Liste de données :</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.nom}</Text>}
          keyExtractor={(item, index) => index.toString()}
          
        />
      </View>
    );
}
  
export default HomeProduct;


{/*function HomeProduct() {
    const navigation = useNavigation();
    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <Flex
             flexWrap="wrap" 
             direction="row" 
             justifyContent="space-between"
             px={6}
            >
              {
                products.map((product) =>(
                    <Pressable
                     onPress={() => navigation.navigate("Single", product)}
                     key={product._id} 
                     w="47%" 
                     bg={Colors.white} 
                     rounded="md" 
                     shadow={3} 
                     pt={0.3}
                     my={3} 
                     pb={2} 
                     overflow="hidden"
                    >
                        <Image
                         source={{ uri: product.image }} 
                         alt={product.name} 
                         w="full" 
                         h={24} 
                         resizeMode="contain"
                        />
                        <Box px={4} pt={1}>
                            <Text fontSize={10} mt={1} isTruncated w="full">
                                {product.name}
                            </Text>
                        </Box>
                    </Pressable>
                ))
              }  
            </Flex>
        </ScrollView>
    );
}

export default HomeProduct;
*/}