export interface IComment {
  id: string;
  author: CommentAuthor;
  content: CommentContent[];
  publishedAt: string;
  likes: number;
  userHasLiked: boolean;
}

interface CommentAuthor {
  avatarUrl: string;
  name: string;
}

interface CommentContent {
  type: 'paragraph' | 'link';
  content: string;
}