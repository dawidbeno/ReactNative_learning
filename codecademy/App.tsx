import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { TestDataButton } from './components/TestDataButton';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (): void => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  return (
    <View style={{ marginTop: 104 }}>
      <Text>My To-do List</Text>
      <TextInput
      value={todoText}
      onChangeText={setTodoText}
      placeholder="Enter a new to-do"
      />
      <Button
      title="Add To-do"
      onPress={addTodo}
      />
      <TestDataButton onAddTestData={setTodos} />
      <Text>Tasks:</Text>
      <ScrollView style={{ maxHeight: 400 }}>
        {todos.length === 0 ? (
          <Text>No to-dos yet. Add one above!</Text>
        ) : (
          todos.map(todo => (
            <View key={todo.id}>
              <Text onPress={() => toggleTodo(todo.id)}>
                {todo.completed ? 'x' : 'o'} {todo.text}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View>
        <Text>Total: {todos.length}</Text>
        <Text>Completed: {todos.filter(todo => todo.completed).length}</Text>
      </View>
    </View>
  );
}