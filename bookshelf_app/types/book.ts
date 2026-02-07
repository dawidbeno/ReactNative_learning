export type BookCategory = 'fiction' | 'non-fiction' | 'mystery' | 'sci-fi' | 'biography';

export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  coverColor: string;
  pages: number;
  description: string;
  rating?: number; // 1-5 stars
  status: ReadingStatus;
  currentPage?: number;
  dateAdded: number;
  dateFinished?: number;
}

export interface ReadingNote {
  id: string;
  bookId: string;
  content: string;
  page?: number;
  createdAt: number;
}
