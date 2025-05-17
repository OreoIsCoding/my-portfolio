import React from 'react';
import { aboutData } from '../../../data/aboutData';

const AboutBox = () => {
    const { whoAmI, info, interests } = aboutData;

    return (
        <div className="mb-12 sm:mb-16 md:mb-24 relative transform transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg sm:rounded-xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-white/10">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="opacity-0 animate-fadeIn"
                        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                        <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-2 sm:mb-4">{whoAmI.title}</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {whoAmI.description}
                        </p>
                    </div>
                    <div className="space-y-3 sm:space-y-4 opacity-0 animate-fadeIn"
                        style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        <InfoItem title="Location" content={info.location} />
                        <InfoItem title="Email" content={info.email} />
                        <div>
                            <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {interests.map((interest) => (
                                    <span 
                                        key={interest} 
                                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/10 
                                        text-emerald-400 rounded-full text-xs sm:text-sm">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ title, content }) => (
    <div>
        <h4 className="text-white font-semibold text-sm sm:text-base mb-1 sm:mb-2">{title}</h4>
        <p className="text-gray-400 text-xs sm:text-sm">{content}</p>
    </div>
);

export default AboutBox;
