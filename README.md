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



# 測試

## ✅ Backend 测试 (pytest)
文件: backend/test_app.py
- 5个测试类，超过20个测试用例                                                                                                                                                                                                        
- 覆盖所有3个API端点：

- GET /api/cities - 获取城市列表
- GET /api/spots/<city> - 获取特定城市的散步地点
- GET /api/spots - 获取所有散步地点
- 包含错误处理和CORS测试

运行测试:
```
cd backend
pip install -r requirements.txt  # 已添加 pytest
pytest -v
```

## ✅ Frontend 测试 (Vitest)

3个测试文件:
1. api.test.ts - API函数单元测试（fetchCities, fetchSpotsByCity）
2. SpotCard.test.tsx - 组件渲染测试（名称、地址、星级、标签等）
3. App.test.tsx - 完整的集成测试（页面流程、加载状态、错误处理）

配置文件:
- vitest.config.ts - Vitest配置
- src/test/setup.ts - 测试环境设置

运行测试:
```
cd frontend
npm install  # 自动安装新的测试依赖
npm test     # 运行测试
npm test -- --watch  # 监视模式
npm run test:ui      # UI界面
```