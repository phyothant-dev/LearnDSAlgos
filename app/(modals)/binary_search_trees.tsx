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
    title: "What is a Binary Search Tree (BST)?",
    content:
      "A Binary Search Tree is a special type of binary tree where the left child of a node contains only values less than the parent node, and the right child contains only values greater than the parent node. This property makes searching efficient.",
  },
  {
    id: "2",
    title: "Characteristics of a BST",
    content:
      "✔ Each node has at most two children.\n" +
      "✔ Left subtree nodes < Parent node < Right subtree nodes.\n" +
      "✔ No duplicate values.\n" +
      "✔ Supports efficient search, insert, and delete operations.",
  },
  {
    id: "3",
    title: "BST Operations",
    content:
      "• Insertion: Insert a new value while maintaining BST properties.\n" +
      "• Deletion: Remove a node and rearrange tree to maintain BST properties.\n" +
      "• Searching: Find a value efficiently using the BST property.\n" +
      "• Traversals: Inorder (sorted output), Preorder, Postorder, Level Order.",
  },
  {
    id: "4",
    title: "Applications of BST",
    content:
      "✔ Used in search engines.\n" +
      "✔ Implementing associative arrays and sets.\n" +
      "✔ Efficient range queries and sorting.\n" +
      "✔ Base structure for AVL trees, Red-Black trees, etc.",
  },
  {
    id: "5",
    title: "Advantages of BST",
    content:
      "✔ Average time complexity for search, insert, delete: O(log n).\n✔ Provides ordered data.\n✔ Supports dynamic set operations efficiently.",
  },
  {
    id: "6",
    title: "Disadvantages of BST",
    content:
      "✘ Performance degrades to O(n) in worst case (unbalanced BST).\n✘ Needs balancing for optimal performance (AVL, Red-Black trees).",
  },
  {
    id: "7",
    title: "Time Complexity of BST Operations",
    content:
      "• Search: O(log n) on average, O(n) worst case.\n" +
      "• Insertion: O(log n) on average, O(n) worst case.\n" +
      "• Deletion: O(log n) on average, O(n) worst case.\n" +
      "• Traversal: O(n).",
  },
 
  {   id: "8",
    title: "Java Code for Binary Search Tree",
    content: `// Node class for BST
  public class BinarySearchTree {
class Node {
    int key;
    Node left, right;

    Node(int item) {
        key = item;
        left = right = null;
    }
}

// Binary Search Tree class

    Node root;

    BinarySearchTree() {
        root = null;
    }

    // Insert a key
    void insert(int key) {
        root = insertRec(root, key);
    }

    Node insertRec(Node root, int key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }

        if (key < root.key)
            root.left = insertRec(root.left, key);
        else if (key > root.key)
            root.right = insertRec(root.right, key);

        return root;
    }

    // Search for a key
    boolean search(int key) {
        return searchRec(root, key);
    }

    boolean searchRec(Node root, int key) {
        if (root == null) return false;
        if (root.key == key) return true;
        return (key < root.key) ? searchRec(root.left, key) : searchRec(root.right, key);
    }

    // In-order traversal
    void inorderTraversal(Node node) {
        if (node != null) {
            inorderTraversal(node.left);
            System.out.print(node.key + " ");
            inorderTraversal(node.right);
        }
    }

    // Main method
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();

        // Insert nodes
        bst.insert(50);
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(70);
        bst.insert(60);
        bst.insert(80);

        // Display in-order traversal
        System.out.println("In-order Traversal:");
        bst.inorderTraversal(bst.root);
        System.out.println();

        // Search for keys
        System.out.println("Search 40: " + bst.search(40)); // true
        System.out.println("Search 90: " + bst.search(90)); // false
    }
}
`
  },
   {
    id: "9",
    title: "C++ Code for Binary Search Tree",
    content: `
  #include <iostream>
using namespace std;

// Node class
class Node {
public:
    int key;
    Node* left;
    Node* right;

    Node(int value) {
        key = value;
        left = right = nullptr;
    }
};

// BST class
class BinarySearchTree {
private:
    Node* root;

    // Recursive insertion
    Node* insertRec(Node* node, int key) {
        if (node == nullptr)
            return new Node(key);

        if (key < node->key)
            node->left = insertRec(node->left, key);
        else if (key > node->key)
            node->right = insertRec(node->right, key);

        return node;
    }

    // Recursive in-order traversal
    void inorderRec(Node* node) {
        if (node != nullptr) {
            inorderRec(node->left);
            cout << node->key << " ";
            inorderRec(node->right);
        }
    }

    // Recursive search
    bool searchRec(Node* node, int key) {
        if (node == nullptr)
            return false;
        if (node->key == key)
            return true;
        if (key < node->key)
            return searchRec(node->left, key);
        else
            return searchRec(node->right, key);
    }

public:
    BinarySearchTree() {
        root = nullptr;
    }

    void insert(int key) {
        root = insertRec(root, key);
    }

    void inorder() {
        inorderRec(root);
        cout << endl;
    }

    bool search(int key) {
        return searchRec(root, key);
    }
};

// Main function
int main() {
    BinarySearchTree bst;

    // Insert nodes
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);
    bst.insert(60);
    bst.insert(80);

    // In-order traversal
    cout << "In-order traversal of BST: ";
    bst.inorder(); // Output: 20 30 40 50 60 70 80

    // Search examples
    cout << "Search 40: " << (bst.search(40) ? "Found" : "Not Found") << endl;
    cout << "Search 90: " << (bst.search(90) ? "Found" : "Not Found") << endl;

    return 0;
}
`
  },
  {
    id: "10",
    title: "Watch Binary Search Tree Explained Video",
    isVideo: true,
  },
];

export default function BSTScreen() {
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
                  source={require("../../assets/videos/binary_search_tree.mp4")}
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
      <Text style={styles.sectionTitle}>BINARY SEARCH TREE</Text>
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
