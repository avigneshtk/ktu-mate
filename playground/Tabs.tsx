"use client";

import { useRef, useState } from "react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    content: "This is the overview of KTU Mate.",
  },
  {
    id: "marks",
    label: "Marks",
    content: "Here you can view your Series Test marks.",
  },
  {
    id: "analysis",
    label: "Analysis",
    content: "Here you can see your AI performance analysis.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let newIndex = index;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      newIndex = 0;
    } else if (event.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    setActiveTab(tabs[newIndex].id);
    tabRefs.current[newIndex]?.focus();
  }

  return (
    <div className="w-full max-w-xl">
      <div
        role="tablist"
        aria-label="KTU Mate information"
        className="flex border-b border-gray-300"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="px-4 py-3 font-semibold text-gray-700 hover:text-blue-600"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="rounded-b-lg border border-t-0 border-gray-300 p-5"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}