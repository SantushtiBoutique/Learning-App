"use client"

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false); // State to track if image is loaded

  const handleImageLoad = () => {
    setIsLoaded(true); // Set isLoaded to true when image is loaded
  };

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          {!isLoaded && ( // Render Skeleton while image is loading
            <Skeleton className="h-full w-full" />
          )}
          <Image // Image component to load the course image
            onLoad={handleImageLoad} // Call handleImageLoad when image is loaded
            className="object-cover" // Remove conditional class to always display the image
            alt={title}
            src={imageUrl}
            width={500} // Set width and height according to your requirement
            height={300}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-[#3730a3] dark:group-hover:text-[#2dd4bf] transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs bottom-0 relative">
            <div className="flex items-center gap-x-1 text-slate-500 dark:text-white">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-black dark:text-[#ffffff]">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
