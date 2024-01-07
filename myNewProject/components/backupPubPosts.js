/*
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



 const PostBlock = ({ post }) => {
   return (
     <View style={styles.postBlockContainer}>
       <View style={styles.postHeader}>
         <Text style={styles.postUsername}>{post.nickname}</Text>
         <Text style={styles.postTopic}>{post.title}</Text>
       </View>
       <Text style={styles.postContent}>{post.content}</Text>
       <View style={styles.interactionBar}>
         <TouchableOpacity style={styles.interactionButton}>
           <AntDesign name="dislike1" size={24} color="white" />
           <Text style={styles.interactionCount}>{post.dislikes}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.interactionButton}>
           <AntDesign name="like1" size={24} color="white" />
           <Text style={styles.interactionCount}>{post.likes}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.statsButton}>
           <Text style={styles.statsButtonText}>VIEW ALL STATISTICS</Text>
         </TouchableOpacity>
       </View>
     </View>
   );
 };

 // Styles for the PostBlock component
 const styles = StyleSheet.create({
   postBlockContainer: {
     backgroundColor: "#39363d",
     borderRadius: 10,
     padding: 16,
     marginBottom: 10,
   },
   postHeader: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     marginBottom: 8,
   },
   postUsername: {
     color: "white",
     fontWeight: "bold",
   },
   postTopic: {
     color: "white",
   },
   postContent: {
     color: "white",
     marginBottom: 8,
   },
   interactionBar: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
   },
   interactionButton: {
     flexDirection: "row",
     alignItems: "center",
   },
   interactionCount: {
     color: "white",
     marginLeft: 4,
   },
   statsButton: {
     // Your styles for the 'VIEW ALL STATISTICS' button
   },
   statsButtonText: {
     color: "white",
     // Your styles for the text inside the 'VIEW ALL STATISTICS' button
   },
   // Add any other styles you need
 });



export const PublicPosts = ({ item, navigation }) => {
  const userNickname = useSelector((state) => state.auth.nickname);
  const [post, setPost] = useState(null);
  const [likeCounter, setLikeCounter] = useState("#BDBDBD");

  const dispatch = useDispatch();
  const {
    photo,
    title,
    comments,
    photoLocation,
    inputLocation,
    userPhoto,
    nickname,
    id,
    likes,
  } = item;

  useEffect(() => {
    if (likes?.includes(userNickname)) {
      setLikeCounter("#FF6C00");
    } else {
      setLikeCounter("#BDBDBD");
    }
    const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
      setPost(doc.data());
    });
    return () => unsub();
  }, [likes]);

  if (!likes) {
    return;
  }

  const postRef = doc(db, "posts", id);

  const like = async () => {
    if (post.likes.includes(userNickname)) {
      const filteredLikes = post.likes.filter((like) => like !== userNickname);
      await updateDoc(postRef, {
        likes: filteredLikes,
      });
      setLikeCounter("#BDBDBD");
      dispatch(getAllPosts());
    } else {
      await updateDoc(postRef, {
        likes: [...post.likes, userNickname],
      });
      setLikeCounter("#FF6C00");
      dispatch(getAllPosts());
    }
  };
  return (
    <View style={{ marginBottom: 20, justifyContent: "center" }}>
      {navigation.getState().index === 0 && (
        <View style={styles.userBox}>
          <View style={styles.userInformation}>
            <Image
              source={{
                uri: userPhoto,
              }}
              style={styles.userPhoto}
            />
            <Text style={styles.userName}>{nickname}</Text>
          </View>
        </View>
      )}
      <Image
        source={{
          uri: photo,
        }}
        style={{ width: "100%", height: 240, borderRadius: 8 }}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.informationBox}>
        <TouchableOpacity
          style={styles.spanBox}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Comments", { photo, id })}
        >
          <EvilIcons
            name="comment"
            size={24}
            color={comments > 0 ? "#FF6C00" : "#BDBDBD"}
          />
          <Text
            style={
              comments === 0
                ? { ...styles.spanValue, color: "#BDBDBD" }
                : { ...styles.spanValue, color: "#212121" }
            }
          >
            {comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.spanBox} activeOpacity={0.8}>
          <AntDesign
            style={styles.spanLikeIcon}
            name="like2"
            size={18}
            color={likeCounter}
            onPress={like}
          />
          <Text
            style={
              likes?.length === 0
                ? { ...styles.spanValue, color: "#BDBDBD" }
                : { ...styles.spanValue, color: "#212121" }
            }
          >
            {likes?.length}
          </Text>
        </TouchableOpacity>
        <View style={styles.spanBoxLocation}>
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Map", { photoLocation })}
          >
            <Text style={styles.location}>{inputLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    borderRadius: 50,
    width: 35,
    height: 35,
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userName: {
    marginLeft: 10,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 5,
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  title: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  informationBox: {
    marginTop: 12,
    flexDirection: "row",
  },
  spanBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  spanLikeIcon: {
    marginLeft: 12,
  },
  spanBoxLocation: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  location: {
    alignItems: "flex-end",
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "right",
    textDecorationLine: "underline",
    color: "#212121",
  },
  spanValue: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
});
*/




const PostBlock = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
        <Text style={styles.usernameText}>{post.username}</Text>
        <Text style={styles.topicText}>{post.topic}</Text>
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
        <TouchableOpacity style={styles.statButton}>
          <Text style={styles.statText}>VIEW ALL STATISTICS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


/*
const PostBlock = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.profileSection}>
        <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
        <Text style={styles.usernameText}>{post.username}</Text>
      </View>
      <Text style={styles.topicText}>{post.topic}</Text>
      {/* ... rest of your component */}
    </View>
  );
};


// Update your styles:
const styles = StyleSheet.create({
  // ... other styles
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    alignItems: "center", // Center children horizontally
  },
  profileSection: {
    alignSelf: "flex-start", // Align the profile section to the start of the container
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },
  usernameText: {
    // ... existing styles for usernameText
    alignSelf: "center", // Center below the profile picture
    marginTop: 4, // Or any other value for spacing from the picture
  },
  topicText: {
    // ... existing styles for topicText
    alignSelf: "center", // Ensure the topic is centered in the post block
    marginTop: 16, // Or any other value for spacing from the profile section
  },
  // ... other styles
});

/*
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#39363d",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    justifyContent: "center",
  },
  usernameText: {
    color: "white",
    fontWeight: "bold",
  },
  topicText: {
    color: "white",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postContent: {
    color: "white",
    marginBottom: 8,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionCount: {
    color: "white",
    marginLeft: 4,
  },
  statButton: {
    // Additional styling for the 'VIEW ALL STATISTICS' button
  },
  statText: {
    color: "white",
    // Additional styling for the 'VIEW ALL STATISTICS' text
  },
  // Add any other styles you need
});
*/