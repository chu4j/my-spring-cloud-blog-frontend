import React, {useEffect, useLayoutEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useHistory, useParams} from "react-router-dom";
import API from "../data/DataUrl";
import RequestBuilder from "../util/RequestBuilder";
import {isNumeric} from "../util/Utils";
import {BLOG_TITLE, NOT_FOUND_URL} from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import Posts from "./Posts";

async function getPost(postId) {
    const axios = require("axios").default;
    const url = new RequestBuilder()
        .setUrl(API.GET_POST_BY_ID_URL)
        .setPathVar(postId)
        .build()
        .toUrlString();
    return axios.get(url).then((res) => res.data);
}

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

export default function OnePost() {
    let {postId} = useParams();
    const [post, setPost] = useState({});
    const [title, setTitle] = useState();
    const history = useHistory();
    useEffect(() => {
        const checkNumberic = isNumeric(postId);
        if (!checkNumberic) {
            history.push(NOT_FOUND_URL);
        }
        getPost(postId).then((data) => {
            let response = {
                list: Array(data),
            };
            setPost(response);
            data && Array(data).forEach((x) => setTitle(x.title));
        });
    }, []);
    const $ = require("jquery");
    $(document).on("click", 'a[href^="#"]', function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $($.attr(this, "href")).offset().top - 120,
            },
            500
        );
    });
    const [width, height] = useWindowSize();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{title + "-" + BLOG_TITLE}</title>
                <meta name="description" content={title}/>
            </Helmet>

            <DefaultLayout
                width={width > 960 ? 8 : 16}
                imgSrc={post.list && post.list[0].remark1}
                background
            >
                <Posts
                    response={post}
                    colorTitle={post.list && post.list[0].remark1 ? true : false}
                    imgSrc={post.list && post.list[0].remark1}
                    focus
                />
            </DefaultLayout>
        </>
    );
}
