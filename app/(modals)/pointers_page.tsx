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
    title: "What is a Pointer?",
    content:
      "A Pointer is a variable that stores the memory address of another variable. Instead of holding a data value directly, it holds the location where the data is stored.",
  },
  {
    id: "2",
    title: "Characteristics of Pointers",
    content:
      "✔ Stores memory addresses as values.\n" +
      "✔ Allows dynamic memory management.\n" +
      "✔ Supports pointer arithmetic (in languages like C/C++).\n" +
      "✘ Requires careful handling to avoid errors like dangling pointers.",
  },
  {
    id: "3",
    title: "Basic Operations with Pointers",
    content:
      "• Declaration: Define a pointer variable.\n" +
      "• Initialization: Assign it an address using the '&' operator.\n" +
      "• Dereferencing: Access the value stored at the address using '*'.\n" +
      "• Pointer Arithmetic: Increment/decrement to traverse arrays.",
  },
  {
    id: "4",
    title: "Applications of Pointers",
    content:
      "✔ Dynamic memory allocation.\n" +
      "✔ Implementing data structures (linked lists, trees, graphs).\n" +
      "✔ Function arguments (pass by reference).\n" +
      "✔ Efficient array manipulation.",
  },
  {
    id: "5",
    title: "Advantages of Pointers",
    content:
      "✔ Efficient memory usage.\n✔ Enables dynamic data structures.\n✔ Supports fast array traversal and manipulation.",
  },
  {
    id: "6",
    title: "Disadvantages of Pointers",
    content:
      "✘ Pointer misuse can cause memory leaks.\n✘ Dangling or wild pointers can crash programs.\n✘ Complex to debug and maintain.",
  },
  {
    id: "7",
    title: "Java Code for Pointer",
    content: `
   public class Main {
    public static class MyObject {
        public int value;
    }

    public static void main(String[] args) {
        // Declaring a reference variable 'obj1'
        MyObject obj1;

        // Creating a new MyObject instance and assigning its reference to 'obj1'
        obj1 = new MyObject();
        obj1.value = 10;

        // Assigning the reference of 'obj1' to 'obj2'
        MyObject obj2 = obj1;
        obj2.value = 20;

        // Both obj1.value and obj2.value will be 20
        System.out.println(obj1.value); // Output: 20
        System.out.println(obj2.value); // Output: 20
    }
}
`,
    isCode: true,
  },
  {
    id: "8",
    title: "C++ Code for Pointer",
    content: `#include <iostream> // Include the iostream library for input/output operations

int main() {
    // Declare an integer variable
    int myVariable = 10;

    // Declare a pointer to an integer
    // The asterisk (*) indicates that 'ptr' is a pointer
    int* ptr; 

    // Initialize the pointer with the address of 'myVariable'
    // The address-of operator (&) gets the memory address of a variable
    ptr = &myVariable; 

    // Output the value of myVariable
    std::cout << "Value of myVariable: " << myVariable << std::endl;

    // Output the memory address of myVariable (using &myVariable)
    std::cout << "Address of myVariable: " << &myVariable << std::endl;

    // Output the value stored in the pointer (which is the address of myVariable)
    std::cout << "Value of ptr (address): " << ptr << std::endl;

    // Dereference the pointer to access the value at the address it holds
    std::cout << "Value pointed to by ptr: " << *ptr << std::endl;

    // Modify the value through the pointer
    *ptr = 20; 

    // Output the new value of myVariable (changed via the pointer)
    std::cout << "New value of myVariable: " << myVariable << std::endl;

    return 0; // Indicate successful program execution
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "Watch Pointers Explained Video",
    isVideo: true,
  },
];

export default function PointerScreen() {
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
            onPress={() => copyToClipboard(item.content || '', item.id)}
            style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}
          >
            {copiedItem === item.id ? (
              <Text style={{ color: '#28a745', fontWeight: 'bold' }}>Copied!</Text>
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
            source={require("../../assets/videos/pointer_video.mp4")}
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
      <Text style={styles.sectionTitle}>POINTER</Text>
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
