import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GameCard from '../../components/GameCard'

function HomePage() {
    const games = [
        {
            id: 1,
            title: "Dungeons & Dragons",
            image: "/img/DnD.png",
            description: "Классическая НРИ"
        },
        {
            id: 2,
            title: "Pathfinder",
            image: "public/img/PathFinder.png",
            description: "Альтернатива D&D"
        },
        {
            id: 3,
            title: "Warhammer",
            image: "public/img/Warhammer.png",
            description: "Дарк Фентези в космосе"
        }
    ]
    return (
        <>
            <Header />
            <main>
                <div className="main-container">
                    <ul>
                        <li><h1>Доброе пожаловать в BoneFire!</h1></li>
                        <li>Найдите людей для игры в D&D!</li>
                    </ul>
                    <div className="games-grid">
                        {games.map(game => (
                            <GameCard
                                key={game.id}
                                gameId={game.id}
                                image={game.image}
                                title={game.title}
                                description={game.description}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage