import './App.css';
import { useEffect, useState } from 'react';

const articles=[
  "React Basics",
  "Understanding React Hooks",
  "Advanced React Patterns",
  "State Management in React",
  "Building Forms in React",
  "React Router Guide",
  "Performance Optimization in React",
  "Testing React Applications",
  "Deploying React Apps",
  "React and TypeScript"
];

const HighlightedText = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const partsHighlighted = text.split(new RegExp(`(${highlight})`, 'gi'));
  console.log(partsHighlighted);
  return(
    <div >
      {partsHighlighted.map((part, i)=>{
        return part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      })}
    </div>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlitedcount, sethighlitedCount] = useState(0);
  const filteredArticles = articles.filter(article =>
    article.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  useEffect(() => {
    const wordsCount = () =>{
      if(!searchTerm.trim()) return 0;
      const regex= new RegExp(searchTerm, 'gi');
      const matchedWords = String(articles).match(regex);
      sethighlitedCount(matchedWords ? matchedWords.length : 0);
    }
    wordsCount();
  }, [searchTerm]);
  //even though for this project the ideal way was wordsCount fct to be outside the useEffect
  //due to the fact that the only rerender come from search
  //but in case of any added features that can cause rerender
  //it will be more performance friendly to have it inside the useEffect
  return (
    <div className="container">
    <div className="App">
      <div style={{display:"flex", flexDirection:"column", alignContent:"flex-start"}}>
        <h2 style={{alignSelf:"flex-start"}}>Search</h2>
        <div style={{display:"flex", justifyContent:"flex-start", position:"relative"}}>
        <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{width:"50%", padding:"0.5rem", fontSize:"1rem", border:"1px solid grey", borderRadius:"4px", marginBottom:"1rem"}}
      />
      {searchTerm && 
      <button 
      onClick={()=> setSearchTerm('')}
      style={{position:"absolute", right:"50%", top:"12%", border:"none", background:"transparent", cursor:"pointer", fontSize:"1.2rem", color:"grey"}}>
        &times;
      </button>}
      </div>
      {searchTerm && highlitedcount>0 &&  
      <p style={{display:"flex", justifyContent:"flex-start"}}>
      <strong>{highlitedcount}  {highlitedcount===1? "post ": "posts "} </strong>&nbsp;  { highlitedcount===1? " was": " were"} found</p>}
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article, index) => (
          <p key={index} style={{display:"flex", justifyContent:"flex-start"}}><HighlightedText text={article} highlight={searchTerm} /> </p>
        ))) : (
        <p style={{display:"flex", justifyContent:"flex-start"}}>No articles found.</p>
      )
        }

      </div>
    </div>
    </div>
  );
}

export default App;
