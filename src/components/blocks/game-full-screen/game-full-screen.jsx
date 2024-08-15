export default function GameFullScreen({closeGameFullScreen, title}) {
    // const gamePicUrl ="https://dnd-game.ru/";

    return (
        <>
            <div> 
                <button type="button" onClick={closeGameFullScreen}>Close</button>
                <p>Games</p>
                <button type="button">Like</button>
                <button type="button">Copy</button>
            </div>  
            <div>
                {/* {cards.games.images.slice(0, 10).map((picture, id) => (
                    <img
                    key={id}
                    className={main__games-images-${id === 0 ? 'first' : 'additional'}}
                    src={${gamePicUrl}${picture.image}}
                    width={id === 0 ? "244" : "80"}
                    height={id === 0 ? "164" : "80"}
                    alt="Pic."
                    />
                ))} */}
            </div>
            <div>
                <h1>{title}</h1>    
                <label></label>     
                <label></label>   
            </div>
            <div>
                <div>
                    <h2>General</h2>
                    <p>Game Systems</p>
                    <label></label>
                    <p>Platform (VTT)</p>
                    <label></label>
                    <p>Game Genres & Settings</p>
                    <label></label>
                    <h2>Description</h2>
                    <p></p>
                </div>
                <div>
                    <h2>Information</h2>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                    <button type="button"></button>
                    <button type="button"></button>
                </div>
                <div>
                    <h2>Master</h2>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}