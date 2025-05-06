'use client'

import { useEffect, useState } from "react";
import { getUserDesigns } from "@/services/design-services";
import {useRouter} from "next/navigation";

function RecentDesign() {
    const [userDesigns, setUserDesigns] = useState([]);
    const router = useRouter();

    // Hàm để gọi API và lấy dữ liệu
    async function fetchUserDesigns() {
        try {
            const result = await getUserDesigns();

            if(result?.success) setUserDesigns(result?.data);
            console.log(result ,"result");
        } catch (error) {
            console.error("Failed to fetch designs", error);
        }
    }

    useEffect(() => {
        fetchUserDesigns();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Recent Designers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {
                    !userDesigns?.length && <h1>No Design Found !</h1>
                }
                {userDesigns.map((design) => (
                    <div onClick={() => router.push(`/editor/${design?._id}`)} key={design._id} className="group cursor-pointer">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md"></div>
                        <p className="font-bold text-sm truncate">{design.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentDesign;
