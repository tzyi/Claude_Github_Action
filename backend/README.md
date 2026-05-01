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
pip install -r requirements.txt
python app.py

```


## 前端：

```
cd frontend
npm run dev
```

開啟 http://localhost:5173 即可使用。選擇縣市後會呼叫 Flask API 並顯示該縣市的散步地點卡片，每張卡片包含圖片、星等評分、地址、描述與標籤。