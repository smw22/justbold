export default function ThreadCard() {
  return (
    <div className="flex items-center p-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-[60px] h-[60px]">
          <img src="https://avatar.iran.liara.run/public" alt="Thread Avatar" className="w-full" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Thread Title</h3>
          <p className="text-sm text-gray-600">Last message preview...</p>
        </div>
      </div>

      <div>
        <p>22:34</p>
      </div>
    </div>
  );
}
