import React from "react";

export function CustomButton({
                                 width,
                                 height,
                                 top,
                                 content,
                                 onClick,
                                 href,
                                 secondary,
                                 bold,
                                 style,
                                 border,
                                 paddingTop,
                             }) {
    const baseStyle = {
        width: width && `${width}px`,
        fontWeight: bold ? "700" : "400",
        height: height && `${height}px`,
        marginTop: top ? top : "0px",
        backgroundColor: secondary && "white",
        color: secondary && "black",
        borderRadius: secondary && "1px",
        border: border ? `${border}px solid #414141` : "0px solid #414141",
        paddingTop: paddingTop && `${paddingTop}px`,
    };
    const $ = require("jquery");

    const handleMouseEnter = (e) => {
        if (secondary) {
            $(e.target)
                .css("background-color", "#fff")
                .css("color", "#000")
                .css("border", `${border ? border : 1}px solid #000`);
        }
    };
    const handleMouseLeave = (e) => {
        if (secondary) {
            $(e.target)
                .css("background-color", "#fff")
                .css("color", "#000")
                .css("border", `${border ? border : 1}px solid #414141`);
        }
    };
    const exStyle = {...baseStyle, ...style};
    return (
        <>
      <span>
        <a
            style={exStyle}
            onClick={onClick}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
            className="custom-button"
            href={href}
        >
          {content}
        </a>
      </span>
        </>
    );
}
