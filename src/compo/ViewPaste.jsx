import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pastSlice";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste: " + paste);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter Title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 "
          value={paste.content}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
