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
    title: "What is a Tree?",
    content:
      "A Tree is a hierarchical data structure consisting of nodes, where each node has a parent and zero or more children. It starts with a root node and branches out to leaves.",
  },
  {
    id: "2",
    title: "Characteristics of Trees",
    content:
      "✔ Consists of nodes connected by edges.\n" +
      "✔ The topmost node is the root.\n" +
      "✔ Nodes with no children are called leaves.\n" +
      "✔ There are no cycles in a tree.",
  },
  {
    id: "3",
    title: "Types of Trees",
    content:
      "• Binary Tree: Each node has at most two children.\n" +
      "• Binary Search Tree (BST): Left child < Parent < Right child.\n" +
      "• AVL Tree: Self-balancing BST.\n" +
      "• Heap: Complete binary tree used in priority queues.\n" +
      "• Trie: Tree for storing strings efficiently.",
  },
  {
    id: "4",
    title: "Basic Tree Operations",
    content:
      "• Insertion: Add a node to the tree.\n" +
      "• Deletion: Remove a node from the tree.\n" +
      "• Traversal: Visit all nodes (Preorder, Inorder, Postorder, Level order).",
  },
  {
    id: "5",
    title: "Applications of Trees",
    content:
      "✔ Organizing hierarchical data (files, directories).\n" +
      "✔ Database indexing (B-trees).\n" +
      "✔ Implementing searching algorithms.\n" +
      "✔ Expression evaluation in compilers.",
  },
  {
    id: "6",
    title: "Advantages of Trees",
    content:
      "✔ Efficient searching and sorting (in BST).\n✔ Flexible structure for dynamic data.\n✔ Suitable for hierarchical relationships.",
  },
  {
    id: "7",
    title: "Disadvantages of Trees",
    content:
      "✘ Unbalanced trees can degrade performance.\n✘ Complex to implement compared to arrays or linked lists.",
  },
  {
    id: "8",
    title: "Tree Traversals Time Complexity",
    content:
      "• Preorder, Inorder, Postorder: O(n)\n" +
      "• Level Order: O(n)\n" +
      "• Search (in BST): O(log n) on average, O(n) in worst case.",
  },
  {
    id: "9",
    title: "Java Code for Tree",
    content: `// Node class represents a single node in the tree
class BinaryTree {
class Node {
    int key; // Data stored in the node
    Node left, right; // References to left and right children

    public Node(int item) {
        key = item;
        left = right = null; // Initialize children as null
    }
}


    Node root; // The root node of the tree

    BinaryTree() {
        root = null;
    }

    void insert(int value) {
        root = insertRec(root, value);
    }

    Node insertRec(Node root, int value) {
        if (root == null) {
            root = new Node(value);
            return root;
        }
        if (value < root.key) {
            root.left = insertRec(root.left, value);
        } else if (value > root.key) {
            root.right = insertRec(root.right, value);
        }
        return root;
    }

    public void traverseInOrder(Node node) {
        if (node != null) {
            traverseInOrder(node.left);
            System.out.print(node.key + " ");
            traverseInOrder(node.right);
        }
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.insert(50); tree.insert(30); tree.insert(70);
        tree.insert(20); tree.insert(40); tree.insert(60); tree.insert(80);

        System.out.println("In-order traversal of the binary tree:");
        tree.traverseInOrder(tree.root);
    }
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "C++ Code for Tree",
    content: `#include <iostream>

struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};

void inorderTraversal(Node* root) {
    if (root == nullptr) return;
    inorderTraversal(root->left);
    std::cout << root->data << " ";
    inorderTraversal(root->right);
}

int main() {
    Node* root = new Node(10);
    root->left = new Node(5);
    root->right = new Node(15);
    root->left->left = new Node(2);
    root->left->right = new Node(7);
    root->right->right = new Node(20);

    std::cout << "Inorder traversal of the binary tree: ";
    inorderTraversal(root);
    std::cout << std::endl;

    delete root->left->left;
    delete root->left->right;
    delete root->left;
    delete root->right->right;
    delete root->right;
    delete root;

    return 0;
}`,
    isCode: true,
  },
  {
    id: "11",
    title: "Watch Trees Explained Video",
    isVideo: true,
  },
];

export default function TreeScreen() {
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
            source={require("../../assets/videos/tree_video.mp4")}
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
      <Text style={styles.sectionTitle}>TREE</Text>
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
