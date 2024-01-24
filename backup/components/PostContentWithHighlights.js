import React from "react";
import { Text, View } from "react-native";

const PostContentWithHighlights = ({ content, highlights }) => {
  if (!content) {
    return null;
  }

  // Split the content into fragments based on the highlighted words
  const fragments = content.split(
    new RegExp(`(${highlights.join("|")})`, "gi")
  );

  return (
    <View>
      <Text>
        {fragments.map((fragment, index) => (
          <Text
            key={index}
            style={{
              color: highlights.includes(fragment.toLowerCase())
                ? "teal"
                : "white", // Highlighted text in red, regular text in black
            }}
          >
            {fragment}
          </Text>
        ))}
      </Text>
    </View>
  );
};

export default PostContentWithHighlights;
