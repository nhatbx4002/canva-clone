'use client'

import Banner from "../components/home/banner";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/header";
import DesignTypes from "@/components/home/design-types"
import AiFeature   from "@/components/home/ai-feature";
import RecentDesign from "@/components/home/recent-design";

export default function Home(){
  return <div className="flex min-h-screen bg-white">
    <Sidebar/>
    <div className="flex-1 flex flex-col ml-[72px]">
      <Header/>
      <main className="flex-1 p-6 overflow-y-auto pt-20">
        <Banner/>
        <DesignTypes/>
        <AiFeature/>
        <RecentDesign/>
      </main>
    </div>
  </div>
}