import { useState } from "react";
import { Button } from "../ui/Button";
import { SideBarButton } from "../ui/Sidebar";
import { BookText, Brain, Hash, Link2, Plus, Share2, Twitter, Youtube } from "lucide-react";
import { Card } from "../ui/Card";
import {Modal} from "../ui/Modal"

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
    
    <main className="flex overflow-auto">
      {/* side nav */}
      <section className="w-[20%] p-4 fixed">

        {/* nav here */}
        <nav className="flex items-center gap-3 border p-2 mb-6 ">
        <Brain className="w-9 h-9 text-button-500"/>
        <h1 className="text-xl font-semibold">Second Brain</h1>
        </nav>

        <div className="p-6 border" >
         <SideBarButton className="mb-4 hover:text-button-500 " variant="default" size="md" startIcon={<Twitter />} text="Tweets"/>
         <SideBarButton className="mb-4 hover:text-button-500 " variant="default" size="md" startIcon={<Youtube />} text="Videos"/>
         <SideBarButton className="mb-4 hover:text-button-500 " variant="default" size="md" startIcon={<BookText />} text="Documents"/>
         <SideBarButton className="mb-4 hover:text-button-500 " variant="default" size="md" startIcon={<Link2 />} text="Links"/>
         <SideBarButton className="mb-4 hover:text-button-500 " variant="default" size="md" startIcon={<Hash />} text="Tags"/>

        </div>
      </section>

      {/* contents shown here */}
      <section className="bg-gray-100 w-[80%] relative ml-[20%] border ">
        
        <nav className="p-5 flex justify-between mx-7 border mt-8 gap-6">
          <h1 className="font-semibold text-2xl ">All Notes</h1>

          <div className="flex gap-3">
            <Button variant="secondary" size="md" startIcon={<Share2 size={20}/>} text="Share Brain" />
            <Button variant="primary" size="md" startIcon={<Plus size={20}/>} text="Add Content" onClick={()=> setOpen(prev => !prev)}/>
          </div>
        </nav>

        {/* cards section */}
        
        <div className="p-3 mt-4 mx-7 border flex justify-evenly flex-wrap gap-4">
          <Card title="Pahalgam Terror" startIcon={<Youtube />} link="https://twitter.com/narendramodi/status/1918572663380861208" type="tweet" headingText="Modi's Visit"/>
          <Card title="Pahalgam Terror" startIcon={<Twitter />} link="https://www.youtube.com/watch?v=-s07QZaS4tQ" type="youtube" headingText="Focus Music"/>
          <Card title="Pahalgam Terror" startIcon={<Twitter />} link="https://www.youtube.com/watch?v=-s07QZaS4tQ" type="youtube" headingText="Focus Music"/>
          <Card title="Pahalgam Terror" startIcon={<Twitter />} link="https://www.youtube.com/watch?v=-s07QZaS4tQ" type="youtube" headingText="Focus Music"/>
          <Card title="Pahalgam Terror" startIcon={<Twitter />} link="https://www.youtube.com/watch?v=-s07QZaS4tQ" type="youtube" headingText="Focus Music"/>
          <Card title="Pahalgam Terror" startIcon={<Twitter />} link="https://www.youtube.com/watch?v=-s07QZaS4tQ" type="youtube" headingText="Focus Music"/>

        </div>
      </section>
    </main>
    
    <Modal open={open} onClose={()=> setOpen(false)}/>
    </>
  );
};

export default Dashboard;
