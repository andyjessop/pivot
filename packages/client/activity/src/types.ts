export interface Entry {
  content: string;
  id: string;
  title: string;
  type?: 'error' | 'info' | 'success' | 'warning';
}

export type DraftEntry = Omit<Entry, 'id'>;
