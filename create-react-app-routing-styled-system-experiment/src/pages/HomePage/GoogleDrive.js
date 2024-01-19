import React, { useEffect, useState } from 'react'

const GooglePickerComponent = () => {
  const [GoogleAuth, setGoogleAuth] = useState(null)
  const [access_token, setAccessToken] = useState(null)

  useEffect(() => {
    const {
      REACT_APP_GOOGLE_PICKER_CLIENT_ID,
      REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY,
    } = process.env
    const clientId = REACT_APP_GOOGLE_PICKER_CLIENT_ID
    const developerKey = REACT_APP_GOOGLE_PICKER_DEVELOPER_KEY
    const scope =
      'https://www.googleapis.com/auth/drive.file ' +
      'https://www.googleapis.com/auth/drive.metadata ' +
      'https://www.googleapis.com/auth/drive.readonly'

    let auth2

    const onApiLoad = () => {
      try {
        /* global gapi */
        gapi.load('auth2', function () {
          auth2 = gapi.auth2
          auth2
            .init({
              client_id: clientId,
              prompt: 'select_account',
              scope: scope,
            })
            .then(function () {
              setGoogleAuth(auth2.getAuthInstance())
              if (auth2.getAuthInstance().isSignedIn.get()) {
                // Добавьте логику, если пользователь уже вошел в систему
              }
              onAuthApiLoad()
            })
        })
      } catch (error) {
        console.error('Произошла ошибка при загрузке auth2:', error)
      }
    }

    const onAuthApiLoad = () => {
      try {
        const authBtn = document.getElementById('googleDrive')
        const signOutBtn = document.getElementById('googleDriveOff')

        authBtn.addEventListener('click', function () {
          if (!GoogleAuth.isSignedIn.get()) {
            GoogleAuth.grantOfflineAccess({
              prompt: 'select_account',
              scope: scope,
            }).then(function (resp) {
              reloadUserAuth()
            })
          } else {
            reloadUserAuth()
          }
        })

        signOutBtn.addEventListener('click', function () {
          GoogleAuth.signOut()
          signOutBtn.classList.add('invisible')
        })
      } catch (error) {
        console.error('Произошла ошибка в onAuthApiLoad:', error)
      }
    }

    const reloadUserAuth = () => {
      try {
        const googleUser = GoogleAuth.currentUser.get()
        googleUser.reloadAuthResponse().then(function (authResponse) {
          setAccessToken(authResponse.access_token)
          const signOutBtn = document.getElementById('googleDriveOff')
          signOutBtn.classList.remove('invisible')
          createPicker(authResponse)
        })
      } catch (error) {
        console.error('Произошла ошибка в reloadUserAuth:', error)
      }
    }

    const createPicker = authResult => {
      try {
        if (authResult && !authResult.error) {
          gapi.load('picker', function () {
            const picker = new window.google.picker.PickerBuilder()
              .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
              .addView(window.google.picker.ViewId.DOCS_IMAGES)
              .setOAuthToken(access_token)
              .setDeveloperKey(developerKey)
              .setCallback(pickerCallback)
              .build()
            picker.setVisible(true)
          })
        }
      } catch (error) {
        console.error('Произошла ошибка в createPicker:', error)
      }
    }

    const pickerCallback = async _data => {
      try {
        if (_data[window.google.picker.Response.DOCUMENTS]) {
          const xhrArray = _data[window.google.picker.Response.DOCUMENTS].map(
            async doc => {
              try {
                const result = JSON.stringify(
                  await postData(`/`, { token: access_token, doc: doc })
                )
                const resultFinal = JSON.parse(result)
                console.log(`Ответ от сервера: ${result}`)

                let imgCard = document.createElement('div')
                imgCard.className = 'item'
                imgCard.innerHTML = `<img src="${resultFinal.path}"/>
                                      <span>${resultFinal.name}</span>`
                document.getElementById('uploaded').appendChild(imgCard)
              } catch (err) {
                console.log(`Ошибка от fetch: ${err.message}`)
              }
            }
          )
          await Promise.all(xhrArray)
        }
      } catch (error) {
        console.error('Произошла ошибка в pickerCallback:', error)
      }
    }

    const postData = (url = ``, data = {}) => {
      try {
        return fetch(url, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }).then(function (response) {
          if (response.ok) {
            return response.json()
          }
          return response.text()
        })
      } catch (error) {
        console.error('Произошла ошибка в postData:', error)
      }
    }

    onApiLoad()

    return () => {
      // Отписка или очистка при размонтировании компонента
    }
  }, [])

  return (
    <div>
      <button id="googleDrive">Аутентификация</button>
      <button id="googleDriveOff" className="invisible">
        Выйти
      </button>
      <div id="uploaded"></div>
    </div>
  )
}

export default GooglePickerComponent
