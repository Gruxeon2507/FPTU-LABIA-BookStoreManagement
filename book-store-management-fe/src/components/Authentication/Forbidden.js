import React from "react";
import "./Forbidden.scss"
function ForbiddenPage() {
    return (
        <div className="forbiddenPage">
                <div></div>
                <h1><span className="forbiddenTitle">403</span> - Forbidden</h1>
                <p>You Do Not Have Access To This Page <a href="javascript:history.go(-1)">Return To Previous Page</a></p>
        </div>
    )
}
export default ForbiddenPage