import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import { workouts } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WorkoutStackParamList } from "../App";


type WorkoutsScreenProps = NativeStackScreenProps<WorkoutStackParamList, "Workouts">

export function WorkoutsScreen(){


  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Your Workouts</Text>
        <Text style={globalStyles.subtitle}>Choose a workout to get started</Text>
      </View>
      
      {workouts.map((workout, index) => (
        <Pressable 
          key={index}
          style={styles.card} 
          onPress={console.log}
        >
          <Text style={styles.cardTitle}>{workout.name}</Text>
          <Text style={styles.cardInfo}>Duration: {workout.duration}</Text>
          <Text style={styles.cardInfo}>Level: {workout.level}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
     card: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
})