interface AvatarHeaderProps {
  imageSize: number;
  title: string;
}

export default function AvatarHeader({ imageSize, title }: AvatarHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: `${imageSize}px`, height: `${imageSize}px` }}>
        <img
          src="/images/user-avatar.png"
          alt="user avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <span>{title}</span>
    </div>
  );
}
