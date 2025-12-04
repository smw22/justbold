import Icon from "./icon";
type CardMediaVariant = "image" | "video";

export default function CardMedia({ variant = "image", url }: { variant?: CardMediaVariant; url: string }) {
  return (
    <>
      {variant === "image" ? (
        <img src={url} className="aspect-post md:aspect-video w-full object-cover rounded-3xl" />
      ) : (
        <div className="flex flex-col items-center justify-center aspect-video w-full bg-gray-200 rounded-3xl">
          <Icon name="MediaVideo" size={48} />
          <p>Dis gon' be a video at sum point.</p>
        </div>
      )}
    </>
  );
}
