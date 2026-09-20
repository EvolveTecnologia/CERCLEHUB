import React from 'react';
import { Course } from '../types';
import { Play } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-full cursor-pointer group/card relative outline-none focus:outline-none z-0 hover:z-50 focus:z-50"
      onClick={() => onClick(course.id)}
      tabIndex={0}
      role="button"
    >
      <div className="relative aspect-[16/10] sm:aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-[#1A2B32] shadow-md transition-all duration-300 ease-out transform origin-center group-hover/card:scale-[1.04] ring-0 group-hover/card:ring-[2px] ring-[#0E98A8]">
        
        {/* Background Image */}
        <img 
          src={course.heroImage || course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-opacity duration-300 opacity-90 group-hover/card:opacity-100"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#122C34]/90 via-transparent to-transparent opacity-70 group-hover/card:opacity-40 transition-opacity duration-300" />
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-60" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 hidden md:flex">
          <div className="w-11 h-11 bg-[#F26522] rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform duration-300 ease-out">
            <Play size={18} className="text-white fill-white ml-0.5" />
          </div>
        </div>
        
        {/* Progress Bar */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-[#0A7A94] to-[#F26522] shadow-[0_0_8px_rgba(242,101,34,0.8)]" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Meta Data */}
      <div className="mt-2 px-0.5 transition-all duration-300">
        <h3 className="text-xs sm:text-sm font-semibold leading-snug text-gray-200 group-hover/card:text-white transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-[#0E98A8]/90 mt-0.5 line-clamp-1 font-medium">
          {course.category}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
