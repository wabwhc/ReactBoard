import axios from "axios";
import { useRef } from "react";

export default function Edit(props) {

    let {title, content, post_id} = props;

    if(title === undefined){
        window.location.href = '/';
        //title = {innerText : "hello"};
        //content = {innerText : "hello"};
    }
   
    const titleRef = useRef();
    const contentRef = useRef();

    return(
        <form className="Write h-full">
            <div className="h-1/6">
                <div className="h-1/6" />
                <input ref={titleRef} name="title" defaultValue={title.innerText} className="block w-11/12 h-1/3 m-auto" type="text" placeholder="제목"/>
            </div>
            <div className="h-4/6">
                <textarea ref={contentRef} name="content" defaultValue={content.innerText} className="block w-11/12 h-5/6 m-auto" type="text" placeholder="글 내용"/>
                <button className="block h-1/6"
                onClick={(e) => {
                    e.preventDefault();
                    axios.put("http://localhost:8080/post",{
                        data : {
                            title: titleRef.current.value,
                            content: contentRef.current.value,
                            post_id
                        },
                        withCredentials:true,
                    }).then(e => {
                        if(e.data === 0){
                            window.location.href = "../"+post_id
                        }
                    })
                }}>수정</button>
            </div>
        </form>
    )
}