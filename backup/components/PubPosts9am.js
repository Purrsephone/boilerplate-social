import { EvilIcons, AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/posts/postsOperations";
import { useEffect, useState } from "react";
//const ProfilePic = require("../assets/Profile.png");

// Dummy post data array
const posts = [
  {
    id: "1",
    username: "NatureLover",
    topic: "Immigration",
    profilePic: require("../assets/Profile.png"),
    content:
      "There is nothing more calming than an early morning hike in the mountains. The air is crisp, the sky a perfect blue...",
    //image: "https://example.com/path/to/mountain.jpg", // Replace with your image path
    likes: 120,
    dislikes: 10,
  },
  {
    id: "2",
    username: "CityExplorer",
    topic: "Housing",
    profilePic: require("../assets/Profile.png"),
    content:
      "The city has its own charm as the sun sets. The skyline against the orange glow is a sight to behold...",
    //image: "https://example.com/path/to/cityscape.jpg", // Replace with your image path
    likes: 175,
    dislikes: 5,
  },
  {
    id: "3",
    username: "GourmetChef",
    topic: "Abortion",
    profilePic: require("../assets/Profile.png"),
    content:
      "Food is not just sustenance, it is art. Presenting my latest creation, a fusion of flavors that will tantalize your taste buds...",
    //image: "https://example.com/path/to/dish.jpg", // Replace with your image path
    likes: 240,
    dislikes: 15,
  },
  // Add more posts as needed
];
const PostBlock = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.topicContainer}>
        <Text style={styles.topicText}>{post.topic}</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profilePicContainer}>
          <Image source={post.profilePic} style={styles.profilePic} />
        </View>
        <Text style={styles.usernameText}>{post.username}</Text>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.interactionButton}>
          <AntDesign name="dislike1" size={24} color="white" />
          <Text style={styles.interactionCount}>{post.dislikes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <AntDesign name="like1" size={24} color="white" />
          <Text style={styles.interactionCount}>{post.likes}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        {/* Add your statistics components here */}
        {/* For example: */}
        {/* <Text style={styles.statText}>Views: 936</Text> */}
        {/* <Text style={styles.statText}>Likes: 212</Text> */}
        {/* <TouchableOpacity style={styles.statButton}>
          <Text style={styles.statButtonText}>VIEW ALL STATISTICS</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export const PublicPosts = ({ navigation }) => {
  const renderPost = ({ item }) => <PostBlock post={item} />;

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39363d", // Change this to your desired background color
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    padding: 0,
    marginBottom: 10,
    alignItems: "flex-start",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "grey",
  },
  topicContainer2: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    alignItems: "flex-start",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#a1696f",
  },
  topicContainer: {
    backgroundColor: "#716d76",
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    width: 150,
    height: 35,
  },
  topicText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
    padding: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    padding: 8,
    borderColor: "#a1696f",
  },
  usernameText: {
    color: "white",
    marginTop: 30,
    justifyContent: "left",
    padding: 8,
    // ... other style properties
  },
  postContent: {
    color: "white",
    alignSelf: "flex-start",
    marginTop: 8,
    padding: 8,
    // ... other style properties
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 8,
    // ... other style properties
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    // ... other style properties
  },
  interactionCount: {
    color: "white",
    marginLeft: 4,
    // ... other style properties
  },
  footerContainer: {
    backgroundColor: "#716d76",
    alignSelf: "stretch",
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statButton: {
    // ... styles for the 'VIEW ALL STATISTICS' button
  },
  statText: {
    color: "white",
    // ... styles for the 'VIEW ALL STATISTICS' text
  },
  outerRectangle: {
    backgroundColor: "black",
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    flexDirection: "row",
  },
  profileContainer2: {
    padding: 10,
  },
  profileImage: {
    width: 80, // Adjust the profile picture size as needed
    height: 80, // Adjust the profile picture size as needed
    borderRadius: 40, // To make it circular
  },

  profilePicContainer: {
    marginRight: 10, // Add some margin between profile picture and content
  },
  greyRectangle: {
    backgroundColor: "grey",
    width: 150,
    height: 35,
    alignSelf: "flex-start", // Align it to the top of the outer black rectangle
    marginTop: 10, // Add some top margin
    marginBottom: 10, // Add some bottom margin
  },
  caption: {
    color: "white", // Change the text color as needed
    textAlign: "center",
  },
  // ... other styles
});

export default PublicPosts;
