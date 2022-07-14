import { useEffect, useState } from "react"


export default function Btnset(props){

    //スレの　目録を　分けて　見せる。
    const [currentSet, setCurrnet] = useState(0);
    const {postsCount, setPage} = props;
    const maxPage = Math.floor( postsCount / 10);
    const maxSet = Math.floor( maxPage / 10);
    const btnArr = document.getElementsByClassName("btn");

    useEffect(() => {
        for(let i = 0; i < 10; i++){
            btnArr[i].addEventListener("click", (e) => {
                e.preventDefault();
                setPage(btnArr[i].innerHTML - 1);
            })

            if(currentSet >= maxSet){
                const last = maxPage % 10;
                for(let i = last; i < 10; i++){
                    btnArr[i].style.display = "none"
                }
            }
        }
    }, []);

    useEffect(() => {
        if(currentSet >= maxSet){
            const last = maxPage % 10;
            for(let i = last; i < 10; i++){
                btnArr[i].style.display = "none"
            }
        }else{
            const last = maxPage % 10;
            for(let i = last; i < 10; i++){
                btnArr[i].style.display = "";
            }
        }
    })


    
    const moveRight = () => {
        if(currentSet < maxSet){
            setCurrnet(currentSet + 1);
        }else if(currentSet >= maxPage){
            setCurrnet(maxSet);
        }
    }

    const moveLeft = () => {
        if(maxSet > 0){
            setCurrnet(maxSet - 1);
        }else if(currentSet <= 0){
            setCurrnet(0);
        }
    }

    return(
        <div className="flex justify-center">
            <button onClick={moveLeft}>이전</button>
            <button className="btn border-4">{currentSet * 10 + 1}</button>
            <button className="btn border-4">{currentSet * 10 + 2}</button>
            <button className="btn border-4">{currentSet * 10 + 3}</button>
            <button className="btn border-4">{currentSet * 10 + 4}</button>
            <button className="btn border-4">{currentSet * 10 + 5}</button>
            <button className="btn border-4">{currentSet * 10 + 6}</button>
            <button className="btn border-4">{currentSet * 10 + 7}</button>
            <button className="btn border-4">{currentSet * 10 + 8}</button>
            <button className="btn border-4">{currentSet * 10 + 9}</button>
            <button className="btn border-4">{currentSet * 10 + 10}</button>
            <button onClick={moveRight}>다음</button>
        </div>
    )
}
