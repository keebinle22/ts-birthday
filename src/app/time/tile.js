export default function Tile({hidden, chooseTile, ptr, correct, idx}){
    return(
        <>
        <div className={`flex gap-5 ${hidden ? "hidden": ""} py-3`}>
            <button className={`border bg-sky-300 ${ptr === idx ? "hover:bg-black transition duration-100 ease-in-out hover:scale-115" : ""} w-10 h-15`} onClick={() => chooseTile(true)} disabled={ptr !== idx}>
                {ptr-1 === idx && correct && <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M174.16 130.535C179.083 88.9103 244.691 107.984 223.022 144.589C209.505 167.422 172.14 179.086 176.143 142.58" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M86.2021 168.478C119.976 184.491 152.17 189.19 186.173 187.354C199.454 186.637 205.227 186.729 214.666 184.491C249.377 176.261 283.738 165.982 314.196 161.352" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M162.587 325.693C180.528 281.351 181.129 232.537 190.363 186.814" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M215.575 186.814C211.934 234.092 219.678 281.542 230.869 326.851" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
            </button>
                <button className={`border bg-sky-300 ${ptr === idx ? "hover:bg-black transition duration-100 ease-in-out hover:scale-115" : ""} w-10 h-15`} onClick={() => chooseTile(false)} disabled={ptr !== idx}>
                {ptr - 1 === idx && !correct && <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M174.16 130.535C179.083 88.9103 244.691 107.984 223.022 144.589C209.505 167.422 172.14 179.086 176.143 142.58" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M86.2021 168.478C119.976 184.491 152.17 189.19 186.173 187.354C199.454 186.637 205.227 186.729 214.666 184.491C249.377 176.261 283.738 165.982 314.196 161.352" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M162.587 325.693C180.528 281.351 181.129 232.537 190.363 186.814" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M215.575 186.814C211.934 234.092 219.678 281.542 230.869 326.851" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
            </button>

        </div>
        </>
    )
}