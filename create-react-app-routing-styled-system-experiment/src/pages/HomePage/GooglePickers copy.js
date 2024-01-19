import React, { useState, useEffect } from 'react'
import useDrivePicker from 'react-google-drive-picker'
const {
  REACT_APP_GOOGLE_PICKER_CLIENT_ID,
  REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
  REACT_APP_GOOGLE_PICKER_API_KEY,
} = process.env

const scope =
  'https://www.googleapis.com/auth/drive.file ' +
  'https://www.googleapis.com/auth/drive.metadata ' +
  'https://www.googleapis.com/auth/drive.readonly'

const apiKey = process.env.REACT_APP_GOOGLE_PICKER_API_KEY
console.log(apiKey)
const GooglePickers = () => {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* <GooglePicker /> */}
          <GoogleSheetPicker />
        </div>
      </div>
    </section>
  )
}

const GoogleSheetPicker = () => {
  const [openPicker, data, authResponse] = useDrivePicker()
  const [GoogleAuth, setGoogleAuth] = useState(null)
  const handleOpenPicker = () => {
    openPicker({
      clientId: REACT_APP_GOOGLE_PICKER_CLIENT_ID,
      developerKey: REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
      viewId: 'SPREADSHEETS',
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: data => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }
  useEffect(() => {
    console.log(`data`, data)
    console.log(`authResponse`, authResponse)
  }, [data, authResponse])
  return (
    <button
      style={{ padding: '20px', border: 'solid black' }}
      onClick={() => handleOpenPicker()}
    >
      Open GoogleSheetPicker
    </button>
  )
}

const GooglePicker = () => {
  const [tokenInfo, setTokenInfo] = useState(null)
  const [openPicker] = useDrivePicker()
  const handleOpenPicker = () => {
    /* global gapi */
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: REACT_APP_GOOGLE_PICKER_API_KEY,
          scope:
            'https://www.googleapis.com/auth/drive.file ' +
            'https://www.googleapis.com/auth/drive.metadata ' +
            'https://www.googleapis.com/auth/drive.readonly',
        })
        .then(() => {
          console.log(`1`, gapi)
          const token = gapi.auth.getToken()
          console.log(`2`)
          console.log(`token`, token)
          setTokenInfo(token)

          const pickerConfig = {
            clientId:
              '617516811579-q6dkvo24ofgnmuuooj3uoldgphp4pop4.apps.googleusercontent.com',
            developerKey: 'AIzaSyDzQmNEmQpc7mJ3BU-8jAy1GjPPfhuWLEo',
            // viewId: 'SPREADSHEETS',
            viewId: 'DOCS',
            viewMimeTypes: 'image/jpeg,image/png,image/gif',
            token: token ? token.access_token : null,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: data => {
              console.log(`data`, data)
              const elements = Array.from(
                document.getElementsByClassName('picker-dialog')
              )
              for (let i = 0; i < elements.length; i++) {
                elements[i].style.zIndex = '2000'
              }
              if (data.action === 'picked') {
                // Добавьте ваш желаемый рабочий процесс при выборе файла из Google Picker
                // В этом коде пытаюсь получить информацию о файле
                if (!token) {
                  console.log(`token`, gapi.auth.getToken())
                  setTokenInfo(gapi.auth.getToken())
                }
                const fetchOptions = {
                  headers: {
                    Authorization: `Bearer ${
                      gapi.auth.getToken().access_token
                    }`,
                  },
                }
                console.log(`fetchOptions`, fetchOptions)
                const driveFileUrl = 'https://www.googleapis.com/drive/v3/files'
                data.docs.map(async item => {
                  const response = await fetch(
                    `${driveFileUrl}/${item.id}?alt=media`,
                    fetchOptions
                  )
                  console.log(response)
                  // Обработка ответа
                })
              }
            },
          }

          openPicker(pickerConfig)
        })
    })
  }

  return (
    <div>
      <button
        style={{ padding: '20px', border: 'solid black' }}
        onClick={handleOpenPicker}
      >
        Open GoogleALLPicker
      </button>
    </div>
  )
}

export default GooglePickers
