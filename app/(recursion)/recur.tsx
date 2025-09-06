import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from "expo-clipboard";
import React, { useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Item = {
  id: string;
  title: string;
  content?: string;
  isVideo?: boolean;
};

const data: Item[] = [
  { id: "1", title: "What is Recursion?", content: "Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem. This process continues until it reaches a base case, which stops further recursive calls." },
  { id: "2", title: "Principle of Recursion", content: "The principle of recursion is to break down a complex problem into smaller subproblems of the same type, solving each until reaching a base case." },
  { id: "3", title: "Key Concepts of Recursion", content: "The key concepts of recursion are: \n1. Base Case – the condition where recursion stops.\n2. Recursive Case – the part where the function calls itself.\n3. Smaller Subproblems – each recursive call works on a smaller instance of the original problem." },
  { id: "4", title: "Base Case of Recursion", content: "The base case is a stopping condition in a recursive function. For example, in factorial calculation, when n == 0, the function returns 1 without further recursion." },
  { id: "5", title: "Application of Recursion", content: "Applications of recursion include: \n1. Mathematical computations (factorial, Fibonacci).\n2. Tree and graph traversal.\n3. Divide and conquer algorithms (quick sort, merge sort).\n4. Solving puzzles (Towers of Hanoi)." },
  { id: "6", title: "Disadvantages of Recursion", content: "Disadvantages of recursion: \n1. Can cause stack overflow with deep recursion.\n2. Uses more memory due to function call stack.\n3. May be less efficient than iterative solutions." },
  { id: "7", title: "Advantages of Recursion", content: "Advantages of recursion: \n1. Simplifies complex problems.\n2. Reduces code size and improves readability.\n3. Ideal for problems with natural recursive structure like trees and graphs." },
  { 
    id: "8", 
    title: "Java Code for Recursion", 
    content: `public class FactorialCalculator {

    public static int factorial(int n) {
        // Base case: factorial of 0 or 1 is 1
        if (n == 0 || n == 1) {
            return 1;
        } 
        // Recursive case: n * factorial of (n-1)
        else {
            return n * factorial(n - 1);
        }
    }

    public static void main(String[] args) {
        int number = 5;
        int result = factorial(number);
        System.out.println("Factorial of " + number + " is: " + result); // Output: Factorial of 5 is: 120
    }
}`
  },
  { 
    id: "9", 
    title: "C++ Code for Recursion", 
    content: `#include <iostream>

// Function to calculate factorial using recursion
int factorial(int n) {
    // Base case: if n is 0 or 1, factorial is 1
    if (n <= 1) {
        return 1;
    } 
    // Recursive case: n * factorial of (n-1)
    else {
        return n * factorial(n - 1);
    }
}

int main() {
    int num;
    std::cout << "Enter a non-negative integer: ";
    std::cin >> num;

    if (num < 0) {
        std::cout << "Factorial is not defined for negative numbers." << std::endl;
    } else {
        int result = factorial(num);
        std::cout << "Factorial of " << num << " = " << result << std::endl;
    }

    return 0;
}`
  },
  { id: "10", title: "Watch Recursion Explained Video", isVideo: true }
];

export default function Recursion() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      videoRef.current?.pauseAsync();
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
      <View style={styles.row}>
        <View style={styles.circle} />
        <Text style={styles.title}>{item.title}</Text>

        {expandedItem === item.id && item.content && (
          <TouchableOpacity
            onPress={() => copyToClipboard(item.content ?? "", item.id)}
            style={{ marginLeft: "auto" }}
          >
            {copiedItem === item.id ? (
              <Text style={{ color: "#28a745", fontWeight: "bold" }}>Copied!</Text>
            ) : (
             <Ionicons name="copy-outline" size={20} color="#007BFF" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {expandedItem === item.id && (
        item.isVideo ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/recursion.mp4")}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={styles.content}>{item.content}</Text>
        )
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>RECURSION</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={expandedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  card: {
    backgroundColor: "#FAF3FF",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
});
