'use client'

import { useEffect, useState } from "react";
import { getUserDesigns } from "@/services/design-services";

function RecentDesign() {
    const [userDesigns, setUserDesigns] = useState([]);

    // Hàm để gọi API và lấy dữ liệu
    async function fetchUserDesigns() {
        try {
            const result = await getUserDesigns();
            setUserDesigns(result || []); // Giả sử dữ liệu API trả về trong result.data
            console.log(result, "result");
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
                {/* Duyệt qua danh sách userDesigns và render các thiết kế */}
                {userDesigns.map((design) => (
                    <div key={design.id} className="group cursor-pointer">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md">
                            <img src={design.thumbnail || "/placeholder-design.svg"} alt={design.title} />
                        </div>
                        <p className="font-bold text-sm truncate">{design.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentDesign;
