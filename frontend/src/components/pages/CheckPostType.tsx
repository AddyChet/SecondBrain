import Microlink from "@microlink/react";

interface CheckPostTypeProps {
  type: "youtube" | "twitter" | "documents" | "links" | string;
  link: string;
}

const CheckPostType = ({ type, link }: CheckPostTypeProps) => {
  return (
    <div className="mt-4 flex justify-center">
      <div className=" rounded-lg shadow-md overflow-hidden bg-white">
        <Microlink
          url={link}
          media={type === "youtube" ? "iframe" : "logo"}
          size="medium"
          lazy
          fetchData
        />
      </div>
    </div>
  );
};

export default CheckPostType;
