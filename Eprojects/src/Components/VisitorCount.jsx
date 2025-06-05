import React, { useEffect, useRef, useState} from 'react';

const VisitorCount = () => {
    const [count, setCount] = useState(0);
    const hasVisited = useRef(false);

    useEffect(() => {
        if (!hasVisited.current){
            hasVisited.current = true;
        
            const storedCount = localStorage.getItem('VisitorCounter');
            const newCount = storedCount ? parseInt(storedCount) + 1 : 1;

            localStorage.setItem('VisitorCounter', newCount);
            setCount(newCount);
        }
    }, []);

    return (
        <>
        <p>{count}</p>
        </>
    )
}

export default VisitorCount 