import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const AwesomeBackground = () => (
    <WaveWrapper>
        <WaveWrapperInnerTop bg={Pos.TOP}>
            <WaveTop img="http://front-end-noobs.com/jecko/img/wave-top.png" />
        </WaveWrapperInnerTop>
        <WaveWrapperInnerMiddle bg={Pos.MIDDLE}>
            <WaveMiddle img="http://front-end-noobs.com/jecko/img/wave-mid.png" />
        </WaveWrapperInnerMiddle>
        <WaveWrapperInnerBottom bg={Pos.BOTTOM}>
            <WaveBottom img="http://front-end-noobs.com/jecko/img/wave-bot.png" />
        </WaveWrapperInnerBottom>
    </WaveWrapper>
)

export default AwesomeBackground

enum Pos {
    TOP,
    MIDDLE,
    BOTTOM,
}

const moveWave = keyframes`
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
`

const WaveWrapper = styled.div`
    /* waveWrapper */
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    /* waveAnimation */
`

interface IWaveWrapperInnerProps {
    bg: Pos
}
const WaveWrapperInner = styled.div<IWaveWrapperInnerProps>`
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to top, #86377b 20%, #27273c 80%);
`
const WaveWrapperInnerTop = styled(WaveWrapperInner)`
    z-index: 15;
    opacity: 0.5;
`
const WaveWrapperInnerMiddle = styled(WaveWrapperInner)`
    z-index: 10;
    opacity: 0.75;
`
const WaveWrapperInnerBottom = styled(WaveWrapperInner)`
    z-index: 5;
`

interface IWaveProps {
    img: string
}
const Wave = styled.div<IWaveProps>`
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;

    background-image: url('${props => props.img}');
`
const WaveTop = styled(Wave)`
    background-size: 50% 100px;
    animation: ${moveWave} 3s;
    animation-delay: 1s;
`
const WaveMiddle = styled(Wave)`
    background-size: 50% 120px;
    animation: ${moveWave} 10s linear infinite;
`
const WaveBottom = styled(Wave)`
    background-size: 50% 100px;
    animation: ${moveWave} 15s linear infinite;
`
