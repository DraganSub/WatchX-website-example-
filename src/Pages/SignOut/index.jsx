import React from "react"

const SignOutButton = ({props}) => (
    <button type="button" onClick={props.doSignOut}>
        Sign Out
    </button>
);

export default SignOutButton;