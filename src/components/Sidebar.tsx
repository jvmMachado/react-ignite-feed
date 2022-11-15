import { PencilLine } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://static.vecteezy.com/system/resources/previews/005/841/930/original/japanese-style-element-background-free-vector.jpg"
      />
      <div className={styles.profile}>
        <Avatar src={"https://github.com/jvmmachado.png"} />
        <strong>JV Machado</strong>
        <span>Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}