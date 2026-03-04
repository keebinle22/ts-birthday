'use client'
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from "next/link";

export default function Page(){
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [year, setYear] = useState(0);
    const [yearHint, setYearHint] = useState(false);

    const [corMon, setCorMon] = useState(false);
    const [corDay, setCorDay] = useState(false);

    const [wrong, setWrong] = useState(false);
    const [complete, setComplete] = useState(false);
    
    const [qPtr, setQptr] = useState(0);
    const questions = [
        "What month was Kevyn born?",
        "What day was Kevyn born?",
        "What year was Kevyn born?"
    ];
    const modifyMonth = (input) => {
        if (month + input >= 1 && month + input <= 12){
            setMonth(month+input);
        }
    }
    const modifyDay = (input) => {
        if (day + input >= 1 && day + input <= 31) {
            setDay(day + input);
        }
    }
    const modifyYear = (input) => {
        if (year + input >= 0) {
            if (year + input >= 50){
                setYearHint(true);
            }
            setYear(year + input);
        }
    }
    const checkDay = () => {
        if (corMon && corDay && ((year === 0 && yearHint) || year === 2000)){
            setComplete(true);
            return;
        }
        if (corMon && !corDay && day === 22){
            setCorDay(true);
            setQptr(qPtr + 1);
            return;
        }
        if (!corMon && month === 3){
            setQptr(qPtr+1);
            setCorMon(true);
            return;
        }
        setWrong(true)
    }
    return (
        <>
        <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
                <Dialog open={wrong} onClose={setWrong} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="">
                                        {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                        </div> */}
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                That is Incorrect
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Do you even know me?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setWrong(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            <div className="flex flex-col gap-4 items-center">
                <span className="text-3xl">{questions[qPtr]}</span>
                {yearHint && <span className="text-lg">Hint: mm/dd/yy</span>}
            </div>
            <div className="flex gap-10" id="dob">
                <div className="flex flex-col" id="month">
                    <div className="flex flex-row gap-2 justify-center my-2">
                        <div className="flex justify-center items-center">
                            <span className="text-5xl">{month < 10 ? "0": ""}{month}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="border sm:size-[2.5vw] size-[7vw] hover:bg-gray-200 active:bg-gray-500" onClick={() => modifyMonth(1)} disabled={corMon}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" />
                                </svg>
                            </button>
                            <button className="border  hover:bg-gray-200 active:bg-gray-500" onClick={() => modifyMonth(-1)} disabled={corMon}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-2xl">Month</span>
                    </div>
                </div>
                {corMon && <div className="flex flex-col" id="day">
                    <div className="flex flex-row gap-2 justify-center my-2">
                        <div className="flex justify-center items-center">
                            <span className="text-5xl">{day < 10 ? "0" : ""}{day}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="border hover:bg-gray-200 active:bg-gray-500 size-[7vw] sm:size-[2.5vw]" onClick={() => modifyDay(1)} disabled={corDay}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" />
                                </svg>
                            </button>
                            <button className="border hover:bg-gray-200 active:bg-gray-500 " onClick={() => modifyDay(-1)} disabled={corDay}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-2xl">Day</span>
                    </div>
                </div>}
                {corMon && corDay && <div className="flex flex-col" id="year">
                    <div className="flex flex-row gap-2 justify-center my-2">
                        <div className="flex justify-center items-center">
                            {yearHint && 
                                <span className="text-5xl">{year < 10 ? "0" + year : year}</span>
                            }
                            {!yearHint && <span className="text-5xl">{year}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="border hover:bg-gray-200 active:bg-gray-500 size-[7vw] sm:size-[2.5vw]" onClick={() => modifyYear(1)}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" />
                                </svg>
                            </button>
                            <button className="border hover:bg-gray-200 active:bg-gray-500 " onClick={() => modifyYear(-1)}>
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    enableBackground="new 0 0 52 52"
                                >
                                    <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-2xl">Year</span>
                    </div>
                </div>}
            </div>
            <div className="flex">
                {!complete && <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg" onClick={checkDay} id="submit">Submit</button>}
                {complete &&
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-2xl font-bold">Complete 🥳</span>
                    <p>Hooray! The party will take place on Saturday, March 21!</p>
                    <p>Password for the next game: <b>climber</b></p>
                    <Link href={"/"}>
                            <button className="border bg-sky-400 hover:bg-sky-300 active:bg-sky-600 transition duration-100 ease-in-out hover:scale-105 px-4 py-1 rounded-full text-white font-bold text-lg">Back</button>
                    </Link>
                </div>
                }
            </div>
        </div>
        </>
    )
}