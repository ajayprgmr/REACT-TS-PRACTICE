import { useEffect, useState } from 'react';
import styles from './requestAnimationFrame.module.css';

function Modal({ isOpen }: { isOpen: boolean }) {
    // const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     requestAnimationFrame(() => {
    //         setIsVisible(isOpen);
    //     });
    // }, [isOpen]);

    return (
        <div className={`${styles.modalContainer} ${isOpen ? styles.opening : styles.closing}`}>
            Hello from Modal
        </div>
    );
}

export default function RequestAnimationFrame() {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false)
    };

    return (
        <div className={styles.requestFrameAnimationContainer}>
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Hover Me
            </button>
            <Modal isOpen={hovered} />
        </div>
    );
}
