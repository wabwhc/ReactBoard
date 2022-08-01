import {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import SignForm from "./SignForm";


export default function Sign(){
    //ログイン
    const [signstate, setSignstate] = useState(true);
    const idRef = useRef();
    const pwRef = useRef();

    useEffect(() => {
        if(signstate){
            idRef.current.style.backgroundColor = "white"
            pwRef.current.style.backgroundColor = "#d3d3d3"
        }else{
            idRef.current.style.backgroundColor = "#d3d3d3"
            pwRef.current.style.backgroundColor = "white"
        }
    }, [signstate]);



    return(
        <div className="Login flex flex-row w-full h-full">
            <div className="basis-1/6"></div>
            <div className="basis-4/6 bg-red-300 flex flex-col">
                <div className="basis-1/5 bg-green-200">
                    <Link to="/">게시판</Link>
                </div>
                <div className="basis-2/4 bg-blue-600">
                    {
                        signstate 
                        ?<SignForm sign={"signin"}/>
                        :<SignForm sign={"signup"}/>
                    }
                </div>
                <div className="basis-2/5">
                    <button ref={idRef} onClick={() => setSignstate(true)}>로그인</button>
                    <button ref={pwRef} onClick={() => setSignstate(false)}>회원가입</button>
                </div>
            </div>
            <div className="basis-1/6"></div>
        </div>
    )
}