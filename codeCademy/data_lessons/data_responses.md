# Handling data responses
Most mobile APIs return JSON data with metadata and the actual data we need. Raw API response can present several challenges:
- Field names might not match app conventions
- Some fields could be missing or contain unexpected values
- Responses include unnecessary metadata
- Data types might be inconsistent

To work with this data, we should first parse it. We can convert raw responses to objects using the `.json()` method of the `Response` interface.

1. 
In the `App.tsx` file, inside the `fetchStudentReports()` function, inside the `try` block, call the `fetchWithRetry()` function and pass the `API_URL` as a parameter.
Store the returned response in a constant named `response`.

2. 
After the fetch call, convert the response to JSON format and store it in a constant named `data`.

3. 
In the `App.tsx` file, before the `fetchStudentReports()` function, create an array of user-friendly error messages for common HTTP status codes. Include these two essential error scenarios:
- 404: “Student data not found. Please try again later.”
- 500: “Server error occurred. Please check your connection and try again.”

Make sure to export the array.

4. 
With the scenarios created, let’s make sure it’s used and communicated to the users.

In the catch block for errors, update the error handling to check the error’s HTTP status code and use the appropriate message from the `errorMessages` object. Use conditional logic to check if `err.status` equals `404` or `500`, and display the corresponding error message from your `errorMessages` object.

```tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { fetchWithRetry } from './fetchUtils';
import { StudentReportsView } from './components/StudentReportsView';

const API_URL = 'https://static-assets.codecademy.com/Courses/learn-react-native-v53/05-data/student_reports.json';

interface Student {
  id: string;
  name: string;
  average: number;
  grade: string;
  pass: boolean;
}

// Create error messages for common HTTP status codes 
export const errorMessages = {
  404: 'Student data not found. Please try again later.',
  500: 'Server error occurred. Please check your connection and try again.'
};

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentReports = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call fetchWithRetry and store in response constant
      const response = await fetchWithRetry(API_URL);
      
      // Convert response to JSON and store in data constant
      const data = await response.json();
      
      if (data.status === 'success' && data.data?.students) {
        setStudents(data.data.students);
        Alert.alert('Success', `Loaded ${data.data.students.length} student reports!`);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : 'Network error occurred';

      // Update errorMessage with better statuses
      switch (err.status) {
        case '404':
          errorMessage = errorMessages[404];
          break;
        case '500':
          errorMessage = errorMessages[500];
          break;
      }

      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setStudents([]);
    setError(null);
  };

  return (
    <StudentReportsView
      students={students}
      loading={loading}
      error={error}
      onFetchReports={fetchStudentReports}
      onClearData={clearData}
    />
  );
}
```