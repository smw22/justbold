export default function Switch({ value, onClick }: { value: boolean; onClick: () => void }) {
  return (
    <label className="switch relative inline-block w-[56px] h-[28px]">
      <input type="checkbox" className="opacity-0 w-0 h-0" />
      <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all rounded-[34px] duration-100 ease-in-out"></span>
    </label>
  );
}
