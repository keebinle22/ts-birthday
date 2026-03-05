'use client'
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Tile from "./tile";
import Link from "next/link";

export default function Page(){
    const path = [
        true, 
        true,
        false,
        true,
        false,
        false,
        true,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        true,
    ];
    const [userPath, setUserPath] = useState(new Array(15).fill(true));
    const [ptr, setPtr] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [complete, setComplete] = useState(false);
    const [end, setEnd] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const names = ["Bewd", "Jiajia", "Tudou", "Willy", "Bones", "Mantou", "DD", "Doudou", "Huahua", "Otto", "Fangfang"];
    const deathMessage = [
        "Dude wtf...",
        "Bro..",
        "Are you serious?",
        "AGAIN??",
        "STOP MESSING UP!!!!!",
        "Their blood is on your hands.",
        "Are you even trying?",
        "...",
        "My favorite one...",
        "D:",
        "You killed them all."
    ]
    const [deathPtr, setDeathPtr] = useState(0);

    const chooseTile = (tile) => {
        if (path[ptr] === tile){
            if (ptr+1 === path.length){
                setEnd(true);
            }
            setPtr(ptr+1);
        }
        else{
            setWrong(true);
        }
    }
    const reset = () => {
        setWrong(false);
        setUserPath(userPath.fill(true));
        if (ptr === 0){
            let copy = [...userPath]
            copy[0] = false
            setUserPath(copy);
        }
        else{
            setPtr(0);
        }
        if (deathPtr+1 > 10){
            setDeathPtr(0);
            setAttempt(attempt+1);
        }
        else{
            setDeathPtr(deathPtr+1);
        }
    }
    const back = () => {
        return;
    }
    useEffect(() => {
        console.log("asdf")
        let copy = [...userPath]
        copy[ptr] = false
        setUserPath(copy)
    }, [ptr]);

    useEffect(() => {
        let copy = [...userPath]
        copy[0] = false
        setUserPath(copy);
    },[]);
    return (
        <>
        <div className="flex flex-col justify-start items-center min-h-screen pt-[25vh] gap-8">
            <Dialog open={wrong} onClose={reset} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-0"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-0 sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            {names[deathPtr]} {attempt > 0 ? `#${attempt+1}` : ""} has fallen to their death
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {deathMessage[deathPtr]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-center">
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Try Again
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={complete} onClose={back} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-0"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-0 sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Congratulation! You made it to the end!
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                It only took you {attempt*3+deathPtr+1} attempts.. RIP to our fallen pets o7.
                                                <br></br>
                                                Anyways.. the party will take place at 7pm!
                                                <br></br>
                                                Password for the next game: <b>gamers</b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-center">
                                <Link href="/">
                                    <button
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        Main Page
                                    </button>
                                </Link>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div className="flex flex-col gap-5 items-center w-[50vw]">
                <span className="text-4xl text-center">Glass Bridge Game</span>
                <p className="text-sm sm:text-lg">Help! Multiple animals have been dropped into Squid Game and must cross the glass bridge to survive. Choose wisely — one wrong step and the glass will shatter beneath them. Guide them safely across! {"(yes those blue squares are supposed to be glass panes. im no ux designer)"}</p>
            </div>
            <div className="flex flex-col-reverse items-center border-2 rounded-4xl">
                <div className="bg-orange-800 w-[50vw] h-10 rounded-b-4xl"/>
                {path.map((v, i) => {
                    return(
                        <div key={i} id={i}>
                        <Tile hidden={userPath[i]} chooseTile={chooseTile} ptr={ptr} correct={v} idx={i}/>
                        </div>
                    )
                })}
                    <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg mt-2" onClick={() => setComplete(true)} hidden={!end}>Finish</button>
            </div>
        </div>  
        </>
    )
}