export const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
  
  // add a loop here
  
  throw new Error('Network error. Please check your connection and try again.');
};

export const getErrorMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input and try again.',
    404: 'Data not found. The service may be temporarily unavailable.',
    429: 'Too many requests. Please wait a moment before trying again.',
    500: 'Server error. Please try again in a few minutes.',
    503: 'Service temporarily unavailable. Please check back later.'
  };
  
  return messages[statusCode] || 'Something went wrong. Please check your connection and try again.';
};