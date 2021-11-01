import React from "react";
import {Helmet} from "react-helmet";

export default function HeadMeta(props) {
    return (
        <>
            <Helmet title={props.title}>
                <meta charSet="utf-8"/>
                <meta name="description" content={props.description}/>
                <meta property="og:title" title={props.title} content={props.title}/>
                <meta
                    property="og:description"
                    title={props.description}
                    content={props.description}
                />
            </Helmet>
        </>
    );
}
