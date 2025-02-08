import { useEffect, useState, useRef } from "react";

export const useTabs = () => {
  const [currentTab, setCurrentTab] = useState("buns");

  const refs = {
    buns: useRef<HTMLHeadingElement>(null),
    sauces: useRef<HTMLHeadingElement>(null),
    fillings: useRef<HTMLHeadingElement>(null),
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: keyof typeof refs) => {
    setCurrentTab(tab);
    refs[tab]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const bunsTop = refs.buns.current?.getBoundingClientRect().top || 0;
      const saucesTop = refs.sauces.current?.getBoundingClientRect().top || 0;
      const fillingsTop = refs.fillings.current?.getBoundingClientRect().top || 0;

      const scrollPositions = [
        { tab: "buns", position: Math.abs(bunsTop) },
        { tab: "sauces", position: Math.abs(saucesTop) },
        { tab: "fillings", position: Math.abs(fillingsTop) },
      ];

      const closestTab = scrollPositions.sort((a, b) => a.position - b.position)[0].tab;
      setCurrentTab(closestTab);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { currentTab, handleTabClick, refs, scrollContainerRef };
};
