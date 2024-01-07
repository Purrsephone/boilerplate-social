import { EvilIcons, AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
      "I voted yes on #HR2, American Energy Solutions for Lower Costs and More American Jobs Act. The bill combines several pieces of energy-related legislation that previously passed the House. The legislative package seeks to expand U.S. energy production and reduce bureaucratic red tape. It passed 226-191.",
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
const { width, height } = Dimensions.get("window");
const spacing = width / 2 - width / 2;
const PostBlock = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      {/* Circular Profile Picture */}

      <View style={styles.profileUsernameContainer}>
        <View style={styles.profilePicContainer}>
          <Image source={post.profilePic} style={styles.profilePic} />
          <Text style={styles.usernameText}>{post.username}</Text>
        </View>
      </View>
      {/* Grey Rectangle */}
      <View style={styles.greyRectangle}>
        {/* Content inside Grey Rectangle */}
        <Text style={styles.caption}>{post.topic}</Text>
      </View>

      <TouchableOpacity style={styles.threeDots}>
        <Text style={styles.threeDotsText}>...</Text>
      </TouchableOpacity>
      {/* Rest of your post content */}

      <Text style={styles.postContent}>{post.content}</Text>
      {/* Interaction Buttons */}
      <View style={styles.interactionContainer}>
        <View style={styles.interactionButton}>
          <View style={styles.iconBox}>
            <AntDesign name="like1" size={20} color="white" />
          </View>
          <Text style={styles.interactionCount}>{post.likes}</Text>
        </View>
        <View style={styles.interactionButton}>
          <View style={styles.iconBox}>
            <AntDesign name="dislike1" size={20} color="white" />
          </View>
          <Text style={styles.interactionCount}>{post.dislikes}</Text>
        </View>
      </View>
      <View style={styles.upperfooterContainer}></View>
      <View style={styles.footerContainer}></View>
    </View>
  );
};
/*

      <View style={styles.footerContainer}>
        <Text style={styles.statText}>Views: 936</Text>
        <Text style={styles.statText}>Likes: 212</Text>
        <Text style={styles.statButtonText}>VIEW ALL STATISTICS</Text>
      </View>

*/
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
    backgroundColor: "black", // Black background
  },
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    paddingVertical: 50,
    marginBottom: 10,
    marginTop: 20,
    alignItems: "flex-start",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "grey",
  },
  profileUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 10,
    marginLeft: 15,
    position: "absolute",
    top: -28,
    right: 240,
  },
  profilePicContainer: {
    marginRight: 18,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40,
    //position: "absolute",
    top: 10,
    //right: 10,
  },
  usernameText: {
    color: "white",
    fontSize: 92, // Adjust the font size as needed
    position: "absolute",
    top: -28,
    right: 245,
  },
  profilePicContainer2: {
    marginLeft: 18,
  },
  threeDots: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  threeDotsText: {
    position: "absolute",
    top: 5,
    right: 10,
    fontSize: 24, // Adjust the font size to make the dots bigger
    color: "white", // Set th
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginBottom: 10,
  },
  greyRectangle: {
    // backgroundColor: "grey",
    position: "absolute",
    top: 0,
    right: 80,
    backgroundColor: "#15bdbd",
    width: "40%",
    height: 30,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: "center",
    //marginTop: 10,
    //marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  caption: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  usernameText: {
    color: "white",
    marginLeft: 15,
    fontSize: 8,
  },
  postContent: {
    color: "white",
    marginTop: 8,
    marginLeft: 15,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 18,
    width: "21%", // Added this width to control the width of interaction buttons
  },
  interactionButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  interactionCount: {
    color: "white",
    marginLeft: 4,
  },
  iconBox: {
    backgroundColor: "grey", // Grey box around the icon
    paddingHorizontal: 5, // Adjust the padding as needed
    paddingVertical: 3, // Adjust the padding as needed
    borderRadius: 4, // Adjust the border radius as needed
  },
  footerContainer: {
    backgroundColor: "#716d76",
    alignSelf: "stretch",
    padding: 8,
    height: 35,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statButton: {},
  statText: {
    color: "white",
  },
});
export default PublicPosts;
