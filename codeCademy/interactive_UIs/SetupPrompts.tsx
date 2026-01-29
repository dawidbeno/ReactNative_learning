import React, { useState } from "react"
import { Prompt, PromptDTO, PromptMood } from "../types"
import { FlatList, ScrollView, StyleSheet, Text, TextInput, Switch, View } from "react-native"
import { MoodButton } from "./MoodButton"
import { AppButton } from "./AppButton"
import { COLORS, FONT_SIZES, globalStyles, RADIUS, SPACING } from "../theme"

export interface SetupPromptsProps {
  prompts: Prompt[]
  onAddPrompt: (newPrompt: PromptDTO) => void
}
export function SetupPrompts({ prompts, onAddPrompt }: SetupPromptsProps) {
  const [promptName, setPromptName] = useState("Sleep")
  const [promptMood, setPromptMood] = useState<PromptMood | null>(null)
  const [promptPoints, setPromptPoints] = useState("1")
  const [isAddingPrompt, setIsAddingPrompt] = useState(false)
  const canAddPrompt = !!promptName && !!promptMood && !!promptPoints

  function onAddPromptHandler() {
    onAddPrompt({
      name: promptName,
      mood: "Cozy",
      points: Number(promptPoints)
    })

    setPromptName("Sleep")
    setPromptMood(null)
    setPromptPoints("1")
  }

  return (
    <View style={globalStyles.grow}>
      <View style={globalStyles.grow}>
        <ScrollView style={globalStyles.grow}>
          <View style={[globalStyles.inputContainer, { gap: SPACING.sm }]}>
          </View>
          <View style={[globalStyles.inputContainer, { gap: SPACING.sm }]}>
          </View>


          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputLabel}>Mood:</Text>
            <View style={[globalStyles.row, styles.radiogroup, { gap: SPACING.md }]}>
              <MoodButton
                mood="Cozy"
                selected={promptMood === "Cozy"}
                disabled={isAddingPrompt}
                onSelectMood={() => setPromptMood("Cozy")}
              />
              <MoodButton
                mood="Stress"
                selected={promptMood === "Stress"}
                disabled={isAddingPrompt}
                onSelectMood={() => setPromptMood("Stress")}
              />
              <MoodButton
                mood="Excited"
                selected={promptMood === "Excited"}
                disabled={isAddingPrompt}
                onSelectMood={() => setPromptMood("Excited")}
              />
            </View>
          </View>
          <AppButton
            label="Add"
            disabled={!canAddPrompt}
            onPressIn={() => setIsAddingPrompt(true)}
            onPress={onAddPromptHandler}
            onPressOut={() => setIsAddingPrompt(false)}
          />
        </ScrollView>
      </View>

      <View style={[globalStyles.grow, styles.promptsContainer]}>
        <Text style={globalStyles.sectionTitle}>My Prompts:</Text>
        {prompts.length ? (
          <ScrollView>
            {prompts.map(item => (
              <View key={item.id} style={styles.promptItem}>
                <Text style={[styles.itemText, styles.itemPrompt]}>{item.name}</Text>
                <Text style={[styles.itemText, styles.itemMood]}>{item.mood} +{item.points}</Text>
              </View>
            ))}
          </ScrollView>
        ) : <Text style={styles.noPromptsText}>No prompts yet!</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  radiogroup: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg
  },
  promptsContainer: {
    borderTopWidth: 1,
    paddingTop: SPACING.sm,
    borderTopColor: COLORS.textSecondary,
    marginTop: SPACING.lg,
  },
  promptItem: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
  },
  noPromptsText: {
    fontSize: FONT_SIZES.md,
    fontWeight: "400",
  },
  itemText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
  },
  itemPrompt: {
    fontWeight: "500"
  },
  itemMood: {
    fontWeight: "400"
  },
})