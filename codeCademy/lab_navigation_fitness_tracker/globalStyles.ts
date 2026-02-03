import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
   header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 15,
    },
     primaryButton: {
    backgroundColor: '#FF6B35',
    margin: 15,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})