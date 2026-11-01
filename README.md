# Technosophy Lab 社技哲學實驗室網站

網址：<https://lab.hungching.com>
架構：Jekyll＋GitHub Pages。把檔案改好、推上 GitHub，網站約 1–2 分鐘後自動更新。

日常更新的步驟與範例，另見主理人用的《Lab 網站維護手冊》；這份 README 是給協助維護的人看的技術說明。

---

## 資料夾一覽

| 位置 | 內容 | 要不要常改 |
|---|---|---|
| `_data/news.yml` | 最新消息 | **常改** |
| `_data/stats.yml` | 首頁數字欄（書籍、期刊論文…） | 偶爾 |
| `_data/areas.yml` | 首頁三個研究專長 | 很少 |
| `_data/social.yml` | 頁尾社群連結（Lab 粉專、Instagram） | 很少 |
| `_data/navigation.yml` | 上方選單 | 很少 |
| `_data/books.yml` | 書籍 | 出書時 |
| `_data/publications.yml` | 期刊論文、專書章節、會議論文 | 偶爾 |
| `_data/talks.yml` | 邀請演講 | 偶爾 |
| `_data/projects.yml` | 研究計畫 | 偶爾 |
| `_data/members.yml` | 工作團隊（現任／歷屆自動分組） | 偶爾 |
| `_data/records.yml` | 學生表現與榮譽（沒發過消息的紀錄） | 偶爾 |
| `_data/host.yml` | 主理人職務、學經歷、個人連結 | 偶爾 |
| `_data/honors.yml`、`_data/teaching.yml` | 學術榮譽、教學成績 | 偶爾 |
| `_data/dfg.yml` | 《設計永續》專頁：推薦短語、封底文字、論證的旅程、本書特色、讀書會表單、迴響 | 偶爾（迴響） |
| `_includes/dfg/` | 推薦序、作者序、試讀全文與注釋（已依書稿定稿校對） | **不要動** |
| `assets/img/book/` | 專頁用的書封圖、大圖、論證旅程手機圖 | 換圖時 |
| `assets/brand/` | 頁首、頁尾標誌（識別定稿 v0.1.4 的 P2 原檔，1215×116，不得改比例）、網站小圖示 | **不要動** |
| `_config.yml` | 網站名稱、聯絡表單網址、英文版開關 | 很少 |
| `index.html` | 首頁（定位文字、主理人） | 很少 |
| `about/`、`research/`、`publications/`、`news/`、`people/`、`design-for-green/` | 各分頁 | 依需要 |
| `_layouts/`、`_includes/`、`assets/css/` | 版型與樣式 | **不要動**，要改先討論 |

---

## 新增一則消息

打開 `_data/news.yml`，在最上面（說明文字下方）加一段。新的永遠放在最上面。

```yaml
- date: 2026-11-20
  type: 演講
  who: 洪靖
  title: 講題
  summary: 場合，時間，城市：地點。主辦單位。
  link: https://...
  link_text: 活動資訊
```

- `date`：日期（必填）
- `type`：類別，兩個字：出版／獲獎／發表／演講／活動（必填）
- `who`：人名（可省略）。成員寫成 `陸柏臻（成員）`，多人用頓號。有寫時標題會顯示成「人名｜標題」；活動本身當主詞時不寫。
- `title`：論文或講題、書名、獎項名稱、活動名稱（必填）
- `summary`：第二行說明（可省略）
- `link`、`link_text`：連結與連結文字，例如「報名表單」「官方報導」（可省略）。站內頁面以 `/` 開頭。
- `lang: en`：標題與說明是英文時加上
- 文字裡有英文冒號加空格（例如 `ISBN: 978…`、英文論文題目）時，整段要用英文雙引號包起來。

自動處理的事：

- 只顯示**最近一次更新網站往前兩年內**的消息，最多 20 則。舊的會自動隱藏，不必刪除。
- 日期是今天或之後的消息，類別標籤會變成橘底反白；日期一過，自動變回原樣。這是讀者打開網頁時依台灣時間判斷的，不必更新網站。
- 首頁顯示「置頂一則＋最新五則」，消息頁依年份列出全部。

## 置頂

在要置頂的消息加上 `pinned: true`。

- 全站**只放一則**置頂。換置頂時，記得把舊的那則的 `pinned: true` 刪掉。
- 置頂的消息不算在首頁的「最新五則」裡。
- 不想置頂任何消息時，全部拿掉即可，首頁就只顯示最新五則。

## 成員頁

**工作團隊**（`_data/members.yml`）：新成員加在最下面，寫 `name`、`dept`、`role`、`from`。成員離開時補上 `to`，就會自動移到「歷屆成員」。年月要加引號，例如 `'2025.10'`。歷屆成員超過 6 位時會自動折疊。

**學生表現與榮譽**：來源有兩個，網站自動合併、依日期排列，前 8 則直接顯示，其餘折疊。

- 最新消息裡 `who` 有「（成員）」或寫了 `student: true` 的，會自動列入。所以**舊消息不要刪**。
- 與 Lab 無關、或沒發過消息的紀錄，寫在 `_data/records.yml`，欄位說明在檔案開頭。

**學術榮譽、教學成績**（`_data/honors.yml`、`_data/teaching.yml`）：新的加在最上面。學術榮譽顯示最新 9 則、教學成績顯示最新 8 則，其餘由一個「顯示較早紀錄」一起展開。

## 改首頁數字

打開 `_data/stats.yml`，只改 `value:` 後面的數字。首頁的數字要手動改；出版頁的數字會依資料自動計算。

## 改研究專長

打開 `_data/areas.yml`。編號 01、02、03 依檔案中的順序自動產生，調換順序就是整段（`- title:` 和 `text:` 兩行）上下對調。

## 《設計永續》專頁

網址 `/design-for-green/`，不在選單上，由消息、出版頁、關於頁的「關於此書」連過去。

- **活動**：在 `_data/news.yml` 的消息加上 `book: design-for-green`，就會自動列在專頁的「活動」（類別是「出版」的除外）。
- **迴響**：寫在 `_data/dfg.yml` 最後的 `responses`，格式在檔案開頭。有一則以上時，區塊和上方目錄連結才會出現。
- **購書與折扣**：在 `_data/books.yml` 的 `buy`。有 `discount` 的書店，名稱後會加上橘色小字；折扣結束時刪掉那一行。
- **書封圖**：`assets/img/book/` 裡的 `dfg_3d.webp`（開頭立體書封，876×1280）、`dfg_front.jpg`／`dfg_back.jpg`（900 寬）、`dfg_front_large.jpg`／`dfg_back_large.jpg`（點圖放大用，1600 寬）。換圖時保持同樣檔名與比例。出版頁與關於頁另用 `assets/img/cover_design_for_green_zh.jpg`、`assets/img/book_design_for_green_zh.webp`。
- **論證的旅程**：桌機由 `assets/js/journey.js` 即時繪製；手機顯示 `assets/img/book/journey.jpg`。章節名稱改動時，兩者都要更新。
- **試讀注釋**：注號用原書編號（7–20），桌機點注號會浮出注釋（`assets/js/footnotes.js`）。
- **字型**：專頁用獅尾半月（OFL 授權），只內嵌頁面用到的字（`assets/fonts/`）。專頁文字有大幅增加時，需要重新擷取字型子集。

## 聯絡表單

網站沒有聯絡頁。上方選單的「聯絡」、頁尾的「聯絡表單」、關於頁的聯絡欄，都直接連到 Google 表單。表單網址只寫在 `_config.yml` 的 `contact_form`，換表單時改那一處即可。

## 社群分享預覽圖

- 臉書、LINE、X 抓連結時顯示的預覽圖，不會出現在頁面上。檔案在 `assets/img/og/`：`og_default.jpg`（全站預設）、`og_book.jpg`（《設計永續》專頁），都是 1200×630。
- 全站預設寫在 `_config.yml` 的 `defaults` → `image`；個別頁面在檔案開頭另寫 `image` 就會覆寫（例如 `design-for-green/index.html`）。
- 換圖時用同樣檔名與尺寸。臉書會記住舊的預覽，換圖後到臉書的「分享偵錯工具」（Sharing Debugger）貼上網址、按「重新抓取」。

## 機構資料標記（給搜尋引擎）

- 首頁的 `<head>` 有一段讀者看不到的結構化資料（`_includes/head.html` 的 `ResearchOrganization`），告訴搜尋引擎 Lab 的名稱、標誌、Facebook 專頁，以及主理人洪靖的個人帳號。
- 標誌用 C2 頭像（`assets/brand/logo_C2_512.png`，由識別定稿原檔縮成 512 px）。
- 社群網址寫平台原網址（例如 `https://www.facebook.com/TechnosophyLab/`），不寫 hungching.com 的轉址。帳號網址改變時，記得一起改這裡。
- 改完可用 Google 的「複合式搜尋結果測試」（Rich Results Test）或 <https://validator.schema.org> 檢查。

## 瀏覽統計（GoatCounter）

- 後台：<https://hungching1982.goatcounter.com>。帳號代號寫在 `_config.yml` 的 `goatcounter`；刪掉這一行就會停止統計。
- 統計碼在 `_layouts/default.html` 最下方，只在正式網站（GitHub Pages）計算，在自己電腦預覽時不計。
- **排除自己的瀏覽**：在每個要排除的瀏覽器（電腦、手機各一次）打開 <https://lab.hungching.com/#toggle-goatcounter>。清除瀏覽器資料後要重做。
- **頁面瀏覽**：每個頁面自動計算，不必另外設定。
- **點擊計數**：連結或按鈕加上 `data-goatcounter-click="名稱"`，後台就會以這個名稱計次。目前只計三類：
  - 購書：書籍頁、出版頁的每家書店分開（`書籍頁-購書-誠品`、`出版頁-購書-設計永續-誠品`……）
  - 社群連結：依位置分開（`社群-頁尾-…`、`社群-關於頁-…`、`社群-成員頁主理人-…`）
  - 書籍頁的展開與放大：推薦序兩篇、作者序、第一章試讀、封面、封底
- 裝了廣告阻擋外掛的讀者不會被計算，數字會偏低，適合看趨勢與比較。

## 英文版

英文版完成後，把 `_config.yml` 的 `english_ready: false` 改成 `true`，右上角才會出現 EN 按鈕。

---

## 注意事項

- `.yml` 和消息檔開頭 `---` 之間的內容，**縮排要用空格，不能用 Tab**；冒號後面要空一格。
- 內容裡有英文冒號 `:` 的標題，整段用英文雙引號包起來，例如 `title: "A: B"`。
- 改壞了也不用擔心：GitHub 會保留每一次修改，可以退回上一版。網站沒更新時，到 GitHub 儲存庫的 **Actions** 分頁看錯誤訊息。

---

## 在自己電腦預覽（選用）

需要先安裝 Ruby。在這個資料夾執行：

```
bundle install
bundle exec jekyll serve
```

然後打開 <http://localhost:4000>。

## 第一次上線（只做一次）

1. 在 GitHub 建立儲存庫，把這個資料夾的內容推上去。
2. 儲存庫 **Settings → Pages**：Source 選 **Deploy from a branch**，分支選 `main`、資料夾選 `/ (root)`。
3. 同一頁的 **Custom domain** 填 `lab.hungching.com` 並儲存（這個資料夾已附 `CNAME` 檔）。
4. 到 Squarespace 的 DNS 設定新增一筆 **CNAME** 紀錄：主機 `lab`，指向 `GitHub帳號.github.io`（不含儲存庫名稱）。
5. DNS 生效後（可能要幾小時），回到 Settings → Pages 勾選 **Enforce HTTPS**。

GitHub 建議先在帳號設定中驗證 `hungching.com` 網域，以降低網域被冒用的風險。
