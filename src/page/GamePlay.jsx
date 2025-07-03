import { useEffect, useRef, useState } from "react"
import '../layout/Layout.css'
import GameInfo from "../components/GameInfo";
import GameBoard from "../components/GameBoard";

const TIME_COUNTDOWN = 4000

function GamePlay() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [totalPoints, setTotalPoints] = useState(5)
  const [gameAreaSize, setGameAreaSize] = useState({width: 0, height: 0})
  const [pointsDisplayList, setPointsDisplayList] = useState([])
  const gameAreaRef = useRef()
  const [currentPointIndex, setCurrentPointIndex] = useState(0)
  const timerIntervalId = useRef(null)
  const [isWin, setIsWin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const countdownIntervalIds = useRef([])

  useEffect(() => {
    const height = gameAreaRef.current.clientHeight - 30
    const width = gameAreaRef.current.clientWidth - 30
    setGameAreaSize({width, height})
  },[])

  useEffect(() => {
    return () => {
      clearInterval(timerIntervalId.current)
      countdownIntervalIds.current.forEach(clearInterval)
    }
  }, [])

  const handlePointClick = (e) => {
    const element = e.currentTarget
    const value = Number(element.value)
    if(currentPointIndex + 1 === value){
      setCurrentPointIndex(prev => prev + 1)
      element.classList.add('hidden')
      setPointsDisplayList(prevList => {
        const newList = prevList.map((item, idx) => {
          if(idx === value - 1) {
            return { ...item }
          }
          return item
        })
        const id = setInterval(() => {
          setPointsDisplayList(list => {
            return list.map((pt, i) => {
              if(i === value - 1 && pt.countdown > 0) {
                return { ...pt, countdown: pt.countdown - 100 }
              }
              return pt
            })
          })
        }, 100)
        countdownIntervalIds.current.push(id)
        setTimeout(() => {
          element.style.display = 'none'
          clearInterval(id)
        }, TIME_COUNTDOWN)
        return newList
      })
      if(currentPointIndex + 1 === totalPoints){
        clearInterval(timerIntervalId.current)
        setIsWin(true)
        setCurrentPointIndex(0)
        setIsAutoPlay(false)
      }
    } else {
      setIsError(true)
      clearInterval(timerIntervalId.current)
      setIsAutoPlay(false)
    }
  }

  const handleTotalPointsChange = (e) => {
    const value = Number(e.target.value)
    if(value) setTotalPoints(value)
    if(value === 0) setTotalPoints('')
  }

  const handleStartGame = () => {
    setPointsDisplayList([])
    clearInterval(timerIntervalId.current)
    setElapsedTime(0)
    setIsError(false)
    setCurrentPointIndex(0)
    setIsAutoPlay(false)
    setIsWin(false)
    countdownIntervalIds.current.forEach(clearInterval)
    countdownIntervalIds.current = []
    if(!totalPoints){
      alert('Please enter the number of points!')
      return
    }
    const newPoints = []
    for(let i = 0; i < totalPoints; i++) {
      const randX = Math.random() * gameAreaSize.width - 5
      const randY = Math.random() * gameAreaSize.height - 5
      const positionX = randX < 0 ? 0 : randX
      const positionY = randY < 0 ? 0 : randY
      newPoints.push({
        top: positionY,
        left: positionX,
        id: Math.floor(Math.random() * 10000) + positionX + positionY,
        countdown: TIME_COUNTDOWN
      })
    }
    setPointsDisplayList(newPoints)
    timerIntervalId.current = setInterval(() => {
      setElapsedTime(pre => +(pre + 0.1).toFixed(1))
    }, 100)
  }

  useEffect(() => {
    let id
    let number = currentPointIndex
    if(isAutoPlay && currentPointIndex < totalPoints){
      const buttons = gameAreaRef.current.querySelectorAll("button")
      id = setInterval(() => {
        if(number >= totalPoints) {
          clearInterval(id)
          setIsAutoPlay(false)
          return
        }
        buttons.forEach((item) => {
          if(number + 1 === Number(item.value)){
            item.click()
          }
        })
        number++
      }, 1000)
    } else {
      clearInterval(id)
    }
    return () => {
      clearInterval(id)
    }
  }, [isAutoPlay, currentPointIndex, totalPoints])

  return (
    <div className="container">
      <div className="backgroud-game">
        <GameInfo 
          win={isWin} 
          error={isError} 
          points={totalPoints} 
          time={elapsedTime} 
          onChangePoint={handleTotalPointsChange} 
          onRestart={handleStartGame} 
          auto={isAutoPlay} 
          setAuto={setIsAutoPlay} 
        />
        <GameBoard 
          arrDisplay={pointsDisplayList} 
          gamePlayRef={gameAreaRef} 
          handleClickPoint={handlePointClick} 
          timeCountdown={TIME_COUNTDOWN} 
        />
        <div className="next-number-container">
          <p>Next: {currentPointIndex + 1}</p>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;