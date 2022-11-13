import styles from "./Post.module.css";

import { Comment } from './Comment';
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function Post({ author, content, publishedAt }) {
  const publishedAtFromString = new Date(publishedAt);
  const formatedDate = format(publishedAtFromString, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAtFromString, { locale: ptBR, addSuffix: true })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={"https://github.com/jvmmachado.png"} />
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
              return <p>{line.content}</p>;
            case 'link':
              return <p><a href="#">{line.content}</a></p>
            default:
              break;
          }
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário..."
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentsList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}