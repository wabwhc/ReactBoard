import { Link, useParams } from "react-router-dom";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";
import Userimg from "./Userimg";
import "react-image-crop/dist/ReactCrop.css"
import { useRef, useState } from "react";
import CropImage from "./CropImage";




export default function Profile(){
    //ユーザーの　プロフィール
    //ユーザーの　スレと　コメントを　見せる。
    //プロフィール写真の　変更が　できる。
    const {id} = useParams();
    const [url] = useAxiosGetFieldbyId("user/img", id, "blob");
    const [userid] = useAxiosGetFieldbyId("user");
    
    const file = useRef();

    const [what, setWhat] = useState("post/user");

    let [results] = useAxiosGetFieldbyId(`${what}`, id);

    return(
        <div className="Profile w-full h-full bg-red-200 flex flex-row">
            <div className="basis-1/6 bg-red-100"></div>
            <div className="basis-4/6 bg-red-400 flex flex-col">
                <div className="basis-1/3 bg-blue-300 flex flex-col">
                    <div className="basis-1/5 bg-green-100">
                        <Link to="/"> 게시판 </Link>
                    </div>
                    <div className="basis-3/5 bg-green-400 flex flex-row">
                        <Userimg url={url} based={"h"} />
                        <div className="w-full h-full bg-white"></div>
                    </div>
                    <div className="basis-1/5 bg-green-700">
                    <button onClick={() => {
                        if(userid === null){
                            return window.alert("다른 사람의 프로필입니다.")
                        }else if(userid.userid !== id){
                            return window.alert("다른 사람의 프로필입니다.")
                        }
                        file.current.click();
                    }} className="h-2/3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full">
                      프로필 수정
                    </button>
                    </div>
                </div>
                <div className="basis-2/3 bg-blue-600 flex flex-row">
                    <div className="basis-1/5 bg-white">
                        <div className="text-center py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100" onClick={() => setWhat("post/user")}>작성 글</div>
                        <div className="text-center py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100" onClick={() => setWhat("reply/user")}>작성 댓글</div>
                    </div>
                    <div className="basis-4/5 bg-yellow-300">
                        {
                            results !== null && results.length !== 0?
                            results.map((result) => 
                                <Link key={result.id} className="block border-b-slate-500  border-y-2" to={`/post/${result.id}`}>
                                    {result.title}
                                </Link>
                            )
                            : "작성한 내용이 없습니다."
                        }
                    </div>
                </div>
            </div>
            <div className="basis-1/6 bg-red-900">
            </div>
            <CropImage file={file} />
        </div>
    )
}
