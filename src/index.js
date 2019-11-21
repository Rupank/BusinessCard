import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
    const [dob, setDob] = useState(new Date("04-26-2019").toLocaleString());
    const isDragging = useRef(false);
    const cardRef = useRef();
    const [styles, setStyles] = useState({
        top: 0,
        left: 0,
        position: 'absolute'
    })

    useEffect(() => {
        const moveGlobalHandler =
            (event) => {
                if (isDragging.current) {
                    setStyles({
                        left: (event.clientX - cardRef.current.offsetWidth / 2),
                        top: (event.clientY - cardRef.current.offsetHeight / 2),
                        opacity: 0.8,
                    })
                }
            }
        const mouseUpGlobalHandler = () => {
            isDragging.current = false;
            setStyles((prev) => ({
                ...prev,
                opacity: 1
            }))
        }
        window.addEventListener('mousemove', moveGlobalHandler);
        window.addEventListener('mouseup', mouseUpGlobalHandler);
        return () => {
            window.removeEventListener('mousemove', moveGlobalHandler);
            window.removeEventListener('mouseup', mouseUpGlobalHandler)
        };
    }, [])

    const setDobToNow = () => {
        setDob(new Date().toLocaleString());
    }

    const mouseDown = (event) => {
        isDragging.current = true;
    }

    return (
        <div className="App">
            <div className="card" style={styles}
                onMouseDown={mouseDown}
                ref={cardRef}>
                <div className="header">
                    <div><span>Earth-616</span></div>
                    <div><span>S.H.I.E.L.D.</span></div>
                    <div><span>678-136-7092</span></div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="logo">
                        <img src="/cap.png" alt="icon" width='100%' height='100%' />
                    </div>
                    <div>
                        <div className="name"><span style={{ fontWeight: "bold" }}>Capt. Steve Rogers</span></div>
                        <div className="dob" onClick={setDobToNow}>{dob}</div>
                        <div className="company">Stark Industries</div>
                    </div>
                </div>
                <div className="address">Avengers Facility, Upstate, New York</div>
            </div>
        </div>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)
