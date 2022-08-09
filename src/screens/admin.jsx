import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Clients from "./client";
import Questions from "./questions";

export const Admin = () => {
    const [isQuestionsPage, setIsQuestionsPage] = useState(false);
    const navigate = useNavigate();

    const backClick = () => {
      navigate(-1)
    }

    const onToggle = (e) => {
        console.log(e.target.checked)
        setIsQuestionsPage(e.target.checked)
    }

    return(
        <section>
            <div onClick={backClick} className="prev">Back to Previous Page</div>
            <div className="switcher-box">
                <span>Clients</span>
                <div className="switcher text-center">
                    <input type="checkbox" onChange={onToggle} className="toggle"/>
                </div>
                <span>Questions</span>
            </div>

            <section>
                {
                    isQuestionsPage? <Questions/>: <Clients/>
                }
            </section>
        </section>
    );
}