// Client Activity Item Component
import { formatDate } from "../../utils";
import type { UserActivity } from "../../hooks/client/useClientOverview";

interface ActivityItemProps {
    activity: UserActivity;
    onClick: (id?: number) => void;
}

export default function ActivityItem({ activity, onClick }: ActivityItemProps) {
    const ActivityIcon = activity.icon;

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-xl ${activity.bg} cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={() => onClick(activity.orderId)}
        >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/80">
                <ActivityIcon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 font-urbanist">
                    {activity.message}
                </p>
                <p className="text-xs text-gray-400 font-urbanist mt-1">
                    {formatDate(activity.time)}
                </p>
            </div>
        </div>
    );
}
