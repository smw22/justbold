import Icon from "./icon";

export default function SheetView({
  show,
  onClose,
  title,
  children,
}: {
  show: boolean;
  onClose: () => void;
  title: string;
  children: any;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed top-0 left-0 w-full bg-black/20 z-90 transition-opacity duration-400 ease-in-out ${show ? "h-full opacity-100" : "h-0 opacity-0"}`}
      ></div>
      <article
        className={`h-80 fixed left-0 right-0 p-4 rounded-tl-3xl rounded-tr-3xl bg-white w-full z-1000 ${show ? "bottom-0" : "-bottom-90"} transition-all duration-400 ease-in-out`}
      >
        <div className="max-w-md m-auto z-10 relative">
          <section className="flex items-center h-10">
            <h2 className="flex-1">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out flex justify-center items-center"
            >
              <Icon name="Close" size="48" />
            </button>
          </section>
          <section className="overflow-scroll max-h-70 pb-8 gap-4 flex flex-col">{children}</section>
        </div>
      </article>
    </>
  );
}
