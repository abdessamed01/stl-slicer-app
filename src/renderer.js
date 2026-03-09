const { ipcRenderer } = require('electron')

let selectedFile = null

const dropZone = document.getElementById('drop-zone')
const fileName = document.getElementById('file-name')
const sliceBtn = document.getElementById('slice-btn')
const status = document.getElementById('status')

dropZone.addEventListener('click', async () => {
  const filePath = await ipcRenderer.invoke('select-stl')
  if (filePath) {
    selectedFile = filePath
    fileName.textContent = filePath.split('/').pop()
    sliceBtn.disabled = false
    status.textContent = ''
  }
})

sliceBtn.addEventListener('click', async () => {
  if (!selectedFile) return

  sliceBtn.disabled = true
  status.className = 'loading'
  status.textContent = '⏳ Slicing... please wait'

  try {
    const outputPath = await ipcRenderer.invoke('slice', selectedFile)
    status.className = 'success'
    status.textContent = `✅ Done! Saved to: ${outputPath}`
  } catch (err) {
    status.className = 'error'
    status.textContent = `❌ Error: ${err}`
  } finally {
    sliceBtn.disabled = false
  }
})