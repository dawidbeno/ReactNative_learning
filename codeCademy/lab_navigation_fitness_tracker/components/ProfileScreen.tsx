import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../App";

type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, "Profile">
export function ProfileScreen(){
  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@email.com</Text>
      </View>
      
      <View style={styles.menuContainer}>
        <Pressable 
          style={styles.menuItem} 
          onPress={console.log}
        >
          <Text style={styles.menuText}>App Settings</Text>
          <Text style={styles.menuArrow}>&gt;</Text>
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Text style={styles.menuText}>Workout Preferences</Text>
          <Text style={styles.menuArrow}>&gt;</Text>
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Text style={styles.menuText}>Help & Support</Text>
          <Text style={styles.menuArrow}>&gt;</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
     profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
    profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#8E8E93',
  },
    avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
     menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  menuArrow: {
    fontSize: 16,
    color: '#8E8E93',
  },
})