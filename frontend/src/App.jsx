import { useState } from "react"

function App() {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [chatHistory, setchatHistory] = useState([])
  const surpriseOptions = [
    'Who won the latest Nvel Peace Price?',
    'Where does pizza come from?',
    'How do you make a BLT sandwitch'
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    console.log(randomValue)

    setValue(randomValue)
  }

  const getReponse = async () => {
    if (!value) {
      setError("Error! Please ask a question")
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/gemini', options)
      const data = await response.text()
      console.log(data)
      setchatHistory(oldChatHistory => [...oldChatHistory, {
        role: 'user',
        parts: value
      },
      {
        role: 'model',
        parts: data,
      }
      ])
      setValue("")
    } catch (error) {
      console.error(error)
      setError("SOmething went wrong! Please try again later")
    }
  }

  const clear = ()=>{
    setValue("")
    setError("")
    setChatHistory([])

  }

  return (

    <div className='app'>
      <p>What do you want to know
        <button className='surprise' onClick={surprise} disabled={!chatHistory} >Surprise Me</button>
      </p>
      <div className="input-container">
        <input
          type="text"
          value={value}
          name="value"
          placeholder="When is Christmas...?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getReponse}>Ask Me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => <div key={_index}>
          <p className="answer">{chatItem.role}:{chatItem.parts}</p>
        </div>)}

      </div>
    </div>

  )
}

export default App
