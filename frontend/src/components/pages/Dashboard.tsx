import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { SideBarButton } from "../ui/Sidebar";
import {
  BookText,
  Brain,
  CircleUser,
  Hash,
  Link2,
  Plus,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Modal } from "../ui/Modal";
import { useAuthStore } from "../../store/useAuthStore";
import ShowProfile from "./ShowProfile";
import { useStateHandle } from "../../store/useStateHandle";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { getStartIcon } from "../GetStartIcon";

const Dashboard = () => {
  const { authUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { getContent, content } = useStateHandle();

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <>
      <main className="flex overflow-auto w-screen h-screen bg-gray-100">
        {/* side nav */}
        <section className="w-[20%] p-4 fixed bg-white h-full">
          {/* nav here */}
          <nav className="flex items-center gap-3  p-2 mb-6 ">
            <Brain className="w-9 h-9 text-button-500" />
            <h1 className="text-xl font-semibold">Second Brain</h1>
          </nav>

          <div className="p-6 ">
            <SideBarButton
              className="mb-4 hover:text-button-500 "
              variant="default"
              size="md"
              startIcon={<Twitter />}
              text="Tweets"
            />
            <SideBarButton
              className="mb-4 hover:text-button-500 "
              variant="default"
              size="md"
              startIcon={<Youtube />}
              text="Videos"
            />
            <SideBarButton
              className="mb-4 hover:text-button-500 "
              variant="default"
              size="md"
              startIcon={<BookText />}
              text="Documents"
            />
            <SideBarButton
              className="mb-4 hover:text-button-500 "
              variant="default"
              size="md"
              startIcon={<Link2 />}
              text="Links"
            />
            <SideBarButton
              className="mb-4 hover:text-button-500 "
              variant="default"
              size="md"
              startIcon={<Hash />}
              text="Tags"
            />
          </div>
        </section>

        {/* contents shown here */}
        <section className=" w-[80%] relative ml-[20%]  ">
          <nav className="p-5 flex justify-between mx-7  mt-8 gap-6">
            <h1 className="font-semibold text-2xl ">All Notes</h1>

            <div className="flex gap-3 items-center relative">
              <Button
                variant="secondary"
                size="md"
                startIcon={<Share2 size={20} />}
                text="Share Brain"
              />
              <Button
                variant="primary"
                size="md"
                startIcon={<Plus size={20} />}
                text="Add Content"
                onClick={() => setOpen(true)}
              />
              {authUser && (
                <CircleUser
                  className="cursor-pointer"
                  onClick={() => setOpenProfile(!openProfile)}
                />
              )}
              {openProfile && <ShowProfile />}
            </div>
          </nav>

          {/* cards section */}

          <div className="p-3 mt-4 mx-7 flex  flex-wrap gap-6 justify-start items-start">
            {content?.map((post) => (
              <Card
                key={post._id} 
                id={post._id} 
                title={post.title}
                startIcon={getStartIcon(post?.type)}
                link={post.link}
                type={post.type}
              />
            ))}
          </div>
        </section>
      </main>

      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Dashboard;
