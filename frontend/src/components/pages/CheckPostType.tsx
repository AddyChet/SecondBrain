import React from "react";
import { Tweet } from "react-tweet";
import { linkIdGetter } from "../../utils/linkIdGetter";

const CheckPostType = (props) => {
  const { type, link } = props;
 
  const linkId = linkIdGetter(type, link);

  return (
    <>
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
      ) : type === "twitter" ? (
        <div className="light mt-4">
          <Tweet id={linkId} />
        </div>
      ) : (
        <div className="light mt-4"></div>
      )}
    </>
  );
};

export default CheckPostType;
