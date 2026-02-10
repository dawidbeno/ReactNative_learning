# Using fecth API
Create and export an asynchronous function named fetchWithRetry which takes two parameters:
- `url` of type string containing the API endpoint
- `retries` set to default value of 3 for retry attempts

The function should return a `Promise<Response>`.

Inside the ``fetchWithRetry` function, create a for loop which starts from 0 and runs until `retries` (exclusive) using iterator variable `i`.

Inside the for loop, create a try-catch block structure that will handle both successful requests and network errors. The catch block should take an `error` parameter to handle any exceptions during the request.

Inside the try block, make a GET request to the `url` parameter using the fetch API and store the response in a constant variable named `response`.
Also check if the response status is okay using `response.ok` - if successful, return the response immediately.

In the catch block, check if this is the final retry attempt by comparing `i === retries - 1`, then throw the error since all retries are exhausted.

Otherwise, create a new Promise that resolves after a timeout using `setTimeout` and pass `resolve` as callback with delay of `1000 * Math.pow(2, i)` which implements exponential backoff (1s, 2s, 4s delays).

After the for loop ends, add a fallback error by throwing a new Error with the message: `"Network error. Please check your connection and try again."`.
This ensures that if somehow no response is returned from the loop, a clear error message is provided to the user.

The code:
```ts
import { Response } from "node-fetch";

export const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
  for (let i = 0 ; i < retries; i++){
      try {
        const response = await fetch(url);
        if (response.ok) return response;
      } catch(error) {
        if (i === retries -1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2,i)));
      }
  }
  throw new Error('Network error. Please check your connection and try again');
}
```
