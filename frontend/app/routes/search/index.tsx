import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import Input from "~/components/Input";
import ForYou from "./tabs/ForYou";
import People from "./tabs/People";
import Collaborations from "./tabs/Collaborations";
import Services from "./tabs/Services";
import Tags from "./tabs/Tags";

const TABS = [
  { label: "For you", value: "all" },
  { label: "People", value: "people" },
  { label: "Collaborations", value: "collaborations" },
  { label: "Services", value: "services" },
  { label: "Tags", value: "tags" },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [activeTab, setActiveTab] = useState(searchParams.get("category") || "all");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    setSearchParams(params);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("category", tab);
    setSearchParams(params);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <ForYou query={searchQuery} />;
      case "people":
        return <People query={searchQuery} />;
      case "collaborations":
        return <Collaborations query={searchQuery} />;
      case "services":
        return <Services query={searchQuery} />;
      case "tags":
        return <Tags query={searchQuery} />;
      default:
        return <ForYou query={searchQuery} />;
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-2 pb-16 px-2.5 outer-wrapper">
      <div className="flex justify-between gap-1.5 items-center">
        <Input
          variant="search"
          icon="Search"
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onClear={() => handleSearch("")}
          className="w-full"
        />
        <Link className="cursor-pointer text-sm font-medium" to={"../"}>
          Cancel
        </Link>
      </div>

      <div className="flex gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`cursor-pointer text-sm ${activeTab === tab.value ? "underline" : ""}`}
            onClick={() => handleTabChange(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-1.5">{renderTabContent()}</div>
    </div>
  );
}
