"use client";

import { useEffect } from "react";
import Script from "next/script";
import { cx } from "@/lib/utils";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

/**
 * Official Instagram embed for reels / posts. Loads Instagram's embed.js once
 * and re-processes when the permalink changes.
 */
export function InstagramEmbed({
  url,
  caption,
  className,
}: {
  /** Public Instagram permalink (reel or post). */
  url: string;
  caption?: string;
  className?: string;
}) {
  const permalink = url.split("?")[0].replace(/\/$/, "") + "/";

  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, [permalink]);

  return (
    <div className={cx("flex w-full justify-center", className)}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-captioned
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone block p-4 text-center text-sm underline-offset-4 hover:underline"
        >
          {caption ?? "View this project on Instagram"}
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds?.process()}
      />
    </div>
  );
}
