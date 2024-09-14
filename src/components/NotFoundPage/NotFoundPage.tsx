import styles from './NotFoundPage.module.scss';
import {Link} from "react-router-dom";
import {useEffect} from "react";
import anime from 'animejs/lib/anime.es.js';
import {NotFoundAnimations} from "./NotFoundAnimations";  // Импорт anime.js


export const NotFoundPage = () => {

        useEffect(() => {
    // Анимация для svg
    anime({
        targets: '.row svg',
        translateY: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate'
    });

    // Анимация для элемента с id "zero"
    anime({
        targets: '#zero',
        translateX: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate',
        // scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 250 },
        // Устанавливаем transform-origin на центр элемента
        begin: function(anim) {
            const target = document.getElementById('zero');
            if (target) {
                target.style.transformOrigin = 'center center';
                // Применение transform-origin
            }
        },
    });

}, []); // useEffect чтобы анимация запускалась только при монтировании компонента



    return (
        <div className={styles.notFoundPage}>
           <NotFoundAnimations/>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};
