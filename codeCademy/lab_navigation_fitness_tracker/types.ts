export type Workout = {
    name: string
    duration: string
    level: "Beginner" | "Intermediate" | "Advanced"
}

export type Goal = {
    title: string
    progress: number
}

export type Stat = {
    label: string
    value: string
    unit: "workouts" | "this week" | "days" | "burned"
}

