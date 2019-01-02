import React, { Component } from "react";
import classes from "./modal.css";
import Aux from "../../../hoc/aux";
import Backdrop from "../backdrop/backdrop";
// const Modal = props => {
//   return (
//     <Aux>
//       <Backdrop
//         showBackdrop={props.order}
//         clickBackdrop={props.clickBackdrop}
//       />
//       <div
//         className={classes.Modal}
//         style={{
//           transform: props.order ? "translateY(0)" : "translateY(-100vh)",
//           opacity: props.order ? "1" : "0"
//         }}
//       >
//         {props.children}
//       </div>
//     </Aux>
//   );
// };

// export default Modal;

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.order !== this.props.order ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop
          showBackdrop={this.props.order}
          clickBackdrop={this.props.clickBackdrop}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.order
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.order ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
