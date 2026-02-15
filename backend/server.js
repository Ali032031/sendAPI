import express from "express"
import axios from "axios"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/send", async (req, res) => {
  try {
    const response = await axios.post(
      "https://partenaire-conseil.com/api/partenaires/11002/mutuelle-sante",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    )

    res.json({ success: true, data: response.data })
  } catch (error) {
    console.error(error.response?.data || error.message)

    res.status(500).json({
      success: false,
      error: error.response?.data || "Server error"
    })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
