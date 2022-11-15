import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { IComment } from "../interfaces/IComment";
import { Avatar } from "./Avatar";

import styles from './Comment.module.css';

interface ICommentProps extends IComment {
  onDeleteComment: (commentId: string) => void;
}

export function Comment({ id, author, content, publishedAt, onDeleteComment, likes, userHasLiked }: ICommentProps) {
  const [likesState, setLikesState] = useState(likes);
  const [userHasLikedState, setUserHasLikedState] = useState(userHasLiked);

  const publishedAtFromString = new Date(publishedAt);
  const formatedDate = format(publishedAtFromString, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAtFromString, { locale: ptBR, addSuffix: true })

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleAddLike() {
    if (userHasLikedState) {
      setUserHasLikedState(false);
      setLikesState(likesState - 1);
    } else {
      setUserHasLikedState(true);
      setLikesState((state) => {
        if (state) {
          return state + 1;
        } else {
          return 1;
        }
      });
    }

  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.commentAuthorAndTime}>
              <strong>{author.name}</strong>
              <time title={formatedDate} dateTime={publishedAt}>{publishedDateRelativeToNow}</time>
            </div>
            <button title='Remover comentário'>
              <Trash size={24} onClick={handleDeleteComment} />
            </button>
          </header>
          {content.map(line => {
            switch (line.type) {
              case 'paragraph':
                return <p key={line.content}>{line.content}</p>
              case 'link':
                return <p key={line.content}><a href="#">{line.content}</a></p>
              default:
                break;
            }
          })}
        </div>
        <footer>
          <button
            onClick={handleAddLike}
            className={userHasLikedState ? styles.userHasLiked : undefined}
          >
            <ThumbsUp />
            Curtir <span>{likesState}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}