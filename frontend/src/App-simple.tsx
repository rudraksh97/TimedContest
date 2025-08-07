import React, { useState, useEffect } from 'react'

function App() {
  const [contests, setContests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/contests')
      .then(res => res.json())
      .then(data => {
        setContests(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>TimedContest Platform</h1>
        <p>Loading contests...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>TimedContest Platform</h1>
      <p>Welcome to the timed coding contest platform!</p>
      
      <h2>Available Contests:</h2>
      {contests.length === 0 ? (
        <p>No contests available yet.</p>
      ) : (
        <div>
          {contests.map((contest: any) => (
            <div key={contest.id} style={{ 
              border: '1px solid #ccc', 
              padding: '15px', 
              margin: '10px 0', 
              borderRadius: '5px' 
            }}>
              <h3>{contest.name}</h3>
              <p>Status: {contest.has_attempts ? 'Attempted' : 'Not attempted'}</p>
              <button style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Start Contest
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '5px' }}>
        <h3>🚀 Features:</h3>
        <ul>
          <li>✅ 1-hour timed contests</li>
          <li>✅ Multiple programming languages (Python, Java, C++, JavaScript)</li>
          <li>✅ Code editor with syntax highlighting</li>
          <li>✅ Attempt history and review</li>
          <li>✅ Timer with notifications</li>
        </ul>
      </div>
    </div>
  )
}

export default App

