import { X } from "lucide-react";
import { Button } from "./Button";
import { InputCustom } from "./Input";
import {useForm } from "react-hook-form";
import { useStateHandle } from "../../store/useStateHandle";
import { memo, useEffect } from "react";

enum ContentTypes {
  Youtube = "youtube",
  Twitter = "twitter",
  Documents = "documents",
  Links = "links"
}
//controlled Component
export function Modal({ open, onClose } : {open : boolean, onClose : ()=> void}) {
  const {type, setType, setFormdata} = useStateHandle()
  const {register, handleSubmit, reset} = useForm()
  const onContentPost = async (data:object) => {
    const formData = {
      ...data,
      type,
    };
    await setFormdata(formData);
    reset(); // Reset form inputs
    onClose(); // Optional: close modal
  };

  const handleTypeChange = (type : ContentTypes) => {
    setType(type)
  }

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

            <form className="flex flex-col items-center" onSubmit={handleSubmit(onContentPost)}>
                <InputCustom placeholder="link" register={register} name="link"/>
                <InputCustom placeholder="title" register={register} name="title"/>
                
                <div className="flex gap-2 max-w-3xs flex-wrap justify-center">
                <Button type="button" variant={type === ContentTypes.Youtube ? "primary" : "secondary"} text="Youtube" size="md" onClick={() => handleTypeChange(ContentTypes.Youtube)}/>
                <Button type="button" variant={type === ContentTypes.Twitter ? "primary" : "secondary"} text="Twitter" size="md" onClick={() => handleTypeChange(ContentTypes.Twitter)}/>
                <Button type="button" variant={type === ContentTypes.Documents ? "primary" : "secondary"} text="Documents" size="md" onClick={() => handleTypeChange(ContentTypes.Documents)}/>
                <Button type="button" variant={type === ContentTypes.Links ? "primary" : "secondary"} text="Links" size="md" onClick={() => handleTypeChange(ContentTypes.Links)}/>
                
                </div>
                <Button type="submit" variant="primary" text="Submit" size="md"/>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
}


