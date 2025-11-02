import React from "react"

function GameCard({gameId, image, title, description}){
    const handleCardClick = () => {
    window.location.href = `/game.html?id=${gameId}`
  }
    return(
        <div className="game-card" onClick={handleCardClick} style={{cursor: 'pointer'}}>
            <div className="game-card-image">
                <img src={image} alt="title"/>
            </div>
            <div className="game-card-content">
                <h3>
                    {title}
                </h3>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}
export default GameCard