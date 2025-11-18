import { Tabs, Redirect } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../../theme";

const hasFinishedOnboarding = false;

export default function Layout() {
    if (!hasFinishedOnboarding) {
        return <Redirect href="/onboarding" />;
    }
    
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="home" color={color} size={size} />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <Feather name="user" color={color} size={size} />
                ),
            }}
        />  
    </Tabs>
  );
}