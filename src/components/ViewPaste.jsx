import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  // ref for textarea
  const textareaRef = useRef(null);

  // auto expand textarea when paste changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // expand
    }
  }, [paste]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="sm:w-[70%] md:w-[70%] lg:w-[90%] rounded flex justify-evenly lg:justify-center mt-10">
        <input
          className="p-2 border border-gray-100 bg-gray-800
                 w-[200px] 
                 sm:w-[70%] 
                 md:w-[70%] 
                 lg:w-[80%] overflow-hidden rounded-md "
          type="text"
          placeholder="enter title here"
          value={paste?.title || ""}
          disabled
        />
      </div>
      <div>
        <textarea
          ref={textareaRef}
          className="border-gray-300 bg-gray-900 mt-10 
                 w-[300px] 
                 sm:w-[400px] 
                 md:w-[600px] 
                 lg:w-[75rem] 
                 pl-2 pt-1 rounded-md resize-none overflow-hidden"
          value={paste?.content || ""}
          placeholder="Enter content here"
          disabled
          rows={3} // start small
        />
      </div>
    </div>
  );
}

export default ViewPaste;
