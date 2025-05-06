'use client'

import {Input } from "@/components/ui/input";
import {Search ,LogOut} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger ,DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";


function Header(){
    const {data: session} = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return <header className= "h-16 border-b border-gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72] z-10">
        <div className="flex-1 max-w-2x1 mx-auto relative">
            <Search className="absolute top-1/2 left-3 tranform -translate-y-1/2 h-5 w-5 text-gray-400 "/>
            <Input
                className="pl-10 py-6 border-gray-200 bg-gray50 focus-visible:ring-purple-500 text-base"
            placeholder="Search your Projects and Canva's"/>
        </div>
        <div className="flex flex-col items-center gap-5 ml-4">
            <div className="flex items-center gap-1 cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger aschild = "true">
                        <button className="flex items-center space-x-2 focus:outline-none">
                            <Avatar>
                                <AvatarFallback>
                                    {session?.user?.name?.[0] ||"U"}
                                </AvatarFallback>
                                <AvatarImage src={session?.user?.image ||'/placeholder-user.jpg'}/>
                            </Avatar>
                            <span className="text-sm font-medium hidden lg:block">
                                {session?.user?.name || "User"}
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuItem onClick={() => signOut()}  className={'cursor-pointer'}>
                            <LogOut className="mr-2 w-4 h-4"/>
                            <span className="font-bold">Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
}

export default Header;