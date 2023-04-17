import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TipsAndResources = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Tips and Resources</Text>
      <Text style={styles.sectionText}>
        Organizing a successful donation can be challenging, but with the right tools and resources, it can be easier than you think! Here are some tips and resources to help you get started:
      </Text>
      <Text style={styles.sectionList}>
        - Set clear goals and expectations for the meeting
      </Text>
      <Text style={styles.sectionList}>
        - Select a location that is convenient and comfortable for both parties.
      </Text>
      <Text style={styles.sectionList}>
        - Create a compelling story or message that resonates with your audience
      </Text>
      <Text style={styles.sectionList}>
        - Be respectful and courteous: Treat the other person with respect and courtesy throughout the meeting.
      </Text>
      <Text style={styles.sectionList}>
        - Thank your donors and keep them updated on your progress
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center'
  },
  sectionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionList: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default TipsAndResources;
