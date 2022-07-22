import {Routes, Route} from "react-router-dom";
import axios from "axios";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";
import PostList from "./PostList";
import Post from "./Post";
import Write from "./Write";
import Userimg from "./Userimg";
import { useRef, useState } from "react";



function App() {
  //로그인된 유저아이디, 이미지를 가져온다
  //ユーザーのユーザーID と　ユーザーの　プロフィール　写真を　要求する
  let [user] = useAxiosGetFieldbyId("user");
  const [url] = useAxiosGetFieldbyId("user/img", 0,"blob");

  if(!user) user = {userid : "default"}

  return (
    <div className="App grid grid-cols-7 gap-0 w-full h-full">
      {/*ユーザーの　情報を　見せる　部分　*/}
      <div className="left col-span-1 bg-red-300">
        <div className="basis-1/6 bg-white">
          <Userimg url={url} based={"w"} user={user}/>
          <div>
            {
              user.userid !== "default" && <h1 className="text-center">{user.userid}</h1>
            }
          </div>
        </div>
      </div>
      
      {/*スレの目録や　スレの内容、　スレを　作成する　部分*/}
      <div className="middle col-span-5 flex flex-col bg-blue-300">
        <div className="basis-1/12 bg-red-500">게시판 이름</div>
        <div className="basis-11/12">
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/post/:id/*" element={<Post userid={user} />} />
            <Route path="/" element={<PostList />} />
          </Routes>
        </div>
      </div>

      {/*ログインや　ログアウトなどの　ボタンが　ある　部分*/}
      <div className="right col-span-1 bg-green-300">
        {
          user.userid === "default"?
          <button onClick={() => window.location.href = "/sign"} className="block m-auto">로그인/회원가입</button>
          :<button onClick={() => axios.get("http://localhost:8080/logout", {withCredentials: true}).then(() => window.location.href="/")} className="block m-auto">
            로그아웃
          </button>
        }
      </div>
    </div>
  );
}

export default App;
