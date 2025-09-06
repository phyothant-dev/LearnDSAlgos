import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Data Structure",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Algorithm",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "function-variant" : "function"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarLabel: "Quiz",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chat-question-outline" : "chat-question"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="code_editor"
        options={{
          tabBarLabel: "Code Editor",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "file-code-outline" : "file-code"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about_us"
        options={{
          tabBarLabel: "About Us",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "information-outline" : "information"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}
