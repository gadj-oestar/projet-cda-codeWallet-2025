import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import db from './database.js'; // Importation de la base de données

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),

      contextIsolation: true, // Meilleure sécurité
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    console.log('🚀 Application Electron démarrée avec succès !');

  });
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('🚀 La fenêtre renderer est prête et le preload est chargé.');
  });
  

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));

  }
}

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

// 📌 API pour ajouter un fragment
ipcMain.handle('addFragment', async (event, fragment) => {
  try {
    if (!db) throw new Error("La connexion à la base de données a échoué.");

    const stmt = db.prepare('INSERT INTO fragment (title, tag) VALUES (?, ?)');
    stmt.run(fragment.title, fragment.tag);

    console.log('✅ Fragment ajouté :', fragment);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de l’ajout du fragment :', error);
    return { success: false, error: error.message };
  }
});

// 📌 API pour récupérer tous les fragments
ipcMain.handle('getFragments', async () => {
  try {
    if (!db) throw new Error("La connexion à la base de données a échoué.");

    const stmt = db.prepare('SELECT * FROM fragment');
    const fragments = stmt.all();

    console.log('📄 Fragments récupérés :', fragments.length);
    return fragments;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des fragments :', error);
    return [];
  }
});

// 📌 API pour modifier un fragment
ipcMain.handle('updateFragment', async (event, fragment) => {
  try {
    if (!db) throw new Error("La connexion à la base de données a échoué.");

    const stmt = db.prepare('UPDATE fragment SET title = ?, tag = ? WHERE id = ?');
    stmt.run(fragment.title, fragment.tag, fragment.id);

    console.log('🔄 Fragment modifié :', fragment);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de la modification du fragment :', error);
    return { success: false, error: error.message };
  }
});

// 📌 API pour supprimer un fragment
ipcMain.handle('deleteFragment', async (event, id) => {
  try {
    if (!db) throw new Error("La connexion à la base de données a échoué.");

    const stmt = db.prepare('DELETE FROM fragment WHERE id = ?');
    stmt.run(id);

    console.log('🗑️ Fragment supprimé avec ID :', id);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de la suppression du fragment :', error);
    return { success: false, error: error.message };
  }
});

// 📌 Fermer l'application quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
