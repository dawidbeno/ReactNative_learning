import React from "react"
import { Pressable, PressableProps, Text, View } from "react-native";
import { globalStyles } from "../theme";

export interface AppButton extends Omit<PressableProps, "children"> {
  label: string
}
export function AppButton({ label, disabled, ...rest }: AppButton) {
  // Task 4 and 5: Update the JSX below
  return (
    <View
      // style={() => [globalStyles.button, disabled && globalStyles.disabled, { width: "100%" }]}
      // {...rest}
    >
      <Text style={globalStyles.buttonText}>Button</Text>
    </View>
  )
}