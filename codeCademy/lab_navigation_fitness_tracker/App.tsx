import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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

const Tab = createBottomTabNavigator<RootTabParamList>();
const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

// Create a component for the Workout Stack Navigator
const WorkoutsTabNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen 
        name="Workouts" 
        component={WorkoutsScreen} 
        options={{ title: "Workouts" }}
      />
      <WorkoutStack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetailScreen} 
        options={{ title: "Workout Details" }}
      />
    </WorkoutStack.Navigator>
  );
};

// Main App
const App = () => {
  console.log("App started");
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E7',
          paddingTop: 5,
        },
      }}>
        <Tab.Screen 
          name="WorkoutsTab" 
          component={WorkoutsTabNavigator}
          options={{ title: "Workouts" }}
        />
        {/* You'll add ProgressTab and ProfileTab here similarly */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;