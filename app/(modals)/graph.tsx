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
    title: "What is a Graph?",
    content:
      "A Graph is a data structure consisting of nodes (vertices) connected by edges. It models relationships like networks, dependencies, and paths.",
  },
  {
    id: "2",
    title: "Types of Graphs",
    content:
      "1. Directed vs Undirected\n2. Weighted vs Unweighted\n3. Cyclic vs Acyclic\n4. Connected vs Disconnected",
  },
  {
    id: "3",
    title: "Graph Representation",
    content:
      "• Adjacency Matrix: 2D array indicating edges\n• Adjacency List: Each node stores a list of neighbors",
  },
  {
    id: "4",
    title: "DFS Pseudocode",
    content: `function DFS(node):
  mark node as visited
  for each neighbor of node:
    if neighbor not visited:
      DFS(neighbor)`,
    isCode: true,
  },
  {
    id: "5",
    title: "A graph using an adjacency list in C++",
    content: `#include <iostream>
#include <list>
#include <map>
using namespace std;

class Graph {
    map<int, list<int> >
        adjList; // Adjacency list to store the graph

public:
    // Function to add an edge between vertices u and v of
    // the graph
    void add_edge(int u, int v)
    {
        // Add edge from u to v
        adjList[u].push_back(v);
        // Add edge from v to u because the graph is
        // undirected
        adjList[v].push_back(u);
    }

    // Function to print the adjacency list representation
    // of the graph
    void print()
    {
        cout << "Adjacency list for the Graph: " << endl;
        // Iterate over each vertex
        for (auto i : adjList) {
            // Print the vertex
            cout << i.first << " -> ";
            // Iterate over the connected vertices
            for (auto j : i.second) {
                // Print the connected vertex
                cout << j << " ";
            }
            cout << endl;
        }
    }
};

int main()
{
    // Create a graph object
    Graph g;

    // Add edges to create the graph
    g.add_edge(1, 0);
    g.add_edge(2, 0);
    g.add_edge(1, 2);

    // Print the adjacency list representation of the graph
    g.print();
    return 0;
}`
  },
  {
    id: "6",
    title: "BFS Pseudocode",
    content: `function BFS(start):
  create a queue Q
  enqueue start into Q
  mark start as visited
  while Q is not empty:
    node = dequeue Q
    for each neighbor of node:
      if neighbor not visited:
        enqueue neighbor into Q
        mark neighbor as visited`,
    isCode: true,
  },
  {
    id: "7",
    title: "A graph using an adjacency matrix in C++",
    content: `
#include <iostream>
#include <vector>
using namespace std;

class Graph {
    // Adjacency matrix to store graph edges
    vector<vector<int> > adj_matrix;

public:
    // Constructor to initialize the graph with 'n' vertices
    Graph(int n)
    {
        adj_matrix
            = vector<vector<int> >(n, vector<int>(n, 0));
    }

    // Function to add an edge between vertices 'u' and 'v'
    // of the graph
    void add_edge(int u, int v)
    {
        // Set edge from u to v
        adj_matrix[u][v] = 1;
        // Set edge from v to u (for undirected graph)
        adj_matrix[v][u] = 1;
    }

    // Function to print the adjacency matrix representation
    // of the graph
    void print()
    {
        // Get the number of vertices
        cout << "Adjacency Matrix for the Graph: " << endl;
        int n = adj_matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << adj_matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main()
{
    // Number of vertices
    int n = 4;
    // Create a graph with 4 vertices
    Graph g(n);

    // Adding the specified edges in the graph
    g.add_edge(0, 1);
    g.add_edge(0, 2);
    g.add_edge(1, 3);
    g.add_edge(2, 3);

    // Print the adjacency matrix representation of the
    // graph
    g.print();
    return 0;
}`
  },
  {
    id: "8",
    title: "Java Code for Graph",
    content: `import java.util.*;

public class Graph<T> {
    private final Map<T, List<T>> adjList;

    public Graph() {
        adjList = new HashMap<>();
    }

    // Adds a new vertex to the graph
    public void addVertex(T vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
    }

    // Adds an edge between two vertices
    public void addEdge(T source, T destination, boolean bidirectional) {
        addVertex(source);       // Ensure source exists
        addVertex(destination);  // Ensure destination exists

        // Avoid duplicate edges (optional but tidy)
        if (!adjList.get(source).contains(destination)) {
            adjList.get(source).add(destination);
        }
        if (bidirectional && !adjList.get(destination).contains(source)) {
            adjList.get(destination).add(source);
        }
    }

    // Returns the list of adjacent vertices for a given vertex
    public List<T> getAdjVertices(T vertex) {
        return adjList.getOrDefault(vertex, Collections.emptyList());
    }

    // Prints the graph
    public void printGraph() {
        for (Map.Entry<T, List<T>> entry : adjList.entrySet()) {
            System.out.print(entry.getKey() + " -> ");
            for (T neighbor : entry.getValue()) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Graph<String> graph = new Graph<>();

        // Add vertices
        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addVertex("D");

        // Add edges (true for bidirectional, false for directed)
        graph.addEdge("A", "B", true);
        graph.addEdge("A", "C", true);
        graph.addEdge("B", "D", true);
        graph.addEdge("C", "D", true);
        graph.addEdge("D", "A", false); // directed edge D -> A

        System.out.println("Graph representation:");
        graph.printGraph();

        System.out.println("Adjacent vertices of A: " + graph.getAdjVertices("A"));
        System.out.println("Adjacent vertices of D: " + graph.getAdjVertices("D"));
    }
}
`
  },
  {
    id: "9",
    title: "Dijkstra's Algorithm Pseudocode",
    content: `function Dijkstra(graph, source):
  set distance[source] = 0, others = ∞
  create priority queue Q with source
  while Q not empty:
    u = node in Q with smallest distance
    for each neighbor v of u:
      alt = distance[u] + weight(u,v)
      if alt < distance[v]:
        distance[v] = alt
        update Q with distance[v]`,
    isCode: true,
  },
  {
    id: "10",
    title: "Watch Graph Algorithms Video",
    isVideo: true,
  },
];

export default function Graph() {
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
                    source={require("../../assets/videos/graph.mp4")}
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
      <Text style={styles.sectionTitle}>GRAPH</Text>
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
    color: "#007bff",
    marginTop: 20,
    textAlign: "center",
  },
  content: { marginTop: 10, fontSize: 18, color: "#333" },
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
