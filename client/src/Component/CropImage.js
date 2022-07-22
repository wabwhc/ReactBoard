import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"
import axios from "axios";
import { useState, useRef } from "react";

export default function CropImage(props){
    const [imgSrc, setImgSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit : "px",
        x : 0,
        y : 0,
        width : 0,
        height : 0,
    })

    const canvas = useRef();
    const image = useRef();

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onload = () => {
            setImgSrc(reader.result);
        }
    };

    const onCropComplete = (crop) => {
        const ctx = canvas.current.getContext("2d");
        const img = new Image();

        img.src = imgSrc;

        const ratio = img.width / image.current.width;

        canvas.current.width = crop.width * ratio;
        canvas.current.height = crop.width * ratio;
        
        ctx.drawImage(
            img,
            crop.x * ratio,
            crop.y * ratio,
            crop.width * ratio,
            crop.height * ratio,
            0,
            0,
            canvas.current.width,
            canvas.current.width,
        );
        canvas.current.style.width =  "300px"
        canvas.current.style.height =  "300px"
    }

    const cancel = (e) => {
        e.preventDefault();
        setImgSrc(null);
        canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height)
    }

    const commit = (e) => {
        e.preventDefault();
        const imgBase64 = canvas.current.toDataURL("image/jpeg", "image/octet-stream");
        axios.put("http://localhost:8080/user/img", {file : imgBase64}, {
            withCredentials: true
        }).then(
            () => {
                setImgSrc(null);
                canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height);
                //새로고침
                window.location.reload();
            }
        )
    }

    return(
        <div className="CropImage absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {
                imgSrc &&
                <>
                    <ReactCrop style={{"width" : "300px"}} onComplete={onCropComplete} circularCrop={true} crop={crop} aspect={1} onChange={(crop) => setCrop(crop)}>
                        <img style={{"width" : "300px"}} ref={image} src={imgSrc} alt="CropImg" />
                    </ReactCrop>
                    <div>
                        <button onClick={cancel}>취소</button>
                        <button onClick={commit}>변경</button>
                    </div>
                </>
            }
            <canvas ref={canvas} className="bg-white rounded-full hidden" style={{ "width" : "300px", "height" : "300px" }}></canvas>
            <input type="file" ref={props.file} className="hidden"
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
            /> 
        </div>
    )
}