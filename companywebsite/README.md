# 醇邁企業網站
在現有 `companywebsite` 專案內改版，採用 Vue 3、TypeScript、Vite、TailwindCSS、Vue Router、GSAP、Lenis、Motion for Vue、VueUse、Lucide。

## 開發
```powershell
cd companywebsite
npm.cmd install
npm.cmd run dev
```
Windows PowerShell 若限制 npm.ps1，請使用 npm.cmd。

## 驗證與建置
```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```
建置產物位於 dist；postbuild 以跨平台 Node 腳本生成 404.html，保留 GitHub Pages 的路由回退。正式主機仍須將未命中的頁面路徑回傳 index.html。

## 頁面
首頁 /、關於我們 /about、服務項目 /services、產品目錄 /portfolio、產品詳情 /portfolio/:id、聯絡我們 /contact。產品篩選保留於 URL query。服務及產品諮詢可預填聯絡表單。

## 內容來源
公司資訊以 https://dragonmile.dev/ 為唯一來源，於 2026-10-12 核對公開部署內容。服務、產品、說明及既有畫面整理於 src/data/content.json；聯絡資料於 src/data/site.ts。未加入原網站未提供的客戶、案例、團隊名單、獎項或認證。原首頁使用的協作情境照片已保存於 public/images/team-collaboration.jpg，不代表公司團隊實拍。未顯示原程式中未公開的服務定價。

## 互動與無障礙
GSAP 負責進場與捲動揭露；Lenis 負責滑鼠滾輪平滑捲動；Motion for Vue 負責產品切換；VueUse 管理捲動、偏好減少動畫、剪貼簿與選單鎖定。減少動畫偏好會停用平滑捲動及進場動畫。行動版選單支援 Escape、焦點循環與頁面切換自動關閉。產品圖片使用原生 dialog 支援鍵盤關閉。

聯絡表單沿用 mailto，不具伺服器收件功能。送出會開啟使用者郵件軟體，包含姓名、電子郵件、公司、服務、預算與需求，須由使用者自行確認寄出。頁面不會宣稱郵件已送達。

## 原始工作保護
原本 React .tsx 檔案保留作為遷移參考，Vue 入口為 src/main.ts，執行時不載入 React。改版前來源與設定保存在工作區 .local-backups/companywebsite-before-vue.zip，舊 pnpm lock 保存在同目錄，均不納入版本控制。專案統一使用 npm lock。

## 明亮版面與未來感視覺
原「波更新」commit `8ba23de` 的 WebGL 粒子球、軌道、游標互動、色散與捲動變形，以及各內頁點狀波浪，已移植至 Vue 生命週期。首頁以球體作為主視覺，向下捲動時延展至產品區；內頁與聯絡區保留淡藍色波浪，搭配新版明亮版面。

原始繪製與 shader 位於 `src/visuals/`；淺色配色調整位於 `sphereTheme.ts`，版面與球體位置位於 `src/visuals.css`。Vue 包裝元件會在離開頁面時清理繪圖資源；支援減少動畫偏好、WebGL 無法使用時的靜態球體，以及 context 恢復。整合前備份保存在 `.local-backups/companywebsite-before-hybrid.zip`。
