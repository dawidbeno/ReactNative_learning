import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import { goals } from "../data";

export function GoalsScreen(){

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Fitness Goals</Text>
        <Text style={globalStyles.subtitle}>Track your targets</Text>
      </View>
      
      {goals.map((goal, index) => (
        <View key={index} style={styles.goalCard}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalProgress}>{goal.progress}% Complete</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
     goalCard: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  goalProgress: {
    fontSize: 14,
    color: '#FF6B35',
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
})