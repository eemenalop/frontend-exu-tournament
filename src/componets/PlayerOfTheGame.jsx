const PlayerOfTheGame = () => {
  return (
    <div className="relative max-w-md min-h-[400px] p-4 bg-slate-50 rounded-lg shadow-lg">
        <div className="absolute top-4 right-4 flex items-center bg-blue-600 text-white px-4 py
        -2 rounded-lg">
            <span className="mr-2">Jugador del partido VS </span>
            <img src="\src\teams_logos\nba-boston-celtics-logo.png" alt="VS Logo" className="h-9 w-9"/>
            </div>
        <div className="absolute top-16 left-4 flex items-center">Player-image
        <img className="h-32 w-32 rounded-full border-4 border-blue-600" />
        </div>
        <div>Player-info</div>
        <div>Team-logo</div>

    </div>
  )
}

export default PlayerOfTheGame