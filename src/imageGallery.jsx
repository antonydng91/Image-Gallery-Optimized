import {useEffect,useState,useRef, useCallback, useMemo} from 'react';
import {imageUrls} from './imageUrls';


export default function ImageGallery(){

    const [imageCount,setImageCount]=useState(3); //loading 3 images at a time
    const [loadUrls,setLoadedUrls]=useState([]);
    const interSecRef=useRef();
    
    const options = useMemo(()=> { return{
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    }
      },[]);

      const loadThedata=()=>{
        setImageCount((prev)=>{
           return prev+3;
        })
      }
      
      const callback=useCallback((observer)=>{
       if(observer[0].isIntersecting){
            loadThedata() 
        }
    },[])

    useEffect(()=>{
        let observer = new IntersectionObserver(callback, options);
        observer.observe(interSecRef.current);
        setLoadedUrls(imageUrls.slice(0,imageCount+1));
        return ()=>{
            if(interSecRef.current){
                observer.unobserve(interSecRef.current); 
            }
        }
    },[imageCount,callback,options])



    return (
    <>
         <h1>Image is Lazy Loaded here</h1>
          <div className="grid-container">
            {loadUrls && loadUrls.map((obj)=>{
                let key=Object.keys(obj)[0];
             return <img className="lazy-images" key={key} loading="lazy" alt="" src={obj[key]}></img>
            })}
            <div ref={interSecRef}></div>
           </div>
   </>
    )

}