import React, { useState, useEffect } from 'react'
import Table from './Table'

const GoogleUrlSheetViewer = () => {
  const [googleSheetData, setGoogleSheetData] = useState([])
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          <SheetsUrlPicker setGoogleSheetData={setGoogleSheetData} />
        </div>
        {googleSheetData.length > 0 && <Table data={googleSheetData} />}
      </div>
    </section>
  )
}

const SheetsUrlPicker = ({ setGoogleSheetData }) => {
  const [sheetUrl, setSheetUrl] = useState('')

  function extractSheetIdFromUrl(url) {
    const match = url.match(/\/spreadsheets\/d\/([^/]+)/)

    return match ? match[1] : null
  }
  const handleButtonClick = async () => {
    try {
      const id = extractSheetIdFromUrl(sheetUrl)
      if (!id) {
        return
      }
      const response = await fetch(
        `http://localhost:1234/google-sheets/get/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const result = await response.json()
        setGoogleSheetData(result.data)
      } else {
        console.error(
          'Failed to fetch sheet data:',
          response.status,
          response.statusText
        )
      }
    } catch (error) {
      console.error('Error during sheet data fetch:', error)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label>
            Введите URL таблицы:
            <input
              type="text"
              value={sheetUrl}
              onChange={e => setSheetUrl(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <button
            style={{ marginTop: '10px', padding: '8px' }}
            onClick={handleButtonClick}
          >
            Загрузить данные
          </button>
        </div>
      </div>
    </section>
  )
}

export default GoogleUrlSheetViewer
