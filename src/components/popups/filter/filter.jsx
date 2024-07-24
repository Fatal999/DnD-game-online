 import { useState } from "react";

function Filter({onOverlayClick, onRefreshFilterClick, onCloseFilterClick}) {
  const [selectedOption, setSelectedOption] = useState('both');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

 return(
  <div className="main__filter">
   <div className="overlay__filter" onClick={onOverlayClick}></div>
   <div className="main__filter-wrapper">
   <h1 className="main__filter-title">Filter</h1>
   <div className="main__filter-buttons">
    <button className="main__filter-button main__filter-button--refresh" type="button" onClick={onRefreshFilterClick}></button>
    <button className="main__filter-button main__filter-button--close" type="button" onClick={onCloseFilterClick}></button> 
   </div>
   <form action="https://echo.htmlacademy.ru/" method="get">
    <div className="main__filter-options">
      <h2 className="main__filter-accessibility">Accessibility</h2>
      <ul className="main__filter-accessibility-list">
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" htmlFor="both">
            <input className="main__filter-accessibility-radio" type="radio" id="both" name="accessibility" value="both" checked={selectedOption === 'both'} onChange={handleOptionChange}></input>
            <span class="main__filter-accessibility-box"></span>
            Both
          </label> 
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" htmlFor="online">
            <input className="main__filter-accessibility-radio" type="radio" id="online" name="accessibility" value="online" checked={selectedOption === 'online'} onChange={handleOptionChange}></input>
            <span class="main__filter-accessibility-box"></span>
            Online
          </label>
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" htmlFor="offline">
            <input className="main__filter-accessibility-radio" type="radio" id="offline" name="accessibility" value="offline" checked={selectedOption === 'offline'} onChange={handleOptionChange}></input>
            <span class="main__filter-accessibility-box"></span>
            Offline
          </label>
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" htmlFor="beginners">
            <input className="main__filter-accessibility-checkbox" type="checkbox" id="beginners" name="accessibility" value="beginners"></input>
            <span class="main__filter-accessibility-check"></span>
            For Beginners
          </label>
        </li>
      </ul>
    </div>
    <h3 className="main__filter-location">Location</h3>
    <select className="main__filter-location-select">
     <option>United States</option> 
    </select>
    <h4 className="main__filter-language">Language</h4>
    <select className="main__filter-language-select">
      <option>English</option>
    </select>
    <h5 className="main__filter-system">Game system</h5>
    <div className="main__filter-system-wrapper">
    <input className="main__filter-system-input" type="text" placeholder="Soma"></input><br></br>
     <div className="main__filter-system-container">
      <p className="main__filter-system-call">Dungeons & Dragons (5th Edition)</p>
      <button className="main__filter-system-close" type="button"></button>
     </div>
     <div className="main__filter-system-container"> 
      <p className="main__filter-system-call">Dread</p>
      <button className="main__filter-system-close" type="button"></button>
     </div>
     <div className="main__filter-system-container">
      <p className="main__filter-system-call">Fobos</p>
      <button className="main__filter-system-close" type="button"></button>
     </div>
     <div className="main__filter-system-container">
      <p className="main__filter-system-call">Warhammer 40K</p>
      <button className="main__filter-system-close" type="button"></button>
     </div>
    </div>
    <button className="main__filter-submit" type="submit">Accept</button>
   </form>
   </div>
  </div>
 )
}

export default Filter;