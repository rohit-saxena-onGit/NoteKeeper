import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";


function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // ref for textarea
  const textareaRef = useRef(null);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    } else {
      // ✅ Reset fields when no pasteId (e.g. coming back Home)
      setTitle("");
      setValue("");
    }
  }, [pasteId, allPastes]);

  // auto expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // expand
    }
  }, [value]);

  function createPaste() {
     // ✅ Validation
    if (!title.trim() && !value.trim()) {
      toast.error("⚠️ Please enter a title and some content!");
      return;
    }
    if (!title.trim()) {
      toast.error("⚠️ Title cannot be empty!");
      return;
    }
    if (!value.trim()) {
      toast.error("⚠️ Content cannot be empty!");
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="sm:w-[70%] md:w-[70%] lg:w-[90%] rounded  flex justify-evenly lg:justify-center mt-10">
        <input
          className="p-2 rounded  bg-gray-800  sm:w-[70%] md:w-[70%] lg:w-[75%]  "
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-3 py-1 ml-5 bg-blue-600 rounded-md text-gray-100
           hover:cursor-pointer hover:bg-blue-700 
           transition-colors duration-300 ease-in-out"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          ref={textareaRef}
          className="border-gray-300 bg-gray-900 mt-10 
             w-[300px]       
             sm:w-[400px]    
             md:w-[600px]    
             lg:w-[80rem]    
             pl-2 pt-1 rounded-md resize-none overflow-hidden"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
}

export default Home;
