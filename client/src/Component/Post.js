import { useParams } from "react-router-dom";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";

function Post(){
    //スレの内容を　見せる。
    const {id} = useParams();
    const [post] = useAxiosGetFieldbyId("post", id);
    
    return(
        <div className="Post">
            <div>
                {
                    post && 
                    <>
                        {
                            post.post_content
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Post;