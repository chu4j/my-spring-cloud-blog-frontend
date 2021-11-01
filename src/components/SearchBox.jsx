import React from "react";
import {Divider} from "semantic-ui-react";

export default function SearchBox(props) {
    return (
        <>
            {props.data && (
                <div
                    className="searchbox-container"
                    onMouseEnter={props.enter}
                    onMouseLeave={props.enterExit}
                    onBlur={props.outFocus}
                    tabIndex="-1"
                >
                    <Divider/>
                    {props.data.map((e, index) => (
                        <div key={index}>
                            <a
                                href={"/post/" + e.serialNumber}
                                style={{padding: "10px 1em 0 1em"}}
                            >
                                {e.title}
                            </a>

                            <Divider/>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
