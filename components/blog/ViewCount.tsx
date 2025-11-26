"use client";

import { incrementBlogView } from "@/lib/actions/blogView.actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

type ViewCountProps = {
  viewCount: number;
  blogId: number;
};

export default function ViewCount({ viewCount, blogId }: ViewCountProps) {
  const { user } = useUser();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (user && user.id && !hasIncremented.current) {
      hasIncremented.current = true;
      incrementBlogView(blogId, user.id, `/blog/${blogId}`);
    }
  }, [blogId, user]);
  return (
    <div>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="img"
          aria-labelledby="viewTitle viewDesc"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title id="viewTitle">View</title>
          <desc id="viewDesc">Eye icon representing view count</desc>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Views: {viewCount}
      </div>
    </div>
  );
}
