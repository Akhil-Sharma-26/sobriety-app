import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button/Button.jsx";
import parse from "html-react-parser";
import axios from "axios";
import BlogCard from "../components/BlogCard.jsx";

export default function BlogPage() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    async function fetchPosts() {
        const res = await axios.get("http://localhost:8080/api/v1/users/all-blogs");
        console.log(res.data.blogs);
        setPost(res.data.blogs);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return post ? (
        <div className="py-8">
            {post.map((post) => {
                return(
                    <BlogCard
                        key={post.id}
                        heading={post.heading}
                        content={parse(post.content)}
                        author={post.display_name}
                        date={post.date}
                    />
                )
            })}
        </div>
    ) : null;

}