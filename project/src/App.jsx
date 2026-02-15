import { useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // ✅ CHANGE THIS TO YOUR BACKEND URL
  const BACKEND_URL = "https://backendsendingapi.onrender.com/send"

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const ext = file.name.split('.').pop().toLowerCase()
    if (ext !== 'xlsx' && ext !== 'xls') {
      alert('Please select a valid Excel file')
      event.target.value = ''
      return
    }

    setSelectedFile(file)
  }

  // ✅ Read Excel → JSON
  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        let json = XLSX.utils.sheet_to_json(sheet, { defval: '' })

        // Normalize headers
        json = json.map(row => {
          const clean = {}
          Object.keys(row).forEach(key => {
            clean[key.trim().toLowerCase()] = row[key]
          })
          return clean
        })

        resolve(json)
      }

      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an Excel file first!')
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const rows = await readExcel(selectedFile)

      const validRows = rows.filter(row => row.email && row.email.trim() !== '')

      if (validRows.length === 0) {
        alert("No valid rows with email found.")
        setUploading(false)
        return
      }

      for (let i = 0; i < validRows.length; i++) {
        const row = validRows[i]

        const payload = {
          nom: row.nom || '',
          prenom: row.prenom || '',
          email: (row.email || '').trim(),
          tel_mobile: row.tel_mobile || '',
          votre_sexe: row.votre_sexe || '',
          cp: row.cp || '',
          ville: row.ville || '',
          personne_assur: row.personne_assur || '',
          nbre_enfant: row.nbre_enfant || '',
          regime_social: row.regime_social || '',
          profession: row.profession || '',
          dob: row.dob || '',
          type_contrat: row.type_contrat || '',
          date_contrat: row.date_contrat || '',
          date_anni_contrat: row.date_anni_contrat || '',
          civilite: row.civilite || '',
          privacy: row.privacy || 'Y'
        }

        await axios.post(
          BACKEND_URL,
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        )

        // Update progress
        const percent = Math.round(((i + 1) / validRows.length) * 100)
        setProgress(percent)
      }

      alert('All rows sent successfully!')
      setSelectedFile(null)
      document.getElementById('fileInput').value = ''

    } catch (error) {
      console.error(error.response?.data || error)
      alert('Error sending data. Check console.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="upload-card">
        <h1>Excel File Upload</h1>

        <div className="upload-section">
          <label htmlFor="fileInput" className="file-label">
            📁 {selectedFile ? selectedFile.name : 'Choose Excel file'}
          </label>

          <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="file-input"
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="send-button"
          >
            {uploading ? 'Processing...' : 'Send'}
          </button>

          {uploading && (
            <div style={{ marginTop: "15px" }}>
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "10px",
                    background: "#4CAF50",
                    transition: "0.3s"
                  }}
                />
              </div>
              <p>{progress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
