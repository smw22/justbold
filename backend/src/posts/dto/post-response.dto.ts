export interface PostUserDto {
  id: string;
  name: string;
  profile_image: string;
}

export interface PostLikeDto {
  user: PostUserDto | null;
  type?: string;
}

export interface PostCommentLikeDto {
  id: string;
  user: Omit<PostUserDto, "id"> | null;
  type?: string;
}

export interface PostCommentDto {
  id: string;
  content: string;
  created: Date;
  user: PostUserDto | null;
  likes?: PostCommentLikeDto[];
}

export interface PostResponseDto {
  id: string;
  title: string;
  content: string;
  media: string;
  created: Date;
  user: PostUserDto | null;
  tags: any[];
  likes: PostLikeDto[];
  comments: PostCommentDto[];
}
