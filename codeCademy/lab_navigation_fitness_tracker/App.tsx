import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { WorkoutDetailScreen } from './components/WorkoutDetailScreen';
import { WorkoutsScreen } from './components/WorkoutsScreen';


export type WorkoutStackParamList = {
  Workouts: undefined;
  WorkoutDetail: { workoutName: string };
};

export type ProgressStackParamList = {
  Progress: undefined;
  Goals: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};


type RootTabParamList = {
  WorkoutsTab: NavigatorScreenParams<WorkoutStackParamList>,
  ProgressTab: NavigatorScreenParams<ProgressStackParamList>,
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>
}

// Main App
const App = () => {
  console.log("App started");
  return (
   <></>
  );
};


export default App;