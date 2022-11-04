import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from "../Avatar/Avatar";
import { useState } from "react";


interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleLike() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false}
        src="https://github.com/vinihasselmann.png"
        alt="foto de perfil"
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Vinicius Hasselmann</strong>
              <time
                title="28 de outubro às 19:15h"
                dateTime="2022-05-11 09:15:20"
              >
                cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLike}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
