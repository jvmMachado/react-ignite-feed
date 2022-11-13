import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from './Comment.module.css';

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar src={"https://github.com/jvmmachado.png"} hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.commentAuthorAndTime}>
              <strong>JV Machado</strong>
              <time>Cerca de 1h</time>
            </div>
            <button title='Remover comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>Muito bem! Ficou perfeito!</p>
        </div>
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}