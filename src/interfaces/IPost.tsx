import { IComment } from "./IComment";

export interface IPost {
  id: string;
  author: Author;
  content: PostContent[];
  publishedAt: string;
  comments: IComment[];
}

interface PostContent {
  type: 'paragraph' | 'link';
  content: string;
}

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}