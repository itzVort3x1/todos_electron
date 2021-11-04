const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({webPreferences: { nodeIntegration: true , contextIsolation: false}});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('close', () => app.quit());
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add New Todo',
        webPreferences: { nodeIntegration: true, contextIsolation: false },
        autoHideMenuBar: true
    });

    addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

// process.env.NODE_ENV can be
// 'development' or 'production'

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}