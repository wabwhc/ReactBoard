import convertTime from "../convertTime";
import { Link, useParams } from "react-router-dom";
//import { useState, useEffect } from "react";
//import axios from "axios";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";
import { useRef, useState } from "react";
import Btnset from "./Btnset";
import Inputbox from "./Inputbox";


export default function PostList(props){
  //スレの　目録と　ボタンを　見せる。
  const search = props.input;
  const [data, page, setPage] = useAxiosGetFieldbyId("post/page");
  
  return (
  <div className="PostList h-full">
      <Inputbox />
      <button className="block bg-red-300 ml-auto" onClick={() => window.location.href = "/write"}>글 작성</button>
      <div className="bg-red-100 h-4/5">
        {
            data !== null && data.posts.map((post, index) =>     
              <Link to={"/post/" + post.post_id} key={index} className="flex flex-row h-1/12">
                    <div className="basis-1/4 text-base text-left">{convertTime(post.post_at)}</div>
                    <div className="basis-1/4 text-base text-center">{post.post_title}</div>    
                    <div className="basis-1/4 text-base text-center">{post.userid}</div>
              </Link>
            )
        }
      </div>
      <div className="bg-green-200">
        {
          data !== null && <Btnset postsCount={data.postsCount.count} setPage={setPage}/>
        }
      </div>
  </div>
  )
}