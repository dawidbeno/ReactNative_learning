import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";

export function SettingsScreen(){
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Settings</Text>
        <Text style={globalStyles.subtitle}>Customize your experience</Text>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={globalStyles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Workout Reminders</Text>
          <Text style={styles.settingValue}>On</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Progress Updates</Text>
          <Text style={styles.settingValue}>Weekly</Text>
        </View>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={globalStyles.sectionTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Units</Text>
          <Text style={styles.settingValue}>Imperial</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Theme</Text>
          <Text style={styles.settingValue}>Light</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    settingsSection: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  settingValue: {
    fontSize: 16,
    color: '#FF6B35',
  },
})