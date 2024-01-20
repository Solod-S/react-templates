import React, { useState, useEffect } from 'react'
import { RevolvingDot } from 'react-loader-spinner'
import Table from './Table'
import useDrivePicker from 'react-google-drive-picker'
const {
  REACT_APP_GOOGLE_PICKER_CLIENT_ID,
  REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
  REACT_APP_GOOGLE_PICKER_API_KEY,
} = process.env

const googleSheetTransformer = data => {
  const keys = data[0]
  const result = []

  for (let i = 1; i < data.length; i++) {
    const obj = {}
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = data[i][j]
    }
    result.push(obj)
  }

  return result
}

const GooglePickerSheetViewer = () => {
  const [googleSheetData, setGoogleSheetData] = useState([])
  const [loading, setLoading] = useState(false)
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
          <GooglePicker
            setGoogleSheetData={setGoogleSheetData}
            setLoading={setLoading}
          />
        </div>
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
            }}
          >
            <RevolvingDot />
          </div>
        )}

        {googleSheetData.length > 0 && !loading && (
          <Table data={googleSheetData} />
        )}
      </div>
    </section>
  )
}

const GooglePicker = ({ setGoogleSheetData, setLoading }) => {
  const [tokenInfo, setTokenInfo] = useState(null)
  const [openPicker] = useDrivePicker()

  const loadGapiAndInitialize = async () => {
    return new Promise(resolve => {
      /* global gapi */
      gapi.load('client:auth2', async () => {
        gapi.client
          .init({
            apiKey: REACT_APP_GOOGLE_PICKER_API_KEY,
            scope:
              'https://www.googleapis.com/auth/drive ' +
              'https://www.googleapis.com/auth/drive.appdata ' +
              'https://www.googleapis.com/auth/drive.metadata.readonly ' +
              'https://www.googleapis.com/auth/drive.photos.readonly ' +
              'https://www.googleapis.com/auth/drive.file ' +
              'https://www.googleapis.com/auth/drive.metadata ' +
              'https://www.googleapis.com/auth/drive.readonly',
          })
          .then(() => {
            resolve()
          })
      })
    })
  }

  const handleOpenPicker = async () => {
    setLoading(true)
    await loadGapiAndInitialize()

    const token = gapi.auth.getToken()
    setTokenInfo(token)

    const pickerConfig = {
      clientId: REACT_APP_GOOGLE_PICKER_CLIENT_ID,
      developerKey: REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
      viewId: 'SPREADSHEETS',
      // token: token ? token.access_token : null,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: data => {
        const elements = Array.from(
          document.getElementsByClassName('picker-dialog')
        )
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.zIndex = '2000'
        }
        if (data.action === 'picked') {
          if (!token) {
            setTokenInfo(gapi.auth.getToken())
          }

          data.docs.map(async item => {
            try {
              const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${item.id}/values/A1:Z`,
                {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${
                      gapi.auth.getToken().access_token
                    }`,
                  },
                }
              )

              if (response.ok) {
                const sheetData = await response.json()
                const result = googleSheetTransformer(sheetData.values)
                setGoogleSheetData(result)
                console.log('Данные таблицы:', result)
              } else {
                console.error(
                  'Не удалось получить данные таблицы:',
                  response.status,
                  response.statusText
                )
              }
            } catch (error) {
              console.log(error)
            } finally {
              // Выключить загрузку в любом случае (даже при ошибке)
              setLoading(false)
            }
          })
        }
      },
    }

    openPicker(pickerConfig)
  }

  return (
    <div>
      <button
        style={{ padding: '12px', border: 'solid black 1px' }}
        onClick={handleOpenPicker}
      >
        Открыть GoogleALLPicker
      </button>
    </div>
  )
}

// const GooglePickerV2 = () => {
//   const [tokenInfo, setTokenInfo] = useState(null)
//   const [openPicker] = useDrivePicker()
//   const handleOpenPicker = () => {
//     /* global gapi */
//     gapi.load('client:auth2', () => {
//       console.log(gapi)
//       gapi.client
//         .init({
//           apiKey: REACT_APP_GOOGLE_PICKER_API_KEY,
//           scope:
//             'https://www.googleapis.com/auth/drive ' +
//             'https://www.googleapis.com/auth/drive.appdata ' +
//             'https://www.googleapis.com/auth/drive.metadata.readonly ' +
//             'https://www.googleapis.com/auth/drive.photos.readonly ' +
//             'https://www.googleapis.com/auth/drive.file ' +
//             'https://www.googleapis.com/auth/drive.metadata ' +
//             'https://www.googleapis.com/auth/drive.readonly',
//         })
//         .then(() => {
//           console.log(`1`, gapi)
//           const token = gapi.auth.getToken()
//           console.log(`2`)
//           console.log(`token`, token)
//           setTokenInfo(token)

//           const pickerConfig = {
//             clientId: REACT_APP_GOOGLE_PICKER_CLIENT_ID,
//             developerKey: REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
//             // viewId: 'SPREADSHEETS',
//             viewId: 'DOCS',
//             viewMimeTypes: 'image/jpeg,image/png,image/gif',
//             token: token ? token.access_token : null,
//             showUploadView: true,
//             showUploadFolders: true,
//             supportDrives: true,
//             multiselect: true,
//             callbackFunction: data => {
//               console.log(`data`, data)
//               const elements = Array.from(
//                 document.getElementsByClassName('picker-dialog')
//               )
//               for (let i = 0; i < elements.length; i++) {
//                 elements[i].style.zIndex = '2000'
//               }
//               if (data.action === 'picked') {
//                 // Добавьте ваш желаемый рабочий процесс при выборе файла из Google Picker
//                 // В этом коде пытаюсь получить информацию о файле
//                 if (!token) {
//                   console.log(`token`, gapi.auth.getToken())
//                   setTokenInfo(gapi.auth.getToken())
//                 }
//                 const fetchOptions = {
//                   headers: {
//                     Authorization: `Bearer ${
//                       gapi.auth.getToken().access_token
//                     }`,
//                   },
//                 }
//                 console.log(`fetchOptions`, fetchOptions)
//                 // https://www.googleapis.com/drive/v2/files/MY_FILE_ID?alt=media&source=downloadUrl
//                 // const driveFileUrl = 'https://www.googleapis.com/drive/v3/files'
//                 const driveFileUrl = 'https://www.googleapis.com/drive/v2/files'
//                 data.docs.map(async item => {
//                   console.log(`item`, item)
//                   try {
//                     const response = await fetch(
//                       `${driveFileUrl}/${item.id}?alt=media&source=downloadUrl`,
//                       fetchOptions
//                     )
//                     console.log(response)
//                   } catch (error) {
//                     console.log(error)
//                   }
//                   // Обработка ответа
//                 })
//               }
//             },
//           }

//           openPicker(pickerConfig)
//         })
//     })
//     // gapi.load('client:auth2', () => {
//     //   gapi.client
//     //     .init({
//     //       apiKey: REACT_APP_GOOGLE_PICKER_API_KEY,
//     //       scope:
//     //         'https://www.googleapis.com/auth/drive.file ' +
//     //         'https://www.googleapis.com/auth/drive.metadata ' +
//     //         'https://www.googleapis.com/auth/drive.readonly',
//     //     })
//     //     .then(() => {
//     //       console.log(`1`, gapi)
//     //       const token = gapi.auth.getToken()
//     //       console.log(`2`)
//     //       console.log(`token`, token)
//     //       setTokenInfo(token)

//     //       const pickerConfig = {
//     //         clientId: REACT_APP_GOOGLE_PICKER_CLIENT_ID,
//     //         developerKey: REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
//     //         // viewId: 'SPREADSHEETS',
//     //         viewId: 'DOCS',
//     //         viewMimeTypes: 'image/jpeg,image/png,image/gif',
//     //         token: token ? token.access_token : null,
//     //         showUploadView: true,
//     //         showUploadFolders: true,
//     //         supportDrives: true,
//     //         multiselect: true,
//     //         callbackFunction: data => {
//     //           console.log(`data`, data)
//     //           const elements = Array.from(
//     //             document.getElementsByClassName('picker-dialog')
//     //           )
//     //           for (let i = 0; i < elements.length; i++) {
//     //             elements[i].style.zIndex = '2000'
//     //           }
//     //           if (data.action === 'picked') {
//     //             // Добавьте ваш желаемый рабочий процесс при выборе файла из Google Picker
//     //             // В этом коде пытаюсь получить информацию о файле
//     //             if (!token) {
//     //               console.log(`token`, gapi.auth.getToken())
//     //               setTokenInfo(gapi.auth.getToken())
//     //             }
//     //             const fetchOptions = {
//     //               headers: {
//     //                 Authorization: `Bearer ${
//     //                   gapi.auth.getToken().access_token
//     //                 }`,
//     //               },
//     //             }
//     //             console.log(`fetchOptions`, fetchOptions)
//     //             // https://www.googleapis.com/drive/v2/files/MY_FILE_ID?alt=media&source=downloadUrl
//     //             // const driveFileUrl = 'https://www.googleapis.com/drive/v3/files'
//     //             const driveFileUrl =
//     //               'https://www.googleapis.com/drive/v3/files'
//     //             data.docs.map(async item => {
//     //               const response = await fetch(
//     //                 `${driveFileUrl}/${item.id}?alt=media&source=downloadUrl`,
//     //                 fetchOptions
//     //               )
//     //               console.log(response)
//     //               // Обработка ответа
//     //             })
//     //           }
//     //         },
//     //       }

//     //       openPicker(pickerConfig)
//     //     })
//     // })
//   }

//   return (
//     <div>
//       <button
//         style={{ padding: '20px', border: 'solid black' }}
//         onClick={handleOpenPicker}
//       >
//         Open GoogleALLPicker
//       </button>
//     </div>
//   )
// }

export default GooglePickerSheetViewer
