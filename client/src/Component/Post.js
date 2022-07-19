import { useParams } from "react-router-dom";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";
import Replybox from "./Replybox";
import axios from "axios";

export default function Post(props){
    //スレの内容を　見せる。
    const {id} = useParams();
    const [post] = useAxiosGetFieldbyId("post", id);
    const [replys] = useAxiosGetFieldbyId("reply/post", id);

    const {userid} = props.userid;


    return(
        <div className="Post h-full">
            <div className="h-5"></div>
            <div className="m-auto w-11/12 min-h-[40%] h-fit border-b-2 border-white">
                {
                    post && 
                    <p dangerouslySetInnerHTML={{__html : post.post_content}} id="content" />
                }
            </div>
            <button onClick={() => {
                    axios.delete("http://localhost:8080/post?id=" + id, {
                        data : {
                            userid : userid
                        },
                        withCredentials : true
                    }).then(
                        (e) => {
                            if(e.data === 0){
                                window.location.href = "/";
                            }else if(e.data === -1){
                                window.alert("로그인하세요.");
                            }else if(e.data === -2){
                                window.alert("이미 삭제된 글입니다.");
                            }else if(e.data === -3){
                                window.alert("작성자가 아닙니다.");
                            }
                        }
                    )
            }}>삭제</button>
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
    )
}