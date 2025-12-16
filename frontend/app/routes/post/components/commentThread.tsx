// CommentThread.tsx - New recursive component
import type { CommentType } from "~/types/comment";
import Comment from "./comment";

export default function CommentThread({
  comment,
  allComments,
  onReply,
  isNested = false,
}: {
  comment: CommentType;
  allComments: CommentType[];
  onReply: (commentId: string, userName: string) => void;
  isNested?: boolean;
}) {
  // Find direct children of this comment
  const replies = allComments
    .filter((c) => c.parentId === comment.id)
    .sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());

  return (
    <div>
      <Comment comment={comment} onReply={() => onReply(comment.id, comment.user.name)} />
      {replies.length > 0 && (
        <div className={`${!isNested ? "pl-4 border-l  border-neutral-200 ml-4" : ""} flex flex-col`}>
          {replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} allComments={allComments} onReply={onReply} isNested={true} />
          ))}
        </div>
      )}
    </div>
  );
}
