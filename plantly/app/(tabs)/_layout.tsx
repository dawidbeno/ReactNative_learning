import { Tabs, Redirect, Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";

export default function Layout() {
    const hasFinishedOnboarding = useUserStore(
        (state) => state.hasFinishedOnboarding,
    );

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
                headerRight: () => (
                    <Link href="/new" asChild>
                        <Pressable hitSlop={20} style={{ marginRight: 18 }}>
                            <AntDesign 
                                name="plus-circle"
                                size={24}
                                color={theme.colorGreen}
                            />
                        </Pressable>
                    </Link>
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