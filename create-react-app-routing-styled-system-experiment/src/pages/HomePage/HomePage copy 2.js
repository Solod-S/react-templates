import React, { useState, useEffect } from 'react'
import useDrivePicker from 'react-google-drive-picker'
// import { Box, Button } from '@material-ui/core'
import styles from './ImageUploadForm.module.css'

const HomePage = () => {
  const [tokenInfo, setTokenInfo] = useState(null)
  const [openPicker, data, authResponse] = useDrivePicker()
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        '617516811579-q6dkvo24ofgnmuuooj3uoldgphp4pop4.apps.googleusercontent.com',
      developerKey: 'AIzaSyDzQmNEmQpc7mJ3BU-8jAy1GjPPfhuWLEo',
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

        // if (data.action === 'picked') {
        //   // Добавьте ваш желаемый рабочий процесс при выборе файла из Google Picker
        //   // В этом коде пытаюсь получить информацию о файле
        //   if (!token) {
        //     setTokenInfo(gapi.auth.getToken())
        //   }
        //   const fetchOptions = {
        //     headers: {
        //       Authorization: `Bearer ${token.access_token}`,
        //     },
        //   }
        //   const driveFileUrl = 'https://www.googleapis.com/drive/v3/files'
        //   data.docs.map(async item => {
        //     const response = await fetch(
        //       `${driveFileUrl}/${item.id}?alt=media`,
        //       fetchOptions
        //     )
        //     // Обработка ответа
        //   })
        // }
      },
    })
  }
  useEffect(() => {
    console.log(`data`, data)
    console.log(`authResponse`, authResponse)
  }, [data, authResponse])
  return (
    <section className="section">
      <div className="container">
        {/* <div style={{ textAlign: 'center' }}>HomePage</div> */}
        {/* <ImageUploadForm /> */}
        <GooglePicker />
        {/* <button onClick={() => handleOpenPicker()}>Open Picker</button> */}
      </div>
    </section>
  )
}

const ImageUploadForm = () => {
  const [image, setImage] = useState(null)
  const [imageType, setImageType] = useState('jpg')
  const [maxResolution, setMaxResolution] = useState('')
  const [aspectRatio, setAspectRatio] = useState('horizontal')

  const handleImageChange = e => {
    const file = e.target.files[0]
    setImage(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Проверяем, что есть файл в FormData
    if (!image) {
      console.error('Выберите изображение для загрузки.')
      return
    }

    // Собираем данные из формы
    const formData = new FormData()
    formData.append('image', image)
    formData.append('imageType', imageType)
    formData.append('maxResolution', maxResolution)
    formData.append('aspectRatio', aspectRatio)
    console.log([...formData.entries()])
    // Отправляем POST-запрос, например, с использованием fetch
    try {
      const response = await fetch('http://localhost:999/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Обработка успешного ответа
        console.log('Успешно отправлено!')
      } else {
        // Обработка ошибки
        console.error('Ошибка при отправке')
      }
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label>Choose an image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <label>Image Type:</label>
        <select value={imageType} onChange={e => setImageType(e.target.value)}>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          <option value="gif">GIF</option>
          <option value="webp">WEBP</option>
        </select>
      </div>
      <div>
        <label>Max Resolution:</label>
        <input
          type="number"
          value={maxResolution}
          onChange={e => setMaxResolution(e.target.value)}
        />
      </div>
      <div>
        <label>Aspect Ratio:</label>
        <select
          value={aspectRatio}
          onChange={e => setAspectRatio(e.target.value)}
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="square">Square</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
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
          apiKey: 'AIzaSyABQN70ZeU7WgQpAlZ7Rzp-9ArAdk2gbkY', // Замените на ваш API ключ
          scope: 'https://www.googleapis.com/auth/drive.readonly',
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
      <button onClick={handleOpenPicker}>Open Google Picker</button>
    </div>
  )
}

export default HomePage
