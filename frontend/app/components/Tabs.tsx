export default function Tabs({ tabs, currentTab, setTab }: { tabs: string[]; currentTab: number; setTab: (e: number) => void }) {
  return (
    <div className="bg-white flex flex-row w-full items-center rounded-tl-3xl rounded-tr-3xl -mt-6 overflow-hidden">
      {tabs?.map((tab, index) => (
        <>
          <button
            onClick={() => setTab(index)}
            className={`flex py-3 m-2 rounded-2xl flex-row bg-white cursor-pointer items-center justify-center w-full ${index === currentTab ? "text-black" : "text-gray-400"} hover:bg-gray-100 transition-colors duration-400 ease-in-out`}
          >
            {tab}
          </button>
          {/* // add a divider line if it is NOT the last tab. */}
          {index !== tabs.length - 1 ? <div className="w-px bg-gray-300 h-8"></div> : null}
        </>
      ))}
    </div>
  );
}
