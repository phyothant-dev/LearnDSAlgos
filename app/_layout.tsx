import { Stack } from "expo-router";

export default function RootLayout() {
  const modalScreens = [
    "overview",
    "data_structure",
    "arrays",
    "linked_list",
    "stacks",
    "pointers_page",
    "queues",
    "trees",
    "binary_trees",
    "binary_search_trees",
    "hashtable",
    "graph",
  ];
  const algorithm_list = [
    "search_algorithm",
    "sort_list",
  ];
  const recursion = [
    "recur",
    
  ];
  const search_algorithm_list = [
    "linear_search",
    "binary_search",
    "a_search",
    "interpolation",
    "algorithm",
    "ai_algorithm",
    "classification",
    "breadth_first_search",
    "depth_first_search",
  ];
  const sort_list = [
    "bubble_sort",
    "heap_sort",
    "merge_sort",
    "quick_sort",
    "selection_sort",
    "insertion_sort",
    "radix_sort",
    "counting_sort",
  ];
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {modalScreens.map((screen) => (
        <Stack.Screen
          key={screen}
          name={`(modals)/${screen}`}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}
       {algorithm_list.map((screen) => (
        <Stack.Screen
          key={screen}
          name={`(algorithm_list)/${screen}`}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}
      {search_algorithm_list.map((screen) => (
        <Stack.Screen
          key={screen}
          name={`(search_algorithm_list)/${screen}`}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}
      {sort_list.map((screen) => (
        <Stack.Screen
          key={screen}
          name={`(sort_list)/${screen}`}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}

     {recursion.map((screen) => (
        <Stack.Screen
          key={screen}
          name={`(recursion)/${screen}`}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}

    </Stack>
  );
}