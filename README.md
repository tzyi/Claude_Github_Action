# 狗狗散步地圖

選擇台灣縣市，探索當地適合帶狗散步的地點。

## 啟動方式

### 後端（Flask）

```bash
cd backend
pip install -r requirements.txt
python app.py
```

後端會在 http://localhost:5000 啟動。

### 前端（React + TypeScript）

```bash
cd frontend
npm install
npm run dev
```

前端會在 http://localhost:5173 啟動。

## API

| 端點 | 說明 |
|------|------|
| `GET /api/cities` | 取得所有縣市列表 |
| `GET /api/spots/<city>` | 取得指定縣市的散步地點 |

## 支援縣市

台北市、新北市、台中市、台南市、高雄市、桃園市、新竹市、宜蘭縣
