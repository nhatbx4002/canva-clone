'use client'
import Header from "./header";
import SideBar from "./sidebar";
import Canvas from "./canvas";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useEditorStore} from "../../store";

export default function MainEditor () {

    const params = useParams();
    const router = useRouter();
    const designId = params?.slug;

    const [isLoading, setIsLoading] = useState(!!designId);
    const [loadAttempted, setLoadAttempted] = useState(false);
    const [error, setError] = useState(null);

    const {canvas, setDesignId , resetStore} = useEditorStore();

    useEffect(() => {
        //reset the store
        resetStore();
        //set the design id

        if(designId) setDesignId(designId);

            return () => {
                resetStore();
            }
    } , []);

    useEffect(() => {
        setLoadAttempted(false);
        setError(null);
    } , [designId]);

    useEffect(() => {
        if(isLoading && !canvas && designId){
            const timer = setTimeout(() => {
                if(isLoading){
                    console.log(`Canvas init timeout!`);
                    setIsLoading(false)
                }
            }, 5000);
        }
    },[isLoading , canvas , designId]);

    useEffect(() => {
        if(canvas){
            console.log("Canvas is now available!");
        }
    }, [canvas]);

    //load the data

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header/>
            <div className="flex flex-1 overflow-hidden">
                <SideBar/>
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    <main className="flex-1 overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
                        <Canvas/>
                    </main>
                </div>
            </div>
        </div>
    )
}