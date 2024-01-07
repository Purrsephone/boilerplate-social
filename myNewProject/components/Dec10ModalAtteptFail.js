import { EvilIcons, AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import PublicPosts from "../BestPublicPosts";
const ProfilePic = require("./Profile.png");

// Dummy post data array
const posts = [
  {
    id: "1",
    username: "@NatureLover",
    topic: "Immigration",
    profilePic: require("./Profile.png"),
    content:
      "I voted yes on #HR2, American Energy Solutions for Lower Costs and More American Jobs Act. The bill combines several pieces of energy-related legislation that previously passed the House. The legislative package seeks to expand U.S. energy production and reduce bureaucratic red tape. It passed 226-191.",
    //image: "https://example.com/path/to/mountain.jpg", // Replace with your image path
    likes: 120,
    dislikes: 10,
  },
  {
    id: "2",
    username: "@CityExplorer",
    topic: "Housing",
    profilePic: require("./Profile.png"),
    content:
      "The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold... \
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold...The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold... \
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold...\
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold... \
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold...\
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold... \
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold...\
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold... \
      The city has its own charm as the sun sets. \
      The skyline against the orange glow is a sight to behold...",
    //image: "https://example.com/path/to/cityscape.jpg", // Replace with your image path
    likes: 175,
    dislikes: 5,
  },
  {
    id: "3",
    username: "@GourmetChef",
    topic: "Abortion",
    profilePic: require("./Profile.png"),
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
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const options = ["Save Post", "Report Post", "Share Post"];

  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionItem}
        onPress={() => {
          // Handle the option here
          console.log(`Selected option: ${option}`);
          toggleModal();
        }}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.postContainer}>
      {/* Circular Profile Picture + Username */}
      <View style={styles.profileUsernameContainer}>
        <View style={styles.profilePicContainer}>
          <Image source={post.profilePic} style={styles.profilePic} />
          <Text style={styles.usernameText}>{post.username}</Text>
        </View>
      </View>
      {/* Teal Topic Rectangle */}
      <View style={styles.greyRectangle}>
        {/* Topic */}
        <Text style={styles.caption}>{post.topic}</Text>
      </View>
      {/* Three Dots */}
      <TouchableOpacity onPress={toggleModal} style={styles.threeDots}>
        <AntDesign
          name="ellipsis1"
          size={24}
          style={styles.threeDotsText}
          color="white"
        />
      </TouchableOpacity>

      {/* Rest of your post content */}
      <View style={{ flex: 1 }}>
        {/* Use flex to make content expand */}
        <Text style={styles.postContent}>
          {showFullContent || post.content.length <= 400
            ? post.content
            : `${post.content.slice(0, 400)}...`}
        </Text>
        {post.content.length > 400 && (
          <TouchableOpacity onPress={toggleContent}>
            <Text style={styles.readMore}>
              {showFullContent ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Options</Text>
          </View>
          <View style={styles.modalContent}>{renderOptions()}</View>
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.modalCloseButton}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
    //flex: 1,
    backgroundColor: "black", // Black background
  },
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 20,
    paddingVertical: 50,
    marginBottom: 10,
    marginTop: 20,
    alignItems: "flex-start",
    flex: 1,
    overflowBottom: "hidden", //
    borderWidth: 2,
    borderColor: "grey",
  },
  profileUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 30,
    //paddingVertical: 5,
  },
  profilePicContainer: {
    marginRight: 20,
    //paddingBottom: 5,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginRight: 30,
    marginBottom: 8,

    flexDirection: "column",
    alignItems: "center",
    marginTop: -72, // Adjust this value to align it properly
  },
  usernameText: {
    color: "white",
    fontSize: 10,
    marginLeft: -22,
    fontWeight: "bold",
    //marginLeft: 2,
    //padding: 5,
    paddingBottom: 14,
    alignSelf: "center",
    marginTop: 2, // Adjust this value to align it properly
  },

  threeDots: {
    position: "absolute",
    top: -5,
    right: 10,
  },
  threeDotsText: {
    position: "absolute",
    top: 5,
    right: 10,
    fontSize: 24, // Adjust the font size to make the dots bigger
    color: "white", // Set th
  },
  greyRectangle: {
    // backgroundColor: "grey",
    position: "absolute",
    top: 0,
    right: 90,
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

  postContent: {
    color: "white",
    marginTop: 0,
    fontSize: 12,
    marginLeft: 15,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 1,
    width: "21%", // Added this width to control the width of interaction buttons
  },
  interactionButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  interactionCount: {
    color: "white",
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "bold",
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
    position: "absolute", // Add this line
    bottom: 0, // Add this line
    left: 0, // Add this line
    right: 0, // Add this line
  },
  statButton: {},
  statText: {
    color: "white",
  },
  readMore: {
    color: "#15bdbd",
    textAlign: "center",
    marginTop: 3,
    marginLeft: 248,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },

  modalHeader: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  modalContent: {
    marginTop: 10,
  },

  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  optionText: {
    fontSize: 16,
    color: "black",
  },

  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    alignItems: "center",
  },

  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
export default PublicPosts;
