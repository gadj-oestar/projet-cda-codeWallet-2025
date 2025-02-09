import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import db from './database.js'; // Importation de la base de données

function createWindow() {
  // Création de la fenêtre principale
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Ouvrir les liens externes dans le navigateur par défaut
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Chargement de l'application en mode développement ou production
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// Exécuter l'application lorsqu'elle est prête
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// API pour ajouter un fragment
// 📌 API pour ajouter un fragment
ipcMain.handle('addFragment', async (event, fragment) => {
  try {
    const stmt = db.prepare('INSERT INTO fragment (title, tag) VALUES (?, ?)');
    stmt.run(fragment.title, fragment.tag);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de l’ajout du fragment :', error);
    return { success: false, error };
  }
});

// 📌 API pour récupérer tous les fragments
ipcMain.handle('getFragments', async () => {
  try {
    const stmt = db.prepare('SELECT * FROM fragment');
    return stmt.all();
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des fragments :', error);
    return [];
  }
});

// Fermer l'application quand toutes les fenêtres sont fermées (sauf sur macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
