import { useEffect, useRef, useState } from "react";
import axios from "axios";

function postSign(Ref, sign, Event) {
    Event.preventDefault();
    const body = {
        username : Ref.current.username.value,
        password : Ref.current.password.value,
    }
    axios.post("http://localhost:8080/" + sign, body, {
        withCredentials: true
    }).then(
        e => {
            if(e.data === 0){
                window.location.href = "/";
            }else if(e.data === "toSignin"){
                window.location.href = "/sign";
            }else if(e.data === -1){
                window.alert("로그인 정보가 옳지않습니다.");
            }else if(e.data === -2){
                window.alert("회원가입에 실패했습니다.");
            }
        }
    )
}

function confirm(valueArr, Ref,  sign, Event){
    Event.preventDefault();
    const len = valueArr.length;
    for(let i = 0; i < len; i++){
        console.log(valueArr[i].trim())
        if(valueArr[i].trim() === ""){
            window.alert("값을 제대로 입력하세요");
            return;
        }
    }
    postSign(Ref, sign, Event);
}

export default function SignForm(props){
    const FormRef = useRef();
    const signState = props.sign;

    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const inputArr = [inputId, inputPw];

    useEffect(() => {
        setInputId("");
        setInputPw("");
        FormRef.current.username.focus();
    }, [props]);

    let signText = "";

    if(props.sign === "signin"){
        signText = "로그인";
    }else if(props.sign === "signup"){
        signText = "회원가입";
    }

    return(
        <form ref={FormRef} className="SignForm h-full">
            <input value={inputId} onChange={(e) =>  setInputId(e.target.value)} className="block w-5/6 h-1/5 text-3xl text-center m-auto" name="username"  placeholder="아이디" />
            <input value={inputPw} onChange={(e) =>  setInputPw(e.target.value)} className="block w-5/6 h-1/5 text-3xl text-center m-auto" name="password" type="password" placeholder="비밀번호" />
            <button className="block w-1/2 text-2xl m-auto bg-red-400" onClick={e => confirm(inputArr ,FormRef, signState, e)}>{signText}</button>
        </form>
    )
}