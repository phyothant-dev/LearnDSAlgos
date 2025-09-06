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
  isCode?: boolean;
};

const data: Item[] = [
  {
    id: "1",
    title: "What is Depth First Search?",
    content:
      "Depth First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.",
  },
  {
    id: "2",
    title: "How DFS Algorithm Works",
    content:
      "DFS uses a stack (or recursion). It starts from the source node, explores one neighbor fully before moving to the next.",
  },
  {
    id: "3",
    title: "Performance Analysis of DFS",
    content:
      "The time complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges.",
  },
  {
    id: "4",
    title: "Depth First Search Algorithm (Pseudocode)",
    isCode: true,
    content: `procedure DFS(Graph, start_vertex)
    create a stack S
    mark start_vertex as visited
    push start_vertex into S

    while S is not empty do
        current ← pop S
        for each neighbor v of current do
            if v is not visited then
                mark v as visited
                push v into S
    end while
end procedure`,
  },
  {
    id: "5",
    title: "Time Complexity of DFS",
    content: "Time Complexity: O(V + E)\nSpace Complexity: O(V)",
  },
  {
    id: "6",
    title: "Advantages of DFS",
    content: "1. Requires less memory compared to BFS\n2. Useful for topological sorting and cycle detection",
  },
  {
    id: "7",
    title: "Disadvantages of DFS",
    content:
      "1. Does not always find the shortest path\n2. Can get trapped in deep infinite branches without cycle checks",
  },
  {
    id: "8",
    title: "Java Code for DFS",
    isCode: true,
    content: `import java.util.*;

public class GraphDFS {
    private int V;
    private LinkedList<Integer> adj[];

    GraphDFS(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i) adj[i] = new LinkedList();
    }

    void addEdge(int v, int w) { adj[v].add(w); }

    void DFSUtil(int v, boolean visited[]) {
        visited[v] = true;
        System.out.print(v + " ");
        for (int n : adj[v]) {
            if (!visited[n]) DFSUtil(n, visited);
        }
    }

    void DFS(int v) {
        boolean visited[] = new boolean[V];
        DFSUtil(v, visited);
    }

    public static void main(String args[]) {
        GraphDFS g = new GraphDFS(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 0);
        g.addEdge(2, 3);
        g.addEdge(3, 3);

        System.out.println("Depth First Traversal (starting from vertex 2):");
        g.DFS(2);
    }
}`,
  },
  {
    id: "9",
    title: "C++ Code for DFS",
    isCode: true,
    content: `#include <iostream>
#include <list>
using namespace std;

class Graph {
    int V;
    list<int>* adj;
    void DFSUtil(int v, bool visited[]);
public:
    Graph(int V);
    void addEdge(int v, int w);
    void DFS(int v);
};

Graph::Graph(int V) {
    this->V = V;
    adj = new list<int>[V];
}

void Graph::addEdge(int v, int w) {
    adj[v].push_back(w);
}

void Graph::DFSUtil(int v, bool visited[]) {
    visited[v] = true;
    cout << v << " ";
    for (auto i = adj[v].begin(); i != adj[v].end(); ++i)
        if (!visited[*i]) DFSUtil(*i, visited);
}

void Graph::DFS(int v) {
    bool* visited = new bool[V];
    for (int i = 0; i < V; i++) visited[i] = false;
    DFSUtil(v, visited);
}

int main() {
    Graph g(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);

    cout << "Depth First Traversal (starting from vertex 2): ";
    g.DFS(2);
    return 0;
}`,
  },
  {
    id: "10",
    title: "Watch DFS Explained Video",
    isVideo: true,
  },
];

export default function Depth_First_Search() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
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
      {expandedItem === item.id &&
        (item.isVideo ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/dfs.mp4")} // ✅ DFS video
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={[styles.content, item.isCode && styles.codeBlock]}>
            {item.content}
          </Text>
        ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>DEPTH FIRST SEARCH (DFS)</Text>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  card: {
    backgroundColor: "#FAF3FF",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  row: { flexDirection: "row", alignItems: "center" },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  title: { fontSize: 16, fontWeight: "bold", flexShrink: 1 },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "monospace",
  },
});
