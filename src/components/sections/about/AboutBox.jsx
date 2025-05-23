import React from 'react';
import { aboutData } from '../../../data/aboutData';
import { HiLocationMarker, HiMail, HiSparkles } from 'react-icons/hi';

const AboutBox = () => {
    const { whoAmI, info, interests } = aboutData;

    return (
        <div className="mb-12 sm:mb-16 md:mb-24 relative group">
            {/* Ambient light effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-emerald-400/10 to-blue-500/20 
                rounded-lg blur-2xl group-hover:opacity-75 transition duration-1000 opacity-50" />
            
            {/*     container */}
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-xl border border-white/10
                bg-gradient-to-br from-black/80 via-black/70 to-black/80 transition-transform duration-300 hover:-translate-y-1">
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
                        {/* Left column */}
                        <div className="space-y-4">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 
                                bg-clip-text text-transparent">{whoAmI.title}</h3>
                            <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed">
                                {whoAmI.description}
                            </p>
                        </div>
                        
                        {/* Right column */}
                        <div className="space-y-6">
                            <div className="space-y-3 sm:space-y-4">
                                <InfoItem 
                                    title="Location"
                                    content={info.location}
                                    icon={<HiLocationMarker className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
                                />
                                <InfoItem 
                                    title="Email"
                                    content={info.email}
                                    icon={<HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
                                />
                            </div>
                            
                            {/* Interests */}
                            <div>
                                <h4 className="text-white/90 font-medium text-sm sm:text-base mb-3 flex items-center gap-1.5 sm:gap-2">
                                    <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                    Interests
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest) => (
                                        <span
                                            key={interest}
                                            className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/10
                                                text-emerald-300/90 rounded-full text-xs sm:text-sm
                                                hover:bg-emerald-500/10 transition-all duration-300
                                                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ title, content, icon }) => (
    <div className="group/item flex items-start gap-3 hover:bg-white/5 p-2 rounded-lg 
        transition-all duration-300 hover:-translate-y-0.5">
        <span className="text-lg">{icon}</span>
        <div>
            <h4 className="text-white/80 font-medium text-sm sm:text-base mb-0.5">{title}</h4>
            <p className="text-gray-400 text-xs sm:text-sm group-hover/item:text-gray-300 transition-colors duration-300">
                {content}
            </p>
        </div>
    </div>
);

export default AboutBox;
