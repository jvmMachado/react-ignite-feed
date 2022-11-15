import styles from "./Post.module.css";

import { Comment } from './Comment';
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { IPost } from "../interfaces/IPost";
import { IComment } from "../interfaces/IComment";

interface IPostProps extends IPost { }

export function Post({ id, author, content, publishedAt, comments }: IPostProps) {
  const [commentsState, setCommentsState] = useState(comments);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedAtFromString = new Date(publishedAt);
  const formatedDate = format(publishedAtFromString, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAtFromString, { locale: ptBR, addSuffix: true })

  function handleCreateComment(event: FormEvent) {
    event.preventDefault();
    const newComment = {
      id: Date.now().toString(),
      author: {
        avatarUrl: "https://github.com/diego3g.png",
        name: "Diego Fernandes",
      },
      content: [
        {
          type: "paragraph",
          content: newCommentText,
        }
      ],
      publishedAt: "2022-11-12T12:11:30.000Z",
      likes: 0,
      userHasLiked: false
    } as IComment;

    setNewCommentText('');
    if (commentsState == null) {
      return setCommentsState([newComment]);
    }

    return setCommentsState([...commentsState, newComment]);
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentId: string) {
    const newCommentsList = commentsState.filter(comment => comment.id !== commentId);
    setCommentsState(newCommentsList);
  }

  function handleInvalidNewComment(event: InvalidEvent<HTMLFormElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={formatedDate} dateTime={publishedAt}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          switch (line.type) {
            case 'paragraph':
              return <p key={line.content}>{line.content}</p>;
            case 'link':
              return <p key={line.content}><a href="#">{line.content}</a></p>
            default:
              break;
          }
        })}
      </div>

      <form onSubmit={handleCreateComment} className={styles.commentForm} onInvalid={handleInvalidNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      {commentsState && <div className={styles.commentsList}>
        {commentsState.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.author}
            content={comment.content}
            publishedAt={comment.publishedAt}
            onDeleteComment={deleteComment}
            likes={comment.likes}
            userHasLiked={comment.userHasLiked}
          />
        ))}
      </div>}
    </article>
  );
}