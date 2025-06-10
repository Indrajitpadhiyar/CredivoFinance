import { useEffect } from "react";

const Scroll = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}

export default Scroll