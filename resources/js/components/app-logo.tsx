import { Activity } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <Activity className="size-5 text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    MedTrack
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    by SurgTuga
                </span>
            </div>
        </>
    );
}
