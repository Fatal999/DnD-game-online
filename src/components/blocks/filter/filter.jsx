function Filter() {
 return(
  <div className="main__filter">
   <h1 className="main__filter-title">Filter</h1>
   <div className="main__filter-buttons">
    <button className="main__filter-button main__filter-button--refresh" type="button"></button>
    <button className="main__filter-button main__filter-button--close" type="button"></button>
   </div>
   <form>
    <div className="main__filter-options">
      <h2 className="main__filter-accessibility">Accessibility</h2>
      <ul className="main__filter-accessibility-list">
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" for="both">
            <input className="main__filter-accessibility-radio" type="radio" id="both" name="accessibility" checked></input>
            <span class="main__filter-accessibility-box"></span>
            Both
          </label> 
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" for="online">
            <input className="main__filter-accessibility-radio" type="radio" id="online" name="accessibility"></input>
            <span class="main__filter-accessibility-box"></span>
            Online
          </label>
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" for="offline">
            <input className="main__filter-accessibility-radio" type="radio" id="offline" name="accessibility"></input>
            <span class="main__filter-accessibility-box"></span>
            Offline
          </label>
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" for="offline">
            <input className="main__filter-accessibility-radio" type="radio" id="offline" name="accessibility"></input>
            <span class="main__filter-accessibility-box"></span>
            Offline
          </label>
        </li>
        <li className="main__filter-accessibility-item">
          <label className="main__filter-accessibility-label" for="beginners">
            <input className="main__filter-accessibility-checkbox" type="checkbox" id="beginners" name="accessibility"></input>
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
    <input className="main__filter-system-input" type="text" placeholder="Soma"></input>
    <div className="main__filter-system-wrapper">
     <label className="main__filter-system-call">Dungeons & Dragons (5th Edition)
      <button className="main__filter-system-close" type="button"></button>
     </label>
     <label className="main__filter-system-call">Dread
      <button className="main__filter-system-close" type="button"></button>
     </label>
     <label className="main__filter-system-call">Fobos
      <button className="main__filter-system-close" type="button"></button>
     </label>
     <label className="main__filter-system-call">Warhammer 40K
      <button className="main__filter-system-close" type="button"></button>
     </label>
    </div>
    <button className="main__filter-submit" type="submit">Accept</button>
   </form>
  </div>
 )
}

export default Filter;