import { Share2, Trash2 } from "lucide-react";
import React from "react";
import { Tags } from "./Tags";

import { linkIdGetter } from "../../utils/linkIdGetter";
import CheckPostType from "../pages/CheckPostType";
import { useStateHandle } from "../../store/useStateHandle";

interface CardProps {
  id : string;
  startIcon: React.ReactElement;
  title : string | undefined;
  link: string;
  type: "youtube" | "tweet";
}

export const Card: React.FC<CardProps> = (props) => {
  const { startIcon, link, type, title, id} = props;
  const { deleteContent} = useStateHandle()


  return (
    <div className="px-5 py-5 shadow-md rounded-lg border-gray-200 h-full max-w-80 border">
      <div className="flex gap-2 items-center mb-4 justify-between">
        <div className="flex gap-2 items-center">
          {startIcon}
          <span className="font-semibold text-xl">{title}</span>
        </div>

        <div className="flex gap-2 ">
          <Share2 className="text-gray-400 cursor-pointer" />{" "}
          <Trash2 className="text-gray-400 cursor-pointer" onClick={() => deleteContent(id)} />
        </div>
      </div>

      {/* body */}
      <div>

        {/* links -- tweets, yt, etc */}
        <CheckPostType type={type} link={link}/>
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
