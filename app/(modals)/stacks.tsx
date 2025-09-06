import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from 'expo-clipboard';
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
  isCode?: boolean;
  isVideo?: boolean;
};

const data: Item[] = [
  {
    id: "1",
    title: "What is a Stack?",
    content:
      "A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle. The last element added to the stack is the first one to be removed.",
  },
  {
    id: "2",
    title: "Characteristics of Stacks",
    content:
      "✔ Follows LIFO order.\n" +
      "✔ Supports two main operations: Push and Pop.\n" +
      "✔ Can be implemented using arrays or linked lists.",
  },
  {
    id: "3",
    title: "Basic Operations on Stacks",
    content:
      "• Push: Add an element to the top of the stack.\n" +
      "• Pop: Remove the top element from the stack.\n" +
      "• Peek/Top: Retrieve the top element without removing it.\n" +
      "• isEmpty: Check whether the stack is empty.",
  },
  {
    id: "4",
    title: "Applications of Stacks",
    content:
      "✔ Function call management (recursion).\n" +
      "✔ Undo/Redo functionality in editors.\n" +
      "✔ Syntax parsing (compilers).\n" +
      "✔ Expression evaluation (postfix, prefix).",
  },
  {
    id: "5",
    title: "Advantages of Stacks",
    content:
      "✔ Easy to implement.\n✔ Useful in backtracking algorithms.\n✔ Manages function calls efficiently.",
  },
  {
    id: "6",
    title: "Disadvantages of Stacks",
    content:
      "✘ Limited size if implemented with arrays (fixed size).\n✘ Random access is not allowed.\n✘ Overflow/Underflow conditions must be handled.",
  },
  {
    id: "7",
    title: "Time Complexity of Stack Operations",
    content:
      "• Push: O(1)\n• Pop: O(1)\n• Peek: O(1)\n• Search: O(n)",
  },
  {
    id: "8",
    title: "Java Code for Stack",
    content: `import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        // Create a new Stack of Strings
        Stack<String> books = new Stack<>();

        // Push elements onto the stack
        books.push("The Great Gatsby");
        books.push("To Kill a Mockingbird");
        books.push("1984");

        System.out.println("Stack after pushes: " + books);

        // Peek at the top element without removing it
        String topBook = books.peek();
        System.out.println("Top element (peek): " + topBook);

        // Pop elements from the stack
        String poppedBook1 = books.pop();
        System.out.println("Popped element 1: " + poppedBook1);
        System.out.println("Stack after first pop: " + books);

        String poppedBook2 = books.pop();
        System.out.println("Popped element 2: " + poppedBook2);
        System.out.println("Stack after second pop: " + books);

        // Check if the stack is empty
        boolean isEmpty = books.empty();
        System.out.println("Is stack empty? " + isEmpty);

        // Push another element
        books.push("Moby Dick");
        System.out.println("Stack after another push: " + books);

        // Search for an element
        int position = books.search("Moby Dick");
        System.out.println("Position of 'Moby Dick' from top: " + position);
    }
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "C++ Code for Stack",
    content: `#include <iostream>
#include <stack> // Required for std::stack

int main() {
    std::stack<int> myStack; // Creates a stack of integers

    // Push elements onto the stack
    myStack.push(10);
    myStack.push(20);
    myStack.push(30);

    // Access the top element
    std::cout << "Top element: " << myStack.top() << std::endl;

    // Check if the stack is empty
    if (!myStack.empty()) {
        std::cout << "Stack is not empty." << std::endl;
    }

    // Get the size of the stack
    std::cout << "Stack size: " << myStack.size() << std::endl;

    // Pop elements from the stack
    while (!myStack.empty()) {
        std::cout << "Popping: " << myStack.top() << std::endl;
        myStack.pop();
    }

    // Check if the stack is empty after popping
    if (myStack.empty()) {
        std::cout << "Stack is now empty." << std::endl;
    }

    return 0;
}`,
    isCode: true,
  },
  {
    id: "11",
    title: "Watch Stack Explained Video",
    isVideo: true,
  },
];

export default function StackScreen() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

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
            onPress={() => copyToClipboard(item.content || "", item.id)}
            style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}
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
            source={require("../../assets/videos/stacks_video.mp4")}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={[styles.content, item.isCode && styles.codeBlock]}>
            {item.content}
          </Text>
        )
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>STACK</Text>
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
    fontSize: 18,
    color: "#333",
  },
  codeBlock: {
    fontFamily: "monospace",
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
});
