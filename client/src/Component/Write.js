import axios from "axios";
import { useRef, useState } from "react"

export default function Write(){

    const titleRef = useRef();
    const contentRef = useRef();

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
        <form className="Write h-full" method="post" action="http://localhost:8080/post">
            <div className="h-1/6">
                <div className="h-1/6" />
                <input name="title" ref={titleRef} onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        e.preventDefault();
                        contentRef.current.focus();
                    }
                }} className="block w-11/12 h-1/3 m-auto" type="text" placeholder="제목"/>
               
            </div>
            <div className="h-4/6">
                <textarea name="content" ref={contentRef} className="block w-11/12 h-5/6 m-auto" type="text" placeholder="글 내용"/>
                <button className="block h-1/6" onClick={(e) => {
                    const code = doneWrite();
                    if(code < 0) {
                        e.preventDefault();
                    }
                }}>작성</button>
            </div>
        </form>
    )
}