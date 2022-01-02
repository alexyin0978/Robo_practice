import React from "react";

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', border: '0.1px black solid', height: '620px' }}>
            {props.children}  
            {/*prop.children包含了所有被<Scroll>包裹的子tag*/}
        </div>
    )
}

export default Scroll;