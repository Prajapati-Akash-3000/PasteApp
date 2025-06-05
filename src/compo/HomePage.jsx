import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pastSlice";
import { format } from 'date-fns';

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId"); //get and store paste Id

  const dispatch = useDispatch();

  const allPaste = useSelector((state) => state.paste.pastes);

  const formattedDate = format(new Date(), 'MMMM d, yyyy'); //Store date

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: formattedDate,
    }

    if(pasteId) {
      //update
      dispatch(updateToPastes(paste));
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation 
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  useEffect(() => {
      if(pasteId) {
        const paste = allPaste.find((p) => p._id === pasteId);
        console.log("Page Found");
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 rounded-2xl mt-2" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 "
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default HomePage;
