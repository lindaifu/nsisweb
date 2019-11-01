const { app, BrowserWindow, ipcMain, Menu } = require('electron')

let mainWindow;
function createWindow (){
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		frame: true,
//		fullscreen: true,
		alwaysOnTop: false
	})
	let webCont = mainWindow.webContents;
	// 打开入口
//	mainWindow.loadFile("web/index.html")
	mainWindow.loadFile("web/nisiweb.html")
  	mainWindow.on('closed', function(){
    	mainWindow = null
 	})
	// 设置菜单
	const template = [
		{
			label: '工具栏',
			submenu: [
				{ role: 'reload', label: '刷新' },
				{ role: 'forcereload', label: '强制刷新' },
				{ role: 'togglefullscreen', label: '切换全屏' },
				{ role: 'toggledevtools', label: '调试工具' },
				{ role: 'close', label: '关闭' }
			]
		}
	];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
 	
}

// 进程ready状态，创建窗体
app.on('ready', createWindow)
// 设置自动播放不需用户触发
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})
