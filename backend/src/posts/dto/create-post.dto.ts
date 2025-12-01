export class CreatePostDto {
  title: string;
  content: string;
  tagIds: string[];
  media: string;
  user_id: string;
}
