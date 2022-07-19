import { useParams } from "react-router-dom"

export default function Replybox(){
    const {id} = useParams();


    return(
        <div className="Replybox w-full">
            <form className="w-full" action={"http://localhost:8080/reply/post?id=" + id} method="post">
                <input name="content" className="w-full" placeholder="댓글 입력"
                    onKeyDown={(e) => {
                        if(e.key === "Enter") e.preventDefault();
                    }}/>
                <button className="block mx-auto bg-green-700"> 댓글 작성</button>
            </form>
            <br />
        </div>
    )
}