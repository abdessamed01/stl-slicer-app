# 🖨️ STL Slicer App — Geeetech A30 Pro

A custom desktop slicer application built from scratch on Pop!_OS Linux. Convert 3D models from `.stl` to print-ready `.gcode` files for the **Geeetech A30 Pro** with a single click — no manual configuration needed.

---

## 📸 Screenshots

> *(Add screenshots of the app here)*

---

## 📋 Project Description

The STL Slicer App is a native desktop application powered by **Electron.js** and **CuraEngine 5.6.0**. It wraps the full slicing pipeline behind a clean, minimal UI — pre-configured specifically for the Geeetech A30 Pro printer.

No need to open the full Cura GUI. Just select your STL file, hit **Slice to G-code**, and get a print-ready file saved next to your model.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Desktop Framework | Electron.js v40 |
| Runtime | Node.js v18 |
| Slicing Engine | CuraEngine 5.6.0 |
| Printer Profile | Official Geeetech A30 Pro JSON |
| UI | HTML, CSS, JavaScript |
| OS | Pop!_OS / Ubuntu Linux |

---

## ⚙️ Installation Guide

### Prerequisites

- Pop!_OS or Ubuntu-based Linux
- Node.js v18+
- The Cura AppImage (to extract CuraEngine)

### Step 1 — Clone the repo

```bash
git clone https://github.com/abdessamed01/stl-slicer-app.git
cd stl-slicer-app
npm install
```

### Step 2 — Get CuraEngine

```bash
cd ~
wget https://github.com/Ultimaker/Cura/releases/download/5.6.0/UltiMaker-Cura-5.6.0-linux-X64.AppImage
chmod +x UltiMaker-Cura-5.6.0-linux-X64.AppImage
./UltiMaker-Cura-5.6.0-linux-X64.AppImage --appimage-extract
```

### Step 3 — Create CuraEngine alias

```bash
echo 'alias CuraEngine="~/squashfs-root/runtime/default/lib64/ld-linux-x86-64.so.2 --library-path ~/squashfs-root ~/squashfs-root/CuraEngine"' >> ~/.bashrc
source ~/.bashrc
```

### Step 4 — Run the app

```bash
npm start
```

### Step 5 — Or install as a native .deb

```bash
npm run build
sudo dpkg -i dist/stl-slicer-app_1.0.0_amd64.deb
```

---

## 🚀 How to Use

1. Launch the app from your applications menu or with `npm start`
2. Click the **folder icon** to select your `.stl` file
3. Click **Slice to G-code**
4. Wait a few seconds while CuraEngine processes the model
5. A green success message shows the path to the generated `.gcode` file
6. Copy the `.gcode` to your SD card and insert into the A30 Pro

### Default Print Settings

| Setting | Value |
|---|---|
| Layer Height | 0.1 mm |
| First Layer Height | 0.3 mm |
| Bed Temperature | 60°C |
| Nozzle Temperature | 210°C (215°C first layer) |
| Infill Pattern | Grid |
| Print Speed | 60 mm/s |
| Build Volume | 320 × 320 × 420 mm |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Abdessamed Yousfi**
- GitHub: [@abdessamed01](https://github.com/abdessamed01)
- Email: yousfiabdessamed76@gmail.com

---

*Built with ❤️ on Pop!_OS Linux — 2026*