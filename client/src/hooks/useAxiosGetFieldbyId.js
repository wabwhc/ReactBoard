import {useEffect, useState} from "react";
import axios from "axios";

export default function useAxiosGetFieldbyId(argField, argId=0, type="json"){

  const [id, setId] = useState(argId);
  const [data, setData] = useState(null);
  const url = `http://localhost:8080/${argField}?id=${id}`;

  useEffect(() => {
    axios.get(url,{
      withCredentials:true,
      responseType : type,
    }).then(
      e => {
        if(e.data === ""){
          
          //return setData(undefined);
        }else{
          let {data} = e;

          if(type === "blob"){
            data = makeImgUrl(e.data);
          }
          return setData(data);
        }
      }
    )
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url]);
  return [data, id, setId];
}

const makeImgUrl = (argblob) => {
  const blob = new Blob([argblob]);
  const ImgUrl = URL.createObjectURL(blob);
  return ImgUrl
}