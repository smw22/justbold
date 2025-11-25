interface AvatarHeaderProps {
  imageSize: number;
  title: string;
}

export default function AvatarHeader({ imageSize, title }: AvatarHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-[${imageSize}px] h-[${imageSize}px]`}>
        <img
          src="/images/user-avatar.png"
          alt="user avatar"
          className="w-full"
        />
      </div>
      <span>{title}</span>
    </div>
  );
}
