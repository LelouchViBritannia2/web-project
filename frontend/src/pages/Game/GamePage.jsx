import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function GamePage() {
  const [gameData, setGameData] = useState(null)
  const [gameId, setGameId] = useState(null)

  // Получаем ID игры из URL параметров
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    setGameId(id)

    // Загружаем данные игры по ID
    loadGameData(id)
  }, [])

  // Функция для загрузки данных игры
  const loadGameData = (id) => {
    const gamesData = {
      '1': {
        title: "Dungeons & Dragons",
        image: "/img/DnD.png",
        description: "Классическая настольная ролевая игра в фэнтезийном мире",
        master: "Гендальф"
      },
      '2': {
        title: "Pathfinder",
        image: "/img/PathFinder.png",
        description: "Современная альтернатива D&D с глубокой системой персонажей",
        master: "Арагорн"
      },
      '3': {
        title: "Warhammer",
        image: "/img/Warhammer.png",
        description: "Эпические фэнтезийные военные сражения",
        master: "Тирион"
      }
    }
    setGameData(gamesData[id])
  }

  if (!gameData) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <Header />
      <main>
        <div className="main-container">
          <div className="game-info">
            <div className="game-header">
              <div className="game-icon">
                <img src={gameData.image} alt={gameData.title} />
              </div>
              <div className="game-details">
                <h1>{gameData.title}</h1>
                <p>{gameData.description}</p>
                <div className="game-stats">
                  <span>Мастер: {gameData.master}</span>
                </div>
              </div>
            </div>

            <hr />

            <div className="game-actions">
              <button className="join-button">Присоединиться к игре</button>
            </div>

            <hr />

            <div className="comments">
              <h3>Недавние Обсуждения</h3>
              <div className="add-comment">
                <textarea placeholder="Напишите комментарий..."></textarea>
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default GamePage