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
    image: "https://example.com/path/to/cityscape.jpg", // Replace with your image path
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
    image: "https://example.com/path/to/dish.jpg", // Replace with your image path
    likes: 240,
    dislikes: 15,
  },
  // Add more posts as needed
];
//     /*Image source={{ uri: post.image }} style={styles.postImage}*/
const PostBlock = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.profileSection}>
        <Image source={post.profilePic} style={styles.profilePic} />
        <Text style={styles.usernameText}>{post.username}</Text>
      </View>
      <Text style={styles.topicText}>{post.topic}</Text>
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
        <TouchableOpacity style={styles.statButton}>
          <Text style={styles.statText}>VIEW ALL STATISTICS</Text>
        </TouchableOpacity>
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
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    padding: 19,
    marginBottom: 10,
    alignItems: "center",
  },
  profileSection: {
    alignSelf: "flex-start",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2, // Width of the border
    borderColor: "#a1696f", // Color of the border
  },
  usernameText: {
    color: "white",
    marginTop: 4,
    // ... other style properties
  },
  topicText: {
    color: "white",
    alignSelf: "center",
    marginTop: 16,
    // ... other style properties
  },
  postContent: {
    color: "white",
    alignSelf: "flex-start",
    marginTop: 8,
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
  statButton: {
    // ... styles for the 'VIEW ALL STATISTICS' button
  },
  statText: {
    color: "white",
    // ... styles for the 'VIEW ALL STATISTICS' text
  },
  // ... other styles
});

export default PublicPosts;
