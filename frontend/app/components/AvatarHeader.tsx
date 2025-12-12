interface AvatarHeaderProps {
  imageSize?: number;
  imageUrl?: string;
  title: string;
  color: string;
  className?: string;
}

export default function AvatarHeader({ imageSize, imageUrl, title = "User name", color, className }: AvatarHeaderProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div style={{ width: `${imageSize}px`, height: `${imageSize}px` }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="user avatar"
            className="w-full h-full object-cover rounded-full"
            style={{ borderColor: color }}
          />
        ) : (
          <div className="w-full h-full object-cover rounded-full bg-neutral-200"></div>
        )}
      </div>
      <span style={{ color }}>{title}</span>
    </div>
  );
}
