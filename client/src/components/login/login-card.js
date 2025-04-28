'use client'
import {Button} from "../ui/button";
import { LogIn } from "lucide-react";
import { signIn } from 'next-auth/react';
function LoginCard(){
    return (
        <div className="bg-white round-2x1 shadow-x1 p-8 w-full max-w-md mx-4 transition-all duration-300">
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2x1 font-bold text-gray-800">Jump back in!</h3>
                    <p className="mt-3 text-gray-500">Sign in to continue to canva</p>
                </div>
                <Button
                    variant={'outline'}
                    className={`w-full flex items-center justify-center gap-3 py-6 text-gray-700 border-gray-300
                    hover:border-[#8b3dff] hover:text-[#8b3dff] transition-all duration-300 group transform hover:scale-[1.01] active:scale-[0.99]
                    `}
                    onClick={() => signIn('google', { callbackUrl : '/'})}
                >
                    <div className="bg-white rounded-full p-1 flex items-center justify-center group-hover:bg-[#8b3dff]/10 transition-colors duration-300">
                        <LogIn className="w-5 h-5 group-hover:text-[8b3dff] transition-colors"></LogIn>
                    </div>
                    <span className="font-bold">Continue with Google</span>
                </Button>
            </div>
        </div>
    )
}

export default LoginCard;