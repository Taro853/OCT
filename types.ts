
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  category: string;
  isNew: boolean;
  isRecommended: boolean;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  pdfUrl?: string;
  fileName?: string;
  thumbnailUrl?: string;
}

export interface ClosedDate {
  id: string;
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface MonthlyFeature {
  title: string;
  subtitle: string;
  description: string;
  content: string; // リッチテキスト装飾用
  imageUrl: string;
  books: string[]; // 関連書籍ID
}

export interface Librarian {
  name: string;
  role: string;
  message: string;
  imageUrl: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'text' | 'rating' | 'choice';
}

export type ModalType = 
  | 'NONE'
  | 'ADMIN'
  | 'BOOK_DETAIL'
  | 'NEWS_DETAIL'
  | 'ACCESS'
  | 'FEATURE'
  | 'LIBRARIAN'
  | 'SURVEY'
  | 'CALENDAR';

export interface ModalState {
  type: ModalType;
  data?: any;
}
