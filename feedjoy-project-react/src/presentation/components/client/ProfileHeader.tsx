// Client Profile Header Component
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
    name: string;
    email: string;
    initials: string;
    isEditing: boolean;
}

export default function ProfileHeader({ name, email, initials, isEditing }: ProfileHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-primary to-teal-500 rounded-xl px-6 py-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-primary font-poppins">
                            {initials}
                        </span>
                    </div>
                    {isEditing && (
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                            <Camera className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white font-poppins">{name}</h2>
                    <p className="text-white/80 font-urbanist">{email}</p>
                </div>
            </div>
        </div>
    );
}
