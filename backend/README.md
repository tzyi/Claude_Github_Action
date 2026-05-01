# Claude_Github_Action


# 專案結構
```
Claude_Github_Action/
├── backend/
│   ├── app.py          # Flask API（3 個端點）
│   ├── data.py         # 假資料（8 縣市、22 個地點）
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.tsx         # 主頁面（縣市選擇 + 地點列表）
│       ├── App.css         # 橘色系主題樣式
│       ├── api.ts          # axios API 呼叫
│       ├── types.ts        # TypeScript 型別定義
│       └── components/
│           └── SpotCard.tsx  # 地點卡片元件
└── README.md

```


# 啟動方式

## 後端（兩個終端機分別執行）：

```
cd backend

uv venv
. venv/bin/activate
uv pip sync requirements.txt

python app.py

```


## 前端：

```
cd frontend
npm run dev
```

開啟 http://localhost:5173 即可使用。選擇縣市後會呼叫 Flask API 並顯示該縣市的散步地點卡片，每張卡片包含圖片、星等評分、地址、描述與標籤。


# 測試

## 後端測試（pytest）：

```
cd backend
# 安裝依賴
uv pip install -r requirements.txt

# 執行所有測試
pytest

# 執行特定測試檔案
pytest test_app.py

# 執行特定測試類別
pytest test_app.py::TestGetCities

# 顯示詳細輸出
pytest -v

# 顯示覆蓋率
pytest --cov=app test_app.py
```

## 前端測試（Vitest）：

```
cd frontend
# 安裝依賴
npm install

# 執行所有測試
npm test

# 監視模式（自動重新執行）
npm test -- --watch

# 顯示 UI 測試界面
npm run test:ui

# 生成覆蓋率報告
npm run test:coverage
```