import { useUserState } from '@/stores/user-state';
import { Podcasts, Radio } from '@/types/types';
import Router from 'next/router';
import React from 'react';

interface ModernListProps {
    items: Podcasts[];
    onChange?: (value: string) => void;
    value?: string;
}
const ModernList: React.FC<ModernListProps> = ({ items }) => {
    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`
                        flex flex-row items-center gap-4 p-4 rounded-lg
                        transition-all duration-300
                        hover:shadow-lg hover:scale-[1.01]
                        dark:bg-slate-900/50
                        border border-white/10 dark:border-slate-800/50
                        backdrop-blur-md cursor-pointer
                    `}
                    onClick={() => Router.push(`${item.website}`)}
                    tabIndex={0}

                >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_}${item!.picture}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-1 flex-1">
                        <div
                            className="text-lg font-semibold "
                        >
                            {item.presenter}
                        </div>
                        <p className="text-sm text-slate-400 dark:text-slate-300">
                            {item.website}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ReactTableViewPodcast = () => {
    const user = useUserState()
    const [selectedValue, setSelectedValue] = React.useState<string>();
    return (
        <div className=" p-8 flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold  mb-8 text-center">
                    Your Favourites
                </h1>
                <ModernList items={user.podcasts} onChange={setSelectedValue} value={selectedValue} />
                {selectedValue && (
                    <></>
                )}
            </div>
        </div>
    );
};