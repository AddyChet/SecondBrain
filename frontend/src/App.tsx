import React from "react";
import { Button } from "./components/ui/Button";
import { Plus, Share2 } from "lucide-react";

const App = () => {
  return (
    <div className="m-4">
      <Button
        variant="primary"
        size="md"
        text="Add Content"
        startIcon={<Plus size={20}/>}
        onClick={() => console.log("Clicked")}
      />

      <Button
        variant="secondary"
        size="md"
        text="Share Brain"
        startIcon={<Share2 size={20}/>}
        onClick={() => console.log("Clicked")}
      />
    </div>
  );
};

export default App;
