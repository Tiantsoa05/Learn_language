import React,{useState ,useEffect} from "react";
import PostCard from "./PostCard/PostCard.jsx";
import "./Post.css";
import axios from 'axios'
import {LANGUAGES} from '../../../../constants/Languages.js'

const Post = () => {
    const [post, setPost] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/all/profs').then(
            res=> {

                let prosArray = []

                res.data.map(prof=>{
                    console.log(res.data)
                    const {
                        id_prof,
                        nom_prof,
                        prenom_prof,
                        num_phone,
                        langue,
                        mail_prof
                    }=prof

                    let l = LANGUAGES.find(language =>language.name === langue.nom_langue)

                    prosArray.push({
                        id:id_prof,
                        langue: langue.nom_langue,
                        nom: [nom_prof,prenom_prof].join(' '),
                        telephone: num_phone,
                        icon: l.icon,
                        mail: mail_prof
                    })

                })
                setPost(
                    [...prosArray]
                )
            }
        )
    },[])
    return (
        <div className="overflow-x-hidden">
            {
                post.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            }
        </div>
    )
}

export default Post;