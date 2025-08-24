import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast, { Toaster } from "react-hot-toast";
function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <>
    <div className="absolute top-20 left-0 right-0 bg-gray-900 flex items-center justify-center py-2 text-white font-semibold text-3xl">
    All Pastes
  </div>
    <div className="mt-34 flex flex-col items-center justify-center gap-4">
      <input
        type
        ="text"
        placeholder="search here"
        value={searchTerm}
        className="p-1 bg-gray-800 rounded border w-[300px] py-2 lg:w-[80%]"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col w-[370px] lg:w-[75%] gap-10 ">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="border px-4 rounded-md" key={paste?._id}>
                <div className="flex flex-row justify-between">
                  <div className=" font-bold">{paste.title}</div>
                  <div className="flex flex-row gap-2 place-content-evenly">
                    <button className="hover:cursor-pointer">
                      <a href={`/?pasteId=${paste?._id}`}>
                        <i class="ri-pencil-fill"></i>
                      </a>
                    </button>

                    <button className="hover:cursor-pointer">
                      <a href={`/pastes/${paste?._id}`}>
                        <i class="ri-eye-fill"></i>
                      </a>
                    </button>

                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="hover:cursor-pointer"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>

                    <button
                      className="hover:cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <i class="ri-file-copy-line"></i>
                    </button>

                    <button
                      className="hover:cursor-pointer"
                      onClick={() => {
                        const shareUrl = `${window.location.protocol}//${window.location.host}/pastes/${paste?._id}`;
                        if (navigator.share) {
                          navigator
                            .share({
                              title: paste.title,
                              text: "Check out this paste!",
                              url: shareUrl,
                            })
                            .catch((error) =>
                              console.log("Error sharing:", error)
                            );
                        } else {
                          // fallback: copy link
                          navigator.clipboard.writeText(shareUrl);
                          toast.info(
                            "Link copied to clipboard (share not supported)"
                          );
                        }
                      }}
                    >
                      <i className="ri-share-line"></i>
                    </button>
                  </div>
                </div>

                <div className="text-gray-200">{paste.content}</div>

                <div className=" text-sm text-gray-300 mt-1 text-end">
                  {new Date(paste.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
    </>
    
  );
}

export default Paste;
