import { CSSTransition } from "react-transition-group";

export default function AnimationLayout(props) {
  return (
    <>
      {
        <CSSTransition
          classNames={props.classNames ? props.classNames : "posts"}
          in={props.isShow ? props.isShow : false}
          timeout={props.timeout ? props.timeout : 2000}
          unmountOnExit
        >
          {props.children}
        </CSSTransition>
      }
    </>
  );
}
