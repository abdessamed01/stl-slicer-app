const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { exec } = require('child_process')
const os = require('os')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('select-stl', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'STL Files', extensions: ['stl'] }],
    properties: ['openFile']
  })
  return result.filePaths[0]
})

ipcMain.handle('slice', async (event, stlPath) => {
  const outputPath = stlPath.replace(/\.stl$/i, '.gcode')
  const profilePath = path.join(process.resourcesPath, 'geeetech_A30Pro.def.json')
  const homeDir = os.homedir()
  const curaEngine = `${homeDir}/squashfs-root/runtime/default/lib64/ld-linux-x86-64.so.2`
  const curaEngineLib = `${homeDir}/squashfs-root`
  const curaEngineBin = `${homeDir}/squashfs-root/CuraEngine`

  const cmd = `CURA_ENGINE_SEARCH_PATH="${process.resourcesPath}" LD_LIBRARY_PATH=${curaEngineLib} ${curaEngine} --library-path ${curaEngineLib} ${curaEngineBin} slice -j "${profilePath}" -s roofing_layer_count=0 -s cool_min_temperature=0 -l "${stlPath}" -o "${outputPath}"`

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(stderr)
      else resolve(outputPath)
    })
  })
})