<template>
    <div class="loading">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="tip">

            <div class="loadingDot">l</div>
            <div class="loadingDot">o</div>
            <div class="loadingDot">a</div>
            <div class="loadingDot">d</div>
            <div class="loadingDot">i</div>
            <div class="loadingDot">n</div>
            <div class="loadingDot">g</div>
            <div class="loadingDot">.</div>
            <div class="loadingDot">.</div>
            <div class="loadingDot">.</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$ballSize : 10px; // 小球尺寸
$containerSize : 150px; // 容器尺寸
$n : 36; // 小球个数
$pDeg: calc(360deg / $n); // 每次转动角度
$ani-duration: 2000ms;


@keyframes moveWhite {
    0% {
        animation-timing-function: ease-in;
    }

    25% {
        transform: translate3d(0, 100%, $ballSize);
        animation-timing-function: ease-out;

    }

    50% {
        transform: translate3d(0, 200%, 0);
        animation-timing-function: ease-in;

    }

    75% {
        transform: translate3d(0, 100%, -$ballSize);
        animation-timing-function: ease-out;

    }
}

@keyframes moveBlack {
    0% {
        animation-timing-function: ease-in;
    }

    25% {
        transform: translate3d(0, -100%, -$ballSize);
        animation-timing-function: ease-out;

    }

    50% {
        transform: translate3d(0, -200%, 0);
        animation-timing-function: ease-in;

    }

    75% {
        transform: translate3d(0, -100%, $ballSize);
        animation-timing-function: ease-out;

    }
}

@keyframes dot-animation {
    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

.loading {
    width: $containerSize;
    height: $containerSize;
    margin: 50px auto;
    position: relative;
    border-radius: 50%;

    // outline: 1px solid #fff;
    .tip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        @include flex-center();
        color: #fff;

        .loadingDot {
            margin: 0 2px;
            opacity: 0;
            animation: dot-animation 1s infinite;
        }



        @for $i from 1 through 10 {
            .loadingDot:nth-child(#{$i}) {
                animation-delay: calc(-0.1s * $i);
            }

        }
    }

    .dot {
        position: absolute;
        left: 50%;
        top: 50%;
        width: $ballSize;
        height: $ballSize;
        margin-left: calc(-1 * $ballSize/2);
        margin-top: calc(-1 * $ballSize/2);
        // background-color: aqua;
        perspective: 70px; // 景深
        transform-style: preserve-3d;

        &::before,
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;

        }

        &::before {
            background-color: #fff;
            top: -100%;
            animation: moveWhite $ani-duration infinite;
        }

        &::after {
            background-color: #000;
            top: 100%;
            animation: moveBlack $ani-duration infinite;
        }
    }
}

@for $i from 1 through $n {
    .dot:nth-child(#{$i}) {
        transform: rotate($pDeg * $i) translateY(calc(-1 * $containerSize / 2));

        &::before,
        &::after {
            animation-delay: calc(-1 * $ani-duration/ $n * 6 * $i); // 非常巧妙
        }
    }
}</style>