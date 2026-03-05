'use client'
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [timePW, setTimePW] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [enableTime, setEnableTime] = useState(false);

  const [locPW, setLocPW] = useState(false);
  const [locInput, setLocInput] = useState("");
  const [enableLoc, setEnableLoc] = useState(false);

  const [enableDate, setEnableDate] = useState(false);

  const handleTimeInput = (evt) => {
    setTimeInput(evt.target.value);
  }
  const handleTimePW = () => {
    if (timeInput.toLowerCase() === "climber"){
      setEnableTime(true);
    }
  }
  const handleLocInput = (evt) => {
    setLocInput(evt.target.value);
  }
  const handleLocPW = () => {
    if (locInput.toLowerCase() === "gamers") {
      setEnableLoc(true);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 items-center w-[75vw]">
          <div className="text-7xl text-center">KEVYN'S OFFICAL <br></br> BIRTHDAY INVITATION</div>
          <p className="text-2xl text-center text-wrap">You have been cordially invited to my 26th birthday. The event details are provided below but there is a catch. I have gamified this invitation! Play each game in order to unlock details of the party. Start from left to right. Good Luck {":)"} </p>
        </div>
        <div className="flex" id="game-selection">
          <div className="flex flex-col items-center rounded-x-full gap-4 w-[25vw] h-[25vh] pt-[3vh]" id="date">
            <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-110 px-4 py-1 rounded-full text-white font-bold text-sm sm:text-lg" onClick={() => setEnableDate(!enableDate)}>Date</button>
            <div className="flex flex-col items-center gap-3" hidden={!enableDate}>
              <Link href={"/date"}>
                <button className="border bg-gray-400 hover:bg-gray-300 active:bg-gray-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg">Enter</button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center border-x-3 border-gray-400 rounded-x-full gap-4 w-[25vw] h-[25vh] pt-[3vh]" id="time">
            <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-110 px-4 py-1 rounded-full text-white font-bold text-sm sm:text-lg" onClick={() => setTimePW(!timePW)}>Time</button>
            <div className="flex flex-col items-center gap-3" hidden={!timePW}>
              <div className="flex flex-col items-center">
                <label className="text-center">Enter Password</label>
                <input type="textbox" className="border-3 border-sky-400  w-[15vw] text-center" onChange={handleTimeInput}/>
              </div>
              <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-sm" onClick={handleTimePW}>Submit</button>
              <Link href={"/time"}>
                <button className="border bg-gray-400 hover:bg-gray-300 active:bg-gray-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg" hidden={!enableTime}>Enter</button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-x-full gap-4 w-[25vw] h-[25vh] pt-[3vh]" id="loc">
            <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-110 px-4 py-1 rounded-full text-white font-bold text-sm sm:text-lg" onClick={() => setLocPW(!locPW)}>Location</button>
            <div className="flex flex-col items-center gap-3" hidden={!locPW}>
              <div className="flex flex-col items-center">
                <label className="text-center">Enter Password</label>
                <input type="textbox" className="border-3 border-sky-400  w-[15vw] text-center" onChange={handleLocInput} />
              </div>
              <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-sm" onClick={handleLocPW}>Submit</button>
              <Link href={"/location"}>
                <button className="border bg-gray-400 hover:bg-gray-300 active:bg-gray-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg" hidden={!enableLoc}>Enter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
