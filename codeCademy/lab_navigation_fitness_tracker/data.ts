import { Goal, Stat, Workout } from "./types";

  export const workouts: Workout[] = [
    { name: 'Strength Training', duration: '45 min', level: 'Intermediate' },
    { name: 'Cardio Blast', duration: '30 min', level: 'Beginner' },
    { name: 'HIIT Workout', duration: '20 min', level: 'Advanced' },
  ];


export const goals: Goal[] = [
      { title: 'Workout 5 times this week', progress: 80 },
    { title: 'Burn 2000 calories', progress: 62 },
    { title: 'Complete 30-day streak', progress: 23 },
]

export const stats: Stat[] = [
    { label: 'This Week', value: '4', unit: 'workouts' },
    { label: 'Total Time', value: '2h 45m', unit: 'this week' },
    { label: 'Streak', value: '7', unit: 'days' },
    { label: 'Calories', value: '1,247', unit: 'burned' },
  ];