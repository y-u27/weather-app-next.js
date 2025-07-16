# weather-app-next.js

## 【アプリ概要】<br/>
「weather-app-next.js」は、特定の地域の天気情報を検索し、天気を知ることができるアプリです。

## 【アプリURL】<br/>
https://weather-app-next-js-zeta.vercel.app/

## 【機能一覧】<br/>
＜フロントエンド＞<br/>
- 地域を選択できるプルダウンメニュー<br/>
- [検索]ボタンで選択した地域の天気情報を表示<br/>
※天気情報：地域名・天気・気温・日時<br/>

＜バックエンド＞<br/>
- OpenWeatherMap APIを使って天気情報を取得
- APIのレスポンスから必要な情報を抽出し、SupabaseのWeatherテーブルに保存
- すでに当日・同一都市の情報がDBに存在する場合はAPIを呼ばずにDBから取得（API回数制限対策）
- 地域名はSupabaseのCityテーブルから取得し、プルダウンに表示

## 【アプリ説明】<br/>
```
1.  地域名をプルダウンから選択

2.  選択後、[検索]ボタンクリック

3.  選択した地域の天気情報が表示される
```

---

## 【使用技術】<br/>
| カテゴリ       | 使用技術            |
|---------------|----------------------|
| **フロントエンド** | React, Next.js, TypeScript, Chakra UI |
| **外部API** | OpenWeatherMap API |
| **バックエンド**   | Prisma      |
| **データベース**   | Supabase             |
| **デプロイ**     | Vercel               |

---

## 【データベース設計(テーブル定義)】<br/>

### Cityテーブル

| カラム名  | 型     | 説明         |
|-----------|--------|--------------|
| id        | int4   | 主キー       |
| name      | text   | ブラウザ表示用の地域名   |
| queryName     | text   | API用の地域名 |

---

### Weatherテーブル

| カラム名  | 型     | 説明         |
|-----------|--------|--------------|
| id        | int4   | 主キー       |
| city      | text   | 地域名   |
| weather     | text   | 天気 |
| temperature     | float8   | 気温 |
| observed_at  | timestamp   | 日時   |
| cityId   | int4   | Cityの外部キー   |
| citys     | City   | Cityテーブルとのリレーション用 |