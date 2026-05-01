# 測試文檔

此項目包含 Backend 和 Frontend 的完整測試套件。

## Backend 測試 (pytest)

### 位置
- `backend/test_app.py` - Flask API 的單元測試

### 測試覆蓋

#### TestGetCities
測試 `GET /api/cities` 端點：
- ✅ 成功返回所有城市列表
- ✅ 驗證返回格式和數據結構

#### TestGetSpotsByCity
測試 `GET /api/spots/<city>` 端點：
- ✅ 成功獲取特定城市的散步地點
- ✅ 返回 404 當城市不存在
- ✅ 驗證散步地點的數據結構（包含所有必需字段）
- ✅ 測試多個城市

#### TestGetAllSpots
測試 `GET /api/spots` 端點：
- ✅ 成功返回所有城市的散步地點
- ✅ 驗證所有城市都在返回結果中
- ✅ 驗證所有散步地點都有必需字段

#### TestCORSHeaders
- ✅ 驗證 CORS 頭信息存在

#### TestErrorHandling
- ✅ 測試無效路由返回 404
- ✅ 測試錯誤的 HTTP 方法返回 405

### 運行後端測試

```bash
cd backend

# 安裝依賴
pip install -r requirements.txt

# 執行所有測試
pytest

# 執行特定測試類別
pytest test_app.py::TestGetCities -v

# 使用覆蓋率
pytest --cov=app test_app.py
```

### 測試數據
測試使用 Flask 的測試客戶端，直接調用應用程序，不需要啟動服務器。

---

## Frontend 測試 (Vitest)

### 位置
- `frontend/src/test/api.test.ts` - API 函數的單元測試
- `frontend/src/test/SpotCard.test.tsx` - SpotCard 組件測試
- `frontend/src/test/App.test.tsx` - App 組件集成測試
- `frontend/vitest.config.ts` - Vitest 配置
- `frontend/src/test/setup.ts` - 測試環境設置

### 測試覆蓋

#### api.test.ts
測試 API 函數：

**fetchCities**
- ✅ 成功獲取城市列表
- ✅ 處理網絡錯誤

**fetchSpotsByCity**
- ✅ 成功獲取特定城市的散步地點
- ✅ 處理錯誤
- ✅ 正確編碼特殊字符

#### SpotCard.test.tsx
測試 SpotCard 組件渲染：
- ✅ 顯示散步地點名稱
- ✅ 顯示地址
- ✅ 顯示描述
- ✅ 顯示所有標籤
- ✅ 顯示正確的圖片 URL
- ✅ 顯示評分
- ✅ 渲染正確的星級圖標
- ✅ 處理不同的評分
- ✅ 驗證卡片結構

#### App.test.tsx
測試 App 組件集成：
- ✅ 渲染頁面頭部和標題
- ✅ 在組件挂載時獲取城市列表
- ✅ 顯示空狀態（未選擇城市）
- ✅ 選擇城市後獲取散步地點
- ✅ 顯示加載狀態
- ✅ 顯示城市列表獲取失敗的錯誤消息
- ✅ 顯示散步地點獲取失敗的錯誤消息
- ✅ 顯示正確的散步地點數量
- ✅ 渲染頁腳

### 運行前端測試

```bash
cd frontend

# 安裝依賴
npm install

# 執行所有測試
npm test

# 監視模式（開發時自動重新執行）
npm test -- --watch

# 使用 UI 界面運行測試
npm run test:ui

# 生成覆蓋率報告
npm run test:coverage

# 執行特定測試檔案
npm test -- api.test.ts

# 執行特定測試用例
npm test -- --grep "should fetch cities"
```

### 測試技術

- **Vitest** - 現代化的測試框架，基於 Vite
- **@testing-library/react** - React 組件測試庫
- **@testing-library/user-event** - 用戶交互模擬
- **jsdom** - JavaScript DOM 實現

### Mock 策略

- **API 函數**: 使用 `vi.mock()` 模擬 axios 和 API 調用
- **異步操作**: 使用 `waitFor()` 和 `user.selectOptions()` 測試異步流程
- **瀏覽器 API**: 在 `setup.ts` 中 mock 了 `window.matchMedia`

---

## 持續集成

這些測試可以集成到 GitHub Actions 中：

```yaml
# 後端測試
- name: Run backend tests
  run: |
    cd backend
    pip install -r requirements.txt
    pytest

# 前端測試
- name: Run frontend tests
  run: |
    cd frontend
    npm install
    npm test
```

## 測試最佳實踐

1. **隔離性**: 每個測試是獨立的，可以單獨運行
2. **可重複性**: 測試結果應該是確定的和可重複的
3. **快速反饋**: 測試應該快速執行，為開發者提供快速反饋
4. **清晰性**: 測試名稱清楚地描述了測試的內容
5. **覆蓋率**: 目標是達到高代碼覆蓋率，特別是關鍵路徑

## 故障排除

### Backend 測試問題

如果 pytest 找不到，請確保：
1. 虛擬環境已激活
2. `pytest` 已通過 `pip install` 安裝
3. 在 `backend` 目錄中運行命令

### Frontend 測試問題

如果 npm test 失敗，請檢查：
1. 所有依賴已通過 `npm install` 安裝
2. Node.js 版本兼容（建議 v18 或更高）
3. 沒有其他進程占用端口
