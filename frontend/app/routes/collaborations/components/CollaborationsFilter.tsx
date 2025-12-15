import { useState } from "react";
import Icon from "~/components/icon";
import Input from "~/components/Input";

function CollabFilterContainer() {
  return (
    <div className="bg-white rounded-3xl p-4 border border-black/10 flex flex-col gap-2">
      <div>
        <h4>Sort By</h4>
      </div>
      <div>
        <h4>Role</h4>
      </div>
      <div>
        <h4>Genre</h4>
      </div>
    </div>
  );
}

export default function CollaborationsFilter() {
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input variant="search" icon="Search" type="text" placeholder="Search collaborations..." className="w-full" />
        <button className="flex items-center gap-1" onClick={toggleFilter}>
          <Icon name="Filter" size={24} />
          <span>Filter</span>
        </button>
      </div>
      {filterOpen && <CollabFilterContainer />}
    </div>
  );
}
