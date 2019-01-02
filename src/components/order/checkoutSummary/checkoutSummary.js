import React from "react";
import Burger from "../../burger/burger";
import Button from "../../UI/button/button";
import classes from "./checkoutSummary.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clickButton={props.clickAndCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clickButton={props.clickAndContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
