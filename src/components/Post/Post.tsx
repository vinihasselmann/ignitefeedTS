import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";


interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: any;
}

export function Post({ author, publishedAt, content } : PostProps) {
  const [comments, setComments] = useState(["post bacanudo"]);

  const [newCommentTxt, setNewCommentTxt] = useState("");

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
   
    setComments([...comments, newCommentTxt]);
    setNewCommentTxt("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentTxt(event.target.value);
  }

  function handleNewInvalidComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(
      "não é possível publicar comentário em branco!"
    );
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentTxt.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>
          {publishedDateRelToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line:any) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          value={newCommentTxt}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewInvalidComment}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
