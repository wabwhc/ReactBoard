import { useRef, useState } from "react"

export default function Write(){

    const titleRef = useRef();
    const contentRef = useRef();
    const btnRef = useRef();

    const doneWrite = () => {
        const title = titleRef.current.value.trim();
        const content = contentRef.current.value.trim();

        if(title === ""){
            window.alert("제목을 입력하세요");
            return -1;
        }else if(content === ""){
            window.alert("내용을 입력하세요");
            return -2;
        }

        return 0;
    }


    return(
        <div className="Write h-full">
            <div className="h-1/6">
                <div className="h-1/6" />
                <input ref={titleRef} onKeyUp={(e) => {
                    if(e.key === "Enter") contentRef.current.focus();
                }} className="block w-11/12 h-1/3 m-auto" type="text" placeholder="제목"/>
            </div>
            <div className="h-4/6">
                <textarea ref={contentRef} onKeyUp={(e) => {
                    if(e.key === "Enter") btnRef.current.click();
                }} className="block w-11/12 h-5/6 m-auto" type="text" placeholder="글 내용"/>
                <button ref={btnRef} className="block h-1/6" onClick={() => {
                    const a = doneWrite();
                    console.log(a);
                }}>작성</button>
            </div>
        </div>
    )
}