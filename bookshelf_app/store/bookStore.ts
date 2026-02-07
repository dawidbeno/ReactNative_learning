import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, ReadingNote, ReadingStatus } from '@/types/book';

// Sample data
const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'fiction',
    coverColor: '#4A90E2',
    pages: 180,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    rating: 5,
    status: 'finished',
    currentPage: 180,
    dateAdded: Date.now() - 30 * 24 * 60 * 60 * 1000,
    dateFinished: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'fiction',
    coverColor: '#E25D5D',
    pages: 324,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    rating: 5,
    status: 'reading',
    currentPage: 156,
    dateAdded: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'sci-fi',
    coverColor: '#2C3E50',
    pages: 328,
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
    status: 'want-to-read',
    dateAdded: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'non-fiction',
    coverColor: '#F39C12',
    pages: 443,
    description: 'A brief history of humankind, exploring how Homo sapiens came to dominate the world.',
    rating: 4,
    status: 'finished',
    currentPage: 443,
    dateAdded: Date.now() - 60 * 24 * 60 * 60 * 1000,
    dateFinished: Date.now() - 40 * 24 * 60 * 60 * 1000,
  },
  {
    id: '5',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    category: 'mystery',
    coverColor: '#8E44AD',
    pages: 454,
    description: 'A mystery thriller involving secret societies and hidden codes.',
    rating: 4,
    status: 'reading',
    currentPage: 234,
    dateAdded: Date.now() - 20 * 24 * 60 * 60 * 1000,
  },
  {
    id: '6',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    category: 'biography',
    coverColor: '#95A5A6',
    pages: 656,
    description: 'The authorized biography of Apple co-founder Steve Jobs.',
    status: 'want-to-read',
    dateAdded: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
];

interface BookState {
  books: Book[];
  notes: ReadingNote[];
  addBook: (book: Omit<Book, 'id' | 'dateAdded'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  updateReadingProgress: (id: string, currentPage: number) => void;
  updateStatus: (id: string, status: ReadingStatus) => void;
  rateBook: (id: string, rating: number) => void;
  addNote: (bookId: string, content: string, page?: number) => void;
  deleteNote: (noteId: string) => void;
  getBookById: (id: string) => Book | undefined;
  getBooksByCategory: (category: string) => Book[];
  getNotesByBookId: (bookId: string) => ReadingNote[];
}

export const useBookStore = create(
  persist<BookState>(
    (set, get) => ({
      books: SAMPLE_BOOKS,
      notes: [],

      addBook: (bookData) => {
        const newBook: Book = {
          ...bookData,
          id: Date.now().toString(),
          dateAdded: Date.now(),
        };
        set((state) => ({
          books: [newBook, ...state.books],
        }));
      },

      updateBook: (id, updates) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...updates } : book
          ),
        }));
      },

      deleteBook: (id) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
          notes: state.notes.filter((note) => note.bookId !== id),
        }));
      },

      updateReadingProgress: (id, currentPage) => {
        set((state) => ({
          books: state.books.map((book) => {
            if (book.id === id) {
              const isFinished = currentPage >= book.pages;
              return {
                ...book,
                currentPage,
                status: isFinished ? 'finished' : 'reading',
                dateFinished: isFinished ? Date.now() : book.dateFinished,
              };
            }
            return book;
          }),
        }));
      },

      updateStatus: (id, status) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  status,
                  dateFinished:
                    status === 'finished' ? Date.now() : undefined,
                }
              : book
          ),
        }));
      },

      rateBook: (id, rating) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, rating } : book
          ),
        }));
      },

      addNote: (bookId, content, page) => {
        const newNote: ReadingNote = {
          id: Date.now().toString(),
          bookId,
          content,
          page,
          createdAt: Date.now(),
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },

      deleteNote: (noteId) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== noteId),
        }));
      },

      getBookById: (id) => {
        return get().books.find((book) => book.id === id);
      },

      getBooksByCategory: (category) => {
        return get().books.filter((book) => book.category === category);
      },

      getNotesByBookId: (bookId) => {
        return get().notes.filter((note) => note.bookId === bookId);
      },
    }),
    {
      name: 'bookshelf-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
