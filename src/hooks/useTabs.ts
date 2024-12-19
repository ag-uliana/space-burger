import { useState, useRef } from "react";

export const useTabs = () => {
  const [currentTab, setCurrentTab] = useState("buns");
  const refs = {
    buns: useRef<HTMLHeadingElement>(null),
    sauces: useRef<HTMLHeadingElement>(null),
    fillings: useRef<HTMLHeadingElement>(null),
  };

  const handleTabClick = (tab: keyof typeof refs) => {
    setCurrentTab(tab);
    refs[tab]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { currentTab, handleTabClick, refs };
};
