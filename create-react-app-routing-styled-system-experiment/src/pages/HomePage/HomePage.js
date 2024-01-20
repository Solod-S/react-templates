import React, { useState, useEffect } from 'react'
import styles from './ImageUploadForm.module.css'
import GooglePickerSheetViewer from './GooglePickerSheetViewer'
import GoogleUrlSheetViewer from './GoogleUrlSheetViewer'

const HomePage = () => {
  return (
    <section className="section">
      <div className="container">
        <GooglePickerSheetViewer />
        {/* <GoogleUrlSheetViewer /> */}
      </div>
    </section>
  )
}

// const ImageUploadForm = () => {
//   const [image, setImage] = useState(null)
//   const [imageType, setImageType] = useState('jpg')
//   const [maxResolution, setMaxResolution] = useState('')
//   const [aspectRatio, setAspectRatio] = useState('horizontal')

//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     setImage(file)
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()

//     // Проверяем, что есть файл в FormData
//     if (!image) {
//       console.error('Выберите изображение для загрузки.')
//       return
//     }

//     // Собираем данные из формы
//     const formData = new FormData()
//     formData.append('image', image)
//     formData.append('imageType', imageType)
//     formData.append('maxResolution', maxResolution)
//     formData.append('aspectRatio', aspectRatio)
//     console.log([...formData.entries()])
//     // Отправляем POST-запрос, например, с использованием fetch
//     try {
//       const response = await fetch('http://localhost:999/upload', {
//         method: 'POST',
//         body: formData,
//       })

//       if (response.ok) {
//         // Обработка успешного ответа
//         console.log('Успешно отправлено!')
//       } else {
//         // Обработка ошибки
//         console.error('Ошибка при отправке')
//       }
//     } catch (error) {
//       console.error('Произошла ошибка:', error)
//     }
//   }

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <div>
//         <label>Choose an image:</label>
//         <input type="file" onChange={handleImageChange} />
//       </div>
//       <div>
//         <label>Image Type:</label>
//         <select value={imageType} onChange={e => setImageType(e.target.value)}>
//           <option value="jpg">JPG</option>
//           <option value="png">PNG</option>
//           <option value="gif">GIF</option>
//           <option value="webp">WEBP</option>
//         </select>
//       </div>
//       <div>
//         <label>Max Resolution:</label>
//         <input
//           type="number"
//           value={maxResolution}
//           onChange={e => setMaxResolution(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Aspect Ratio:</label>
//         <select
//           value={aspectRatio}
//           onChange={e => setAspectRatio(e.target.value)}
//         >
//           <option value="horizontal">Horizontal</option>
//           <option value="vertical">Vertical</option>
//           <option value="square">Square</option>
//         </select>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

export default HomePage
