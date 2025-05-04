import { Share2, Trash2 } from "lucide-react";
import React from "react";
import { Tags } from "./Tags";
import { Tweet } from "react-tweet";
import { linkIdGetter } from "../../utils/linkIdGetter";

interface CardProps {
  startIcon: React.ReactElement;
  headingText: string;
  title?: string | undefined;
  link: string;
  type: "youtube" | "tweet";
}

export const Card: React.FC<CardProps> = (props) => {
  const { startIcon, headingText, link, type, title } = props;

  const linkId = linkIdGetter(type, link);

  return (
    <div className="px-5 py-5 shadow-md rounded-lg border-gray-200 h-full max-w-80 border">
      <div className="flex gap-2 items-center mb-4 justify-between">
        <div className="flex gap-2 items-center">
          {startIcon}
          <span className="font-semibold text-xl">{headingText}</span>
        </div>

        <div className="flex gap-2 ">
          <Share2 className="text-gray-400 cursor-pointer" />{" "}
          <Trash2 className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* body */}
      <div>
        <h1 className="font-bold text-3xl ">
          {(title ?? "").length > 0 ? title : ""}
        </h1>

        {/* links -- tweets, yt, etc */}
        {type === "youtube" ? (
          <iframe
            className="w-full rounded-md h-full mt-4"
            //   embed/-s07QZaS4tQ --> watch/v=-s07QZaS4tQ
            src={`https://www.youtube.com/embed/${linkId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="light mt-4">
            <Tweet id={linkId} />
          </div>
        )}
      </div>

      {/* tags */}
      <div className="flex gap-2 mt-4">
        <Tags variant="primary" size="default" text="#Productivity" />
        <Tags variant="primary" size="default" text="#ideas" />
      </div>

      {/* date */}
      <div className="mt-5">
        <p className="text-gray-500">
          Added on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
