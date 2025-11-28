interface AvatarHeaderProps {
  imageSize: number;
  imageUrl?: string;
  title: string;
}

export default function AvatarHeader({
  imageSize,
  imageUrl,
  title,
}: AvatarHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: `${imageSize}px`, height: `${imageSize}px` }}>
        <img
          src={imageUrl}
          alt="user avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <span>{title}</span>
    </div>
  );
}
