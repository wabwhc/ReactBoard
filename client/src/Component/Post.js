import { useParams, Routes, Route, Link } from "react-router-dom";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";
import Replybox from "./Replybox";
import axios from "axios";
import Edit from "./Edit";
import { useRef } from "react";

export default function Post(props){

    //スレの内容を　見せる。
    const {id} = useParams();
    const [post] = useAxiosGetFieldbyId("post", id);
    const [replys] = useAxiosGetFieldbyId("reply/post", id);
    const {userid} = props.userid;

    const title = useRef();
    const content = useRef();

    if(post === undefined){
        window.location.href = "/";
        window.alert("없는 글");
    }

    return(
        <Routes>
            <Route path="edit" element={ <Edit post_id = {id} title = {title.current} content = {content.current}/>}/>
            <Route path="" element=
            {
                <div className="Post h-full">
                <div className="h-5"></div>
                <div className="m-auto w-11/12 min-h-[40%] h-fit border-b-2 border-white">
                    <div className="bg-white" ref={title}>
                        {
                            post &&
                            post.post_title
                        }
                    </div>
                    
                    {
                        post && 
                        <p ref={content} dangerouslySetInnerHTML={{__html : post.post_content}} id="content" />
                    }
                </div>
                <button onClick={() => {
                    if(post.userid === userid && post.userid !== "default"){
                        axios.delete("http://localhost:8080/post?id=" + id, {
                        withCredentials : true
                        }).then(
                            (e) => {
                                if(e.data === 0){
                                    window.location.href = "/";
                                }
                            }
                        )
                    }else{
                        window.alert("작성자가 아닙니다.");
                    }
                }}>삭제</button>
                <Link to='./edit' onClick={(e) => {
                    if(post.userid !== userid || post.userid === "default"){
                        e.preventDefault();
                        window.alert("작성자가 아닙니다.");
                    }
                }}>수정</Link>
                <div className="m-auto w-11/12 bg-gray-100">
                    <Replybox />
                    {
                        replys === null || replys.length === 0
                        ? <h1>댓글 없음</h1>
                        : replys.map((reply, index) => {
                            let background = "";
                            if(index % 2 === 0){
                                background = "white";
                            }
                            return <h1 key={index} className="border-black border-t-2" style={{ "background" : `${background}` }}>{reply.userid}  :  {reply.reply_content}</h1>
                        })
                    }
                </div>
                </div>
            } />
        </Routes>
    
    )
}