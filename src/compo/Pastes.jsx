import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pastSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState(""); //for search text

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // to search

  const dispatch = useDispatch();
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="border mt-5 flex flex-col rounded-md">
        
        <h1 className="self-start ml-5 mt-3 font-bold">All Pastes</h1>

        <div className="flex flex-col gap-5 mt-5 border p-5">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className="h-[150px] rounded-md border overflow-hidden max-w-[600px] flex flex-row p-3 justify-between" key={paste?._id}>

                  {/* Text */}
                  <div className="flex flex-col items-start overflow-hidden">
                    <h1 className="text-3xl border-b-2">{paste.title}</h1>
                    <span className="">{paste.content}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col justify-between">

                    <div  className="flex flex-row gap-4 place-content-evenly">
                      <button className="mt-2 h-[40px] w-[30px] flex justify-center items-center">
                        <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                      </button>
                      <button className="mt-2 h-[40px] w-[30px] flex justify-center items-center" >
                        <Link to={`/paste/${paste?._id}`}>View</Link>
                      </button>
                      <button className="mt-2 h-[40px] w-[50px] flex justify-center items-center"  onClick={() => handleDelete(paste?._id)}>
                        Delete
                      </button>
                      <button className="mt-2 h-[40px] w-[40px] flex justify-center items-center" 
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content); //Copy the content
                          toast.success("Copyed to clipboard"); //show the copy messege in a toast
                        }}>
                        Copy
                      </button>
                      <button className="mt-2 h-[40px] w-[50px] flex justify-center items-center" 
                        onClick={() => {
                          // const url = `${window.location.origin}/paste/${paste._id}`;
                          // navigator.clipboard.writeText(url);
                          // toast.success("Link Copied to Clipboard!");
                          if(navigator.share) {
                            navigator.share({
                              title: paste.title,
                              url: `${window.location.origin}/paste/${paste._id}`
                            });
                          }

                        }}>
                        Share
                      </button>
                    </div>
                    
                    <div className="self-end">
                      {paste.createdAt}
                    </div>
                  </div>

                </div>  
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
