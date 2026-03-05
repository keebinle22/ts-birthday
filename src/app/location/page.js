'use client'

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from "next/link";

export default function Page(){
    const NUMBER_OF_GUESSES = 15;
    const WORDS = [
        "fuckitweballletstakeshots"
    ];
    const [rightGuessString, setRightGuessString] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [nextLetter, setNextLetter] = useState(0);
    const [letterStatuses, setLetterStatuses] = useState({});
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        setRightGuessString(
            WORDS[Math.floor(Math.random() * WORDS.length)]
        );
    }, []);

    function insertLetter(letter) {
        if (nextLetter === 25) return;
        const updated = [...currentGuess];
        updated[nextLetter] = letter;
        setCurrentGuess(updated);
        setNextLetter(nextLetter + 1);
    }

    function deleteLetter() {
        if (nextLetter === 0) return;
        const updated = [...currentGuess];
        updated[nextLetter - 1] = "";
        setCurrentGuess(updated);
        setNextLetter(nextLetter - 1);
    }

    function evaluateGuess(guess) {
        const result = Array(25).fill("absent");
        const answerArr = rightGuessString.split("");

        // First pass: correct letters
        for (let i = 0; i < 25; i++) {
            if (guess[i] === answerArr[i]) {
                result[i] = "correct";
                answerArr[i] = null;
            }
        }

        // Second pass: present letters
        for (let i = 0; i < 25; i++) {
            if (result[i] === "correct") continue;
            const index = answerArr.indexOf(guess[i]);
            if (index !== -1) {
                result[i] = "present";
                answerArr[index] = null;
            }
        }

        return result;
    }

    function checkGuess() {
        if (currentGuess.length < 25) {
            alert("Not enough letters!");
            return;
        }

        const guessString = currentGuess.join("");

        // if (!WORDS.includes(guessString)) {
        //     alert("Word not in list!");
        //     return;
        // }

        const evaluation = evaluateGuess(currentGuess);

        const updatedStatuses = { ...letterStatuses };
        currentGuess.forEach((letter, i) => {
            const status = evaluation[i];
            if (
                !updatedStatuses[letter] ||
                status === "correct" ||
                (status === "present" &&
                    updatedStatuses[letter] !== "correct")
            ) {
                updatedStatuses[letter] = status;
            }
        });

        setLetterStatuses(updatedStatuses);
        setGuesses([...guesses, { guess: currentGuess, evaluation }]);
        setCurrentGuess([]);
        setNextLetter(0);

        if (guessString === rightGuessString) {
            setComplete(true);
            // alert("You guessed right! 🎉");
        }
    }

    const getTileColor = (status) => {
        if (status === "correct") return "bg-green-500 text-white border-green-500";
        if (status === "present") return "bg-yellow-500 text-white border-yellow-500";
        if (status === "absent") return "bg-gray-500 text-white border-gray-500";
        return "border-gray-400";
    };

    const handleKeyClick = (key) => {
        if (key === "ENTER") return checkGuess();
        if (key === "DEL") return deleteLetter();
        insertLetter(key);
    };

    const close = () => {
        setComplete(false);
    }

    return (
        <div className="flex flex-col items-center space-y-6 py-8 min-h-screen">
            <h1 className="text-3xl font-bold">Wordle</h1>
            <p>Good luck</p>

            {/* BOARD */}
            <div className="w-full px-2 overflow-x-auto">
                <div className="min-w-[600px] sm:min-w-0">
                    {Array.from({ length: NUMBER_OF_GUESSES }).map((_, rowIndex) => {
                        const guessObj = guesses[rowIndex];

                        return (
                            <div
                                key={rowIndex}
                                className="grid gap-[2px] sm:gap-1 w-full max-w-6xl mx-auto mb-1"
                                style={{
                                    gridTemplateColumns: `repeat(25, minmax(0, 1fr))`,
                                }}
                            >
                                {Array.from({ length: 25 }).map((_, colIndex) => {
                                    let letter = "";
                                    let status = "";

                                    if (guessObj) {
                                        letter = guessObj.guess[colIndex];
                                        status = guessObj.evaluation[colIndex];
                                    } else if (rowIndex === guesses.length) {
                                        letter = currentGuess[colIndex];
                                    }

                                    return (
                                        <div
                                            key={colIndex}
                                            className={`
                  aspect-square
                  w-full
                  border sm:border-2
                  flex items-center justify-center
                  text-[clamp(8px,2vw,18px)]
                  font-bold uppercase
                  ${getTileColor(status)}
                `}
                                        >
                                            {letter}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* KEYBOARD */}
            <div className="w-full px-2 mt-6">
                <div className="max-w-3xl mx-auto flex flex-col gap-2">
                    {["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((row, i) => (
                        <div
                            key={i}
                            className="flex justify-center flex-wrap gap-1"
                        >
                            {row.split("").map((key) => (
                                <button
                                    key={key}
                                    className={`
              flex-1 min-w-[32px] sm:min-w-[40px]
              h-10 sm:h-12
              rounded
              font-bold uppercase
              text-sm sm:text-base
              transition
              ${letterStatuses[key] === "correct"
                                            ? "bg-green-500 text-white"
                                            : letterStatuses[key] === "present"
                                                ? "bg-yellow-500 text-white"
                                                : letterStatuses[key] === "absent"
                                                    ? "bg-gray-500 text-white"
                                                    : "bg-gray-300"
                                        }
            `}
                                    onClick={() => handleKeyClick(key)}
                                >
                                    {key}
                                </button>
                            ))}

                            {i === 2 && (
                                <>
                                    <button
                                        className="px-3 h-10 sm:h-12 bg-gray-400 rounded font-bold text-xs sm:text-sm"
                                        onClick={() => handleKeyClick("DEL")}
                                    >
                                        Del
                                    </button>
                                    <button
                                        className="px-3 h-10 sm:h-12 bg-gray-400 rounded font-bold text-xs sm:text-sm"
                                        onClick={() => handleKeyClick("ENTER")}
                                    >
                                        Enter
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={complete} onClose={close} className="relative z-10">
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
                                <div className="flex justify-center">
                                    {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Correct
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Party at Odin! Maybe club hop if the weather permits.
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                401 1st Ave NE, Minneapolis, MN 55413
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-center">
                                <Link href={"/"}>
                                    <button
                                        type="button"
                                        onClick={() => setComplete(false)}
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
        </div>
    );
}