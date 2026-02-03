import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import { stats } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProgressStackParamList } from "../App";

type ProgressScreenProps = NativeStackScreenProps<ProgressStackParamList, "Progress">
export function ProgressScreen(){
 
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Your Progress</Text>
        <Text style={globalStyles.subtitle}>Keep up the great work!</Text>
      </View>
      
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statUnit}>{stat.unit}</Text>
          </View>
        ))}
      </View>
      
      <Pressable 
        style={globalStyles.primaryButton} 
        onPress={console.log}
      >
        <Text style={globalStyles.primaryButtonText}>View Goals</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
     statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '45%',
    margin: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 2,
  },
  statUnit: {
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
  },
})