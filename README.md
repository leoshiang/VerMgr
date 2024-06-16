# VerMgr

這是一個版本號碼管理的小工具，支援作業系統 Windows/Linux/MacOS。

## 下載檔案

請在 release 區域下載最新的執行檔。

## 使用方式

以下範例以 Windows 版本 vermgr-win-x64.exe 為例，其他作業系統請自行更換檔案名稱。

### 建立版本號碼 JSON 檔案

版本號碼使用 JSON 檔案格式，請建立檔案名稱為 version.json 的檔案，內容如下；

```json
{
  "buildMajor": 1,
  "buildMinor": 5,
  "buildRevision": 41,
  "buildTag": "PROD",
  "buildTime": "20240325"
}
```

建立 version.json 之後與執行檔放在一起。

### 自動遞增版本號碼

每次執行 vermgr-win-x64 時，會自動將 buildRevision 加一，以目前的日期取代 buildTime，
並在 Console 輸出版本號碼。以上述的檔案為例：

```bash
vermgr-win-x64 version.json
```

Console 輸出的內容將會是：

> 1.5.41-PROD-20240325

假設今天是 2024/06/16，之後檔案內容會變成：

```json
{
  "buildMajor": 1,
  "buildMinor": 5,
  "buildRevision": 42,
  "buildTag": "PROD",
  "buildTime": "20240616"
}
```

### 只顯示版本號碼

如果不想遞增版號只想顯示版本號碼，可以用 -p 選項：

```bash
vermgr-win-x64 version.json -p
```

Console 輸出的內容將會是：

> 1.5.41-PROD-20240325

但是 version.json 檔案內容不會被變更。

### 使用環境變數

```shell
@for /f "delims=" %%i in ('vermgr-win-x64 version.json') do @SET "VERSION_NUMBER=%%i"
@echo %VERSION_NUMBER%
```

## 安裝建置執行檔時所需軟體
```bash
npm install -g pkg
```

## 建置執行檔
目前僅支援在 Windows 作業系統建置產生 Windows/Linux/MacOS 執行檔。
```bash
npm run build
```

輸出檔案會產生在 release 目錄裡面。