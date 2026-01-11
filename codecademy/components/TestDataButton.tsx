import React from 'react';
import { Button } from 'react-native';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TestDataButtonProps {
  onAddTestData: (todos: Todo[]) => void;
}

export const TestDataButton = ({ onAddTestData }: TestDataButtonProps): React.JSX.Element => {
  const handleAddTestData = (): void => {
    const testTodos: Todo[] = [
      { id: 1, text: 'Buy groceries', completed: false },
      { id: 2, text: 'Walk the dog', completed: true },
      { id: 3, text: 'Finish report', completed: false },
      { id: 4, text: 'Call mom', completed: true },
      { id: 5, text: 'Clean house', completed: false },
      { id: 6, text: 'Read novel', completed: false },
      { id: 7, text: 'Go to gym', completed: true },
      { id: 8, text: 'Plan trip', completed: false },
      { id: 9, text: 'Fix lamp', completed: false },
      { id: 10, text: 'Learn TypeScript', completed: true },
      { id: 11, text: 'Organize photos', completed: false },
      { id: 12, text: 'Write blog post', completed: false },
      { id: 13, text: 'Update resume', completed: true },
      { id: 14, text: 'Plant flowers', completed: false },
      { id: 15, text: 'Book dentist', completed: false },
      { id: 16, text: 'Compare insurance', completed: false },
      { id: 17, text: 'Donate clothes', completed: true },
      { id: 18, text: 'Learn recipes', completed: false },
      { id: 19, text: 'Set up bills', completed: false },
      { id: 20, text: 'Clean fridge', completed: true },
      { id: 21, text: 'Plan vacation', completed: false },
      { id: 22, text: 'Update apps', completed: false },
      { id: 23, text: 'Practice guitar', completed: true },
      { id: 24, text: 'Backup files', completed: false },
      { id: 25, text: 'Book checkup', completed: false },
      { id: 26, text: 'Start course', completed: false },
      { id: 27, text: 'Clean garage', completed: true },
      { id: 28, text: 'Create budget', completed: false },
      { id: 29, text: 'Find volunteer work', completed: false },
      { id: 30, text: 'Update LinkedIn', completed: true },
      { id: 31, text: 'Meal prep', completed: false },
      { id: 32, text: 'Compare streaming', completed: false },
      { id: 33, text: 'Sort documents', completed: true },
      { id: 34, text: 'Learn repairs', completed: false },
      { id: 35, text: 'Prep emergency kit', completed: false },
      { id: 36, text: 'Research retirement', completed: false },
      { id: 37, text: 'Car maintenance', completed: true },
      { id: 38, text: 'Learn meditation', completed: false },
      { id: 39, text: 'Visit markets', completed: false },
      { id: 40, text: 'Check home security', completed: true },
    ];
    onAddTestData(testTodos);
  };

  return (
    <Button
      title="Add Test Data"
      onPress={handleAddTestData}
    />
  );
};