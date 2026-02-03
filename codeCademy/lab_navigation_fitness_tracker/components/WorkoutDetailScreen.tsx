import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import { workouts } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WorkoutStackParamList } from "../App";

type WorkoutDetailScreenProps = NativeStackScreenProps<WorkoutStackParamList, "WorkoutDetail">
export function WorkoutDetailScreen(){
  const workoutName = ""

  const workout = workouts.find(w => w.name === workoutName)
  
  if(!workout) {
    return (
        <View>
            <Text>Unknown Workout!</Text>
        </View>
    )
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>{workoutName}</Text>
        <Text style={globalStyles.subtitle}>Ready to start your workout?</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={globalStyles.sectionTitle}>Workout Overview</Text>
        <Text style={styles.description}>
          This {workout.name.toLowerCase()} session will help you build strength and endurance.
        </Text>
        <Text style={styles.description}>
          Difficulty: {workout.level}
        </Text>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Workout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
      content: {
    padding: 20,
  },
   description: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 24,
    marginBottom: 20,
  },
   startButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
})