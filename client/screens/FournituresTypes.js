import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Types = () => {
    const types = [
        {
            id: "0",
            Image:"https://img.freepik.com/vecteurs-premium/vector-cartoon-bleu-rose-cartable-sac-dos-retour-ecole_277625-1883.jpg?w=2000",
            name:"Bags",
        },
        {
            id: "1",
            Image:"https://img.freepik.com/premium-vector/book-cartoon_22350-95.jpg?w=2000",
            name:"Books",
        },
        {
            id: "2",
            Image:"https://static.vecteezy.com/system/resources/previews/010/919/591/original/notepad-closed-notebook-for-writing-school-book-or-textbook-for-studying-flat-cartoon-free-vector.jpg",
            name:"NoteBooks",
        },
        {
            id: "3",
            Image:"https://cdn4.vectorstock.com/i/1000x1000/87/23/dictionary-of-english-language-icon-cartoon-style-vector-10808723.jpg",
            name:"Dictionaries",
        },
        {
            id: "4",
            Image:"https://t3.ftcdn.net/jpg/01/95/11/56/360_F_195115692_wh4bwByEhU0JgCP7uCSzR59C7hoLzVqm.jpg",
            name:"Pens",
        },
         {
            id: "5",
            Image:"https://static.vecteezy.com/system/resources/previews/004/939/990/original/artistic-paints-and-paintbrush-art-supplies-for-painting-and-drawing-illustration-in-cartoon-flat-style-art-set-materials-for-children-and-adult-creativity-vector.jpg",
            name:"Drawing supplies",
        }
    ]
    return(
        <View style={{margin: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop:10, marginBottom:10}}>
             Most needed supplies
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {types.map((item,index)=> (
                    <View key={index}> 
                        <Image source={{uri:item.Image}} style={{width: 60, height: 60, borderRadius: 30, margin: 10}}/>
                        <Text style={{marginTop: 6, textAlign:'center'}}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Types ;
