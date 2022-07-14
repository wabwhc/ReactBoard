import { Link } from "react-router-dom";
import useAxiosGetFieldbyId from "../hooks/useAxiosGetFieldbyId";


export default function Subject(){
    const [subject] = useAxiosGetFieldbyId("subject");

    return(
        <div className="Subject w-full bg-white border-t-4 border-black">
            {
                subject !== null &&
                subject.map((subject) => 
                    <Link to={subject.subject} className="border-x-8" key={subject.subject}>
                        {subject.subject}
                    </Link>
                )
            }
        </div>
    )
}