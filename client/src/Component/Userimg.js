
export default function Userimg(props){
    //ユーザーの　写真を　作る。
    const tailwindStyle = `Userimg rounded-full ${props.based}-full aspect-square bg-cover`;
    let path;
    if(props.user === undefined || props.user === null || props.user.userid === "default"){
        path = "../sign"
    }else {
        path = props.user.userid
    }
    
    const url = "/profile/" + path;
    
    return(
        <div id="profile" className={tailwindStyle} style={{ "backgroundImage" : `url(${props.url})`}} 
            onClick={() => {
                window.location.href = url;
            }}
        />
    )
}