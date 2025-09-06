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
    title: "What is a Binary Tree?",
    content:
      "A Binary Tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.",
  },
  {
    id: "2",
    title: "Characteristics of a Binary Tree",
    content:
      "✔ Each node has at most two children.\n" +
      "✔ The topmost node is called the root.\n" +
      "✔ Nodes with no children are called leaf nodes.\n" +
      "✔ There are no cycles in a binary tree.",
  },
  {
    id: "3",
    title: "Binary Tree Operations",
    content:
      "• Insertion: Add a node to the binary tree.\n" +
      "• Deletion: Remove a node from the binary tree.\n" +
      "• Traversals: Visit all nodes (Preorder, Inorder, Postorder, Level Order).",
  },
  {
    id: "4",
    title: "Applications of Binary Trees",
    content:
      "✔ Used to represent hierarchical data (e.g., file systems).\n" +
      "✔ Used in expression parsing and evaluation.\n" +
      "✔ Foundation for binary search trees, heaps, and other advanced structures.\n" +
      "✔ Useful in routing algorithms and AI decision trees.",
  },
  {
    id: "5",
    title: "Advantages of Binary Trees",
    content:
      "✔ Simple structure, easy to understand.\n✔ Efficient for hierarchical data.\n✔ Basis for many other tree structures.",
  },
  {
    id: "6",
    title: "Disadvantages of Binary Trees",
    content:
      "✘ Not always balanced, leading to inefficiency in certain operations.\n✘ More complex to implement than arrays or linked lists.",
  },
  {
    id: "7",
    title: "Time Complexity of Binary Tree Operations",
    content:
      "• Insertion: O(n) in worst case.\n" +
      "• Deletion: O(n) in worst case.\n" +
      "• Traversal: O(n).\n" +
      "• Search: O(n) as tree may not be ordered.",
  },
  {
    id: "8",
    title: "Java Code of Binary Tree",
    content:
    `public class BinaryTree {
    class Node {
        int key;
        Node left, right;
        Node(int item) { key = item; left = right = null; }
    }

    Node root;

    void insert(int value) { root = insertRec(root, value); }

    Node insertRec(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.key) root.left = insertRec(root.left, value);
        else if (value > root.key) root.right = insertRec(root.right, value);
        return root;
    }

    void inorder() { inorderRec(root); }

    void inorderRec(Node node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.key + " ");
            inorderRec(node.right);
        }
    }

    // Main method
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);

        System.out.println("In-order traversal:");
        tree.inorder(); // Output: 20 30 40 50 60 70 80
    }
}`
  },
  {
    id: "9",
    title: "C++ Code of Binary Tree",
    content: `#include <iostream>
#include <queue>

// Node class
template <typename T>
class Node {
public:
    T data;
    Node* left;
    Node* right;

    Node(T value) : data(value), left(nullptr), right(nullptr) {}
};

// BinaryTree class
template <typename T>
class BinaryTree {
private:
    Node<T>* root;

    void inorderRecursive(Node<T>* node) {
        if (node != nullptr) {
            inorderRecursive(node->left);
            std::cout << node->data << " ";
            inorderRecursive(node->right);
        }
    }

public:
    BinaryTree() : root(nullptr) {}

    void insertNode(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (root == nullptr) {
            root = newNode;
            return;
        }
        std::queue<Node<T>*> q;
        q.push(root);
        while (!q.empty()) {
            Node<T>* current = q.front();
            q.pop();
            if (current->left == nullptr) {
                current->left = newNode;
                return;
            } else {
                q.push(current->left);
            }
            if (current->right == nullptr) {
                current->right = newNode;
                return;
            } else {
                q.push(current->right);
            }
        }
    }

    void inorder() {
        inorderRecursive(root);
        std::cout << std::endl;
    }
};

// Test main function
int main() {
    BinaryTree<int> tree;
    tree.insertNode(10);
    tree.insertNode(20);
    tree.insertNode(30);
    tree.insertNode(40);
    tree.insertNode(50);

    std::cout << "Inorder traversal: ";
    tree.inorder();

    return 0;
}`
  },
  {
    id: "10",
    title: "Watch Binary Tree Explained Video",
    isVideo: true,
  },
];

export default function BinaryTreeScreen() {
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
  }

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
                  source={require("../../assets/videos/binary_tree_video.mp4")}
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
      <Text style={styles.sectionTitle}>BINARY TREE</Text>
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
