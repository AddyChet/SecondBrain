import { X } from "lucide-react";
import { Button } from "./Button";
import { InputCustom } from "./Input";

//controlled Component
export function Modal({ open, onClose } : {open : boolean, onClose : ()=> void}) {
  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          {/* Semi-transparent background overlay */}
          <div className="bg-gray-900/60 absolute inset-0"></div>
          {/* Modal content */}
          <div className="relative z-10 bg-white rounded-lg p-4 ">
            <div className="flex justify-end">
                <X className="cursor-pointer" onClick={onClose}/>
            </div>

            <div className="flex flex-col items-center">
                <InputCustom placeholder="Type"/>
                <InputCustom placeholder="Text"/>
                <Button variant="primary" text="Submit" size="md"/>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}


