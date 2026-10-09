---
title: "Supabase vs Firebase vs AWS Amplify 徹底比較【2026年版】── BaaS（バックエンドサービス）、どのサービスを選べばいいのか"
description: "Webアプリやモバイルアプリのバックエンドをすばやく構築したい企業に向け、Supabase・Firebase・AWS Amplifyの3サービスを「データベース・認証・サーバーレス関数&API・開発者体験・料金」の5軸で徹底比較。自社のプロダクトに合ったBaaS選びを解説します。"
category: "比較レビュー"
tags: ["BaaS", "Supabase", "Firebase", "AWS Amplify", "バックエンドサービス", "サーバーレス", "クラウド", "比較"]
publishDate: 2026-10-10
heroImage: "/images/articles/hero-baas-backend.jpg"
draft: true
affiliate:
  - name: "Supabase"
    url: "https://supabase.com/"
    cta: "Supabaseの詳細を見る →"
  - name: "Firebase"
    url: "https://firebase.google.com/"
    cta: "Firebaseの詳細を見る →"
  - name: "AWS Amplify"
    url: "https://aws.amazon.com/amplify/"
    cta: "AWS Amplifyの詳細を見る →"
---

<img src="/images/articles/hero-baas-backend.jpg" alt="データセンターのサーバーラック — BaaS（バックエンドサービス）導入検討のイメージ" class="hero-img" />

<div class="author-note">
<div class="author-icon">📝</div>
<div><strong>StackPicks編集部</strong>｜SaaSツール専門の比較メディア。すべての記事は**編集部が実際にツールを操作し、検証した情報だけ**をお届けしています。机上の比較ではなく、実際に触った上での評価です。記事内のリンクから収益を得る場合がありますが、評価・推奨はすべて編集部の独立した判断に基づいています。</div>
</div>

## 「バックエンドの構築に時間をかけすぎている」── フロントエンド開発に集中しながらプロダクトを素早くリリースするためのBaaS（Backend as a Service）

**結論から言います。** BaaS（バックエンドサービス）を選ぶうえで最も重要なのは、「最も機能が多いサービスを導入すること」ではなく「自社のプロダクト要件と開発チームの技術スタック──リレーショナルデータベース（PostgreSQL）の柔軟なクエリとオープンソースのエコシステムを活かしてモダンなWebアプリを構築したいのか、Googleエコシステムとの深い統合とNoSQLのスキーマレスな開発スピードでモバイルアプリを素早くリリースしたいのか、AWSの堅牢なインフラを抽象化しエンタープライズレベルのスケーラビリティでプロダクトを成長させたいのか──を見極め、"自社のデータモデルと将来のスケール要件"に合ったサービスを選ぶこと」です。

「認証・データベース・ストレージ・サーバーレス関数……バックエンドの各コンポーネントを一からセットアップしている時間がない」── そんな課題を感じていないでしょうか。

- 新規プロダクトのMVPを1〜2週間でリリースしたいが、バックエンドの構築に工数がかかりすぎている
- ユーザー認証（メール・パスワード、Google / GitHub / Apple ログイン）を安全に実装したいが、自前で作るのはセキュリティリスクが高い
- リアルタイムなデータ同期（チャット、共同編集、ダッシュボードの自動更新）を実装したいが、WebSocketの運用が大変
- PostgreSQLのような標準的なRDBを使いたいが、インフラの管理はしたくない
- プロダクトが成長したときにベンダーロックインで身動きが取れなくなるのが心配

今回はこの「BaaS」の中から、異なるアプローチを持つ3サービス──**Supabase・Firebase・AWS Amplify**──を、Webエンジニア・CTOそれぞれの実務に即した観点で比較します。

<div class="box-point">
<strong>この記事で分かること</strong><br>
・Supabase / Firebase / AWS Amplify の「本質的な違い」── PostgreSQLベースのオープンソースプラットフォームでSQLの柔軟性とデータの移植性を重視する「オープンソースRDB型」か、Googleエコシステムとの統合とNoSQLのスキーマレスな設計でモバイルファーストに開発する「Googleエコシステム型」か、AWSのマネージドサービス群を抽象化してエンタープライズ要件にも対応する「AWSエコシステム型」か<br>
・データベース・データモデリング ── PostgreSQL vs Firestore（NoSQL） vs DynamoDB。リレーショナルモデルとドキュメントモデルの違いが設計にどう影響するか<br>
・認証・ユーザー管理 ── ソーシャルログイン・MFA・RLS（行レベルセキュリティ）・JWTカスタマイズなど、認証基盤の充実度<br>
・サーバーレス関数・API・リアルタイム機能 ── Edge Functions / Cloud Functions / Lambda。リアルタイムサブスクリプション・GraphQL対応・REST API自動生成<br>
・開発者体験・エコシステム ── SDK・CLI・ローカル開発環境・ドキュメント・コミュニティの成熟度<br>
・料金体系 ── 無料枠の範囲・従量課金の仕組み・プロダクトのスケールに伴うコスト変化
</div>

<div class="box-info">
<strong>この記事は「アプリケーションのバックエンド基盤（BaaS）」に焦点を当てています</strong><br>
ノーコードで業務アプリを構築したい場合は、「kintone vs Airtable vs AppSheet」のノーコード業務アプリ比較が参考になります。また、静的サイトやJamstackのデプロイ先を探している場合は、各サービスのホスティング機能だけでなくNetlifyやCloudflare Pagesなども候補に含めて検討するのがおすすめです。本記事では、Web・モバイルアプリのバックエンド（データベース・認証・API・ストレージ）をまとめて提供するBaaSプラットフォームを取り上げます。
</div>

## BaaSの基礎知識 ── 「なぜ今、バックエンドを自前で構築せずBaaSを選ぶ企業が増えているのか」を整理しましょう

比較に入る前に、BaaSの基本的な仕組みと、選定時に押さえておきたいポイントを整理しておきましょう。

**BaaS（Backend as a Service）とは** ── Web・モバイルアプリのバックエンドに必要なコンポーネント（データベース・ユーザー認証・ファイルストレージ・サーバーレス関数・リアルタイム通信など）を、マネージドサービスとして提供するプラットフォームです。開発チームはサーバーのプロビジョニングやインフラの運用管理から解放され、フロントエンドのプロダクト開発に集中できます。

**なぜ今、BaaSが注目されているのか：**

**① フロントエンド技術の進化で「バックエンドの構築」がボトルネックになっている：** React・Next.js・Flutter・React Nativeなどのフロントエンドフレームワークの成熟により、UIの開発速度は飛躍的に向上しました。一方で、認証・データベース・APIの設計・インフラの運用といったバックエンドの構築は依然として多くの工数を要します。BaaSはこのボトルネックを解消し、プロダクトのリリースまでの時間を大幅に短縮します。

**② スタートアップの「速度」と「コスト効率」への要求が高まっている：** 限られた開発リソースでMVPを素早くリリースし、ユーザーの反応を見ながらプロダクトを改善していくアプローチが主流になっています。BaaSの無料枠を活用すれば、初期コストゼロでバックエンドを構築し、プロダクトの成長に応じてスケールアップできます。

**③ サーバーレスアーキテクチャの普及でBaaSの実用性が向上した：** AWS Lambda・Cloudflare Workers・Deno Deployなどのサーバーレス実行環境の進化により、BaaSの機能をカスタムロジックで柔軟に拡張できるようになりました。「BaaSの手軽さ」と「カスタムバックエンドの柔軟性」を両立できる時代になっています。

**BaaSに関する基本用語：**

- **リレーショナルデータベース（RDB）：** テーブル・行・列の構造でデータを管理し、SQLでクエリするデータベース。PostgreSQLが代表的。データの整合性と複雑なクエリに強い
- **NoSQLデータベース：** ドキュメント型・キーバリュー型など、スキーマを固定しない柔軟なデータモデル。Firestore・DynamoDBが代表的。スケーラビリティと開発スピードに強い
- **RLS（Row Level Security / 行レベルセキュリティ）：** データベースレベルでアクセス制御を実装する仕組み。「ユーザーAは自分のデータだけ読み書きできる」といったポリシーをSQLで定義できる
- **Edge Functions：** CDNのエッジロケーション（ユーザーに近いサーバー）でサーバーレス関数を実行する仕組み。低レイテンシーなAPI処理が可能
- **リアルタイムサブスクリプション：** データベースの変更をクライアントにリアルタイムで配信する仕組み。チャット・通知・ダッシュボードの自動更新などに利用

## 3サービスの基本比較 ── まず全体像を掴みましょう

<table class="comparison-table">
<thead>
<tr><th>項目</th><th>Supabase</th><th>Firebase</th><th>AWS Amplify</th></tr>
</thead>
<tbody>
<tr><td><strong>運営会社</strong></td><td>Supabase, Inc.（米国・2020年設立・オープンソース）</td><td>Google LLC（Alphabet傘下・2014年買収）</td><td>Amazon Web Services, Inc.（Amazon傘下）</td></tr>
<tr><td><strong>データベース</strong></td><td>PostgreSQL（マネージド）</td><td>Cloud Firestore（NoSQL・ドキュメント型）/ Realtime Database</td><td>Amazon DynamoDB（NoSQL・キーバリュー＋ドキュメント型）/ Aurora PostgreSQL（Amplify Gen 2）</td></tr>
<tr><td><strong>アプローチ</strong></td><td>PostgreSQLを中心に、認証・ストレージ・Edge Functions・リアルタイム機能をオープンソースで提供。SQLの柔軟性とデータの移植性を重視するオープンソースRDB型</td><td>Googleエコシステム（GCP・Android・Flutter）との深い統合、NoSQLのスキーマレスな設計、充実したモバイルSDKでプロトタイピングから本番運用まで対応するGoogleエコシステム型</td><td>AWSのマネージドサービス群（Cognito・AppSync・Lambda・DynamoDB）をフロントエンド開発者向けに抽象化し、エンタープライズ要件にも対応するAWSエコシステム型</td></tr>
<tr><td><strong>主な対象</strong></td><td>PostgreSQL経験のあるWebエンジニア・スタートアップ・オープンソースを重視するチーム</td><td>モバイルアプリ開発者・フルスタック開発者・Google Cloud利用企業</td><td>AWSを既に利用している企業・エンタープライズ・大規模アプリ</td></tr>
<tr><td><strong>料金目安</strong></td><td>無料（Free：500MBストレージ・5GB帯域）、Pro：月25ドル〜、Team：月599ドル〜</td><td>無料（Spark：Firestore 1GiB・月50,000読取/日）、Blaze：従量課金</td><td>無料枠あり（AWS Free Tier準拠）、以降は各AWSサービスの従量課金</td></tr>
<tr><td><strong>強み</strong></td><td>PostgreSQL（SQL・RLS・トリガー・拡張機能）・オープンソース・セルフホスト可能・REST / GraphQL API自動生成・Realtime・Edge Functions・Supabase Auth・Supabase Storage</td><td>Firestore（オフライン同期・自動スケール）・Firebase Auth（匿名認証含む幅広いプロバイダ対応）・Cloud Functions・Firebase Hosting・FCM（プッシュ通知）・Crashlytics・Analytics・Remote Config</td><td>AWS Cognito（認証）・AppSync（GraphQL）・Lambda（サーバーレス）・S3（ストレージ）・Amplify Gen 2（TypeScript-first・CDK統合）・Amplify Hosting・IAMによる細かな権限管理</td></tr>
</tbody>
</table>

## データベース・データモデリング ── 「プロダクトのデータをどう設計し、どう問い合わせるか」がBaaS選びの根幹です

BaaSの中核はデータベースです。「リレーショナル（SQL）」か「NoSQL」か──この選択がアプリケーションの設計全体に影響します。

**Supabase**は、PostgreSQLをフルマネージドで提供しています。PostgreSQLは世界で最も信頼されているオープンソースのリレーショナルデータベースであり、外部キー・JOIN・トランザクション・ビュー・ストアドプロシージャなど、SQLの全機能を利用できます。複雑なクエリや集計処理が得意で、「ユーザーごとの直近30日の注文金額を集計し、カテゴリ別にランキングを出す」といった分析クエリもSQLで直接記述できます。PostgreSQLの拡張機能（pgvector・PostGIS・pg_cronなど）も利用可能で、ベクトル検索（AI/RAG）や地理空間クエリにも対応できます。RLS（行レベルセキュリティ）をデータベースレベルで定義できるため、「ユーザーは自分のデータだけを読み書きできる」といったアクセス制御をSQLポリシーとして記述でき、バックエンドのコードに認可ロジックを分散させる必要がありません。データの移植性が高く、標準的なpg_dumpでデータをエクスポートし、任意のPostgreSQL環境に移行できるのもポイントです。

**Firebase**は、Cloud Firestoreを主力データベースとして提供しています。Firestoreはドキュメント型のNoSQLデータベースで、JSONライクなドキュメントをコレクション（フォルダのようなもの）に格納する構造です。スキーマを事前に定義する必要がないため、プロトタイピングの速度が非常に速く、「まずデータを入れてみて、構造は後から調整する」という開発スタイルに向いています。自動スケーリングにより、トラフィックの急増にも追加設定なしで対応できます。最大の特徴はオフライン同期で、ネットワークが切断された状態でもローカルキャッシュからデータを読み書きでき、接続回復時に自動同期されます。モバイルアプリでは非常に強力な機能です。一方で、JOINに相当する操作がなく、集計クエリも制限があるため、リレーショナルなデータモデルが必要な場合はデータの非正規化（同じデータを複数のドキュメントに冗長に持つ設計）が必要になります。

**AWS Amplify**は、Gen 2でデータレイヤーが大きく進化しました。デフォルトではAmazon DynamoDBをバックエンドに使用し、AWS AppSync（GraphQL）経由でデータにアクセスします。DynamoDBはキーバリュー型＋ドキュメント型のNoSQLデータベースで、ミリ秒レベルのレイテンシーと事実上無制限のスケーラビリティが特徴です。Amplify Gen 2ではTypeScriptでデータモデルを定義し、GraphQLスキーマとリゾルバーが自動生成されます。リレーションシップ（hasOne・hasMany・belongsTo）もTypeScriptの型定義として宣言的に記述できます。さらに、Amplify Gen 2ではAurora PostgreSQL（Serverless v2）も選択可能になり、RDBが必要なケースにも対応できるようになりました。DynamoDBの設計はパーティションキーとソートキーの設計が重要で、RDBに慣れた開発者には学習コストがかかりますが、正しく設計すれば大規模データでも安定したパフォーマンスを発揮します。

<div class="box-warning">
<strong>「RDB（SQL）」と「NoSQL」の選択は、後から変更するコストが非常に高いです</strong><br>
データベースの種類はアプリケーションの設計全体に影響するため、プロジェクトの途中で変更するのは大規模なリファクタリングを伴います。迷った場合は、「データ間のリレーション（外部キー・JOIN）が頻繁に必要か」「集計クエリや複雑な検索条件が多いか」を基準に判断するのがおすすめです。リレーションや集計が重要ならSupabase（PostgreSQL）、スキーマレスな柔軟性とオフライン同期が重要ならFirebase（Firestore）、大規模なスケーラビリティとAWSエコシステムとの統合が重要ならAWS Amplify（DynamoDB）が適しています。
</div>

## 認証・ユーザー管理 ── 「ログイン機能をどれだけ安全に、手軽に実装できるか」

ユーザー認証はほぼすべてのアプリに必要な機能であり、セキュリティの要です。BaaSの認証機能の充実度は、開発工数とセキュリティ品質の両面に影響します。

**Supabase**は、Supabase Auth（GoTrue ベース）を提供しています。メール / パスワード認証、マジックリンク（パスワードレス）、電話番号認証（SMS OTP）、ソーシャルログイン（Google・GitHub・Apple・Discord・Twitter/X・Azure AD・Slack など20以上のプロバイダ）に対応しています。MFA（多要素認証・TOTP）にも対応しており、エンタープライズ要件も満たせます。最大の特徴は、認証とデータベースのRLS（行レベルセキュリティ）がネイティブに統合されていることです。`auth.uid()` 関数を使ってPostgreSQLのRLSポリシーを定義すれば、「ログインユーザーは自分のデータだけ操作できる」という認可ルールをデータベースレベルで強制できます。JWTのカスタムクレームにも対応しており、ロールベースのアクセス制御（RBAC）も実装可能です。

**Firebase**は、Firebase Authenticationを提供しており、認証プロバイダの対応範囲はBaaSの中でも最も広いです。メール / パスワード、電話番号（SMS）、Google・Apple・Facebook・Twitter/X・GitHub・Microsoft・Yahooなどのソーシャルログインに加え、匿名認証（ゲストユーザーとして利用を開始し、後からアカウントにリンク）にも対応しています。Firebase Authentication with Identity Platform（有料）を使えば、MFA（SMS / TOTP）、SAMLプロバイダ、OpenID Connect、ブロッキング関数（認証フロー中にカスタムロジックを挿入）などのエンタープライズ機能が利用可能です。Firestoreのセキュリティルール（Firestore Rules）と連携し、認証状態に基づいたデータアクセス制御を宣言的に記述できます。モバイルSDKの成熟度が高く、iOS・Android・Flutterでの認証実装が非常にスムーズです。

**AWS Amplify**は、Amazon Cognitoをベースにした認証機能を提供しています。Cognitoはエンタープライズ向けの認証・認可サービスで、ユーザープール（認証）とIDプール（AWS IAMとの連携）を組み合わせた高度なアクセス制御が可能です。メール / パスワード、ソーシャルログイン（Google・Apple・Facebook・Amazon）、SAMLフェデレーション、MFA（SMS / TOTP）に対応しています。Amplify Gen 2では、TypeScriptでアクセスルールを定義し、「オーナーだけが編集可能」「認証済みユーザーは読み取り可能」「特定のグループのみアクセス可能」といったルールを宣言的に記述できます。AWS IAMとの統合により、データベースだけでなくS3バケットやLambda関数へのアクセスも一元的に制御できるのがポイントです。企業のActive DirectoryやOktaとのSAML / OIDC連携も可能で、エンタープライズのSSO要件に対応できます。

<div class="box-info">
<strong>認証プロバイダの「数」よりも「自社のユーザーが使うプロバイダ」を優先的に確認するのがおすすめです</strong><br>
20以上のソーシャルログインに対応していても、実際に利用するのは2〜3種類というケースがほとんどです。自社のターゲットユーザーが使うログイン方法（Googleログイン、Apple ID、メール / パスワードなど）が確実にサポートされているかを確認し、その上で将来必要になる可能性のある機能（MFA、SAMLフェデレーション、匿名認証など）の対応状況を評価するのが効率的です。
</div>

## サーバーレス関数・API・リアルタイム機能 ── 「カスタムロジックをどう実装し、データをどうリアルタイムに届けるか」

BaaSの標準機能だけでは対応しきれないビジネスロジック（決済処理・外部API連携・通知送信など）は、サーバーレス関数で拡張します。また、リアルタイムなデータ同期はモダンなアプリに欠かせない機能です。

**Supabase**は、Edge Functions（Deno ベース）を提供しています。TypeScript / JavaScriptで記述し、世界中のエッジロケーションで実行されるため、低レイテンシーのAPIエンドポイントを簡単に構築できます。Deno のランタイムを採用しているため、npm パッケージだけでなく Deno のエコシステムも利用可能です。RESTful APIはPostgreSQLのテーブルから自動生成されるPostgRESTベースのAPIが標準で提供され、テーブルを作成するだけでCRUD操作のAPIが即座に利用可能になります。GraphQLもpg_graphqlを通じて利用できます。リアルタイム機能は、PostgreSQLの変更を検知してクライアントにWebSocket経由で配信するRealtime機能が組み込まれており、データベースのINSERT・UPDATE・DELETEをリアルタイムにサブスクライブできます。Broadcast（クライアント間メッセージング）やPresence（オンライン状態の追跡）もサポートされています。

**Firebase**は、Cloud Functions for Firebaseを提供しており、Node.js（TypeScript / JavaScript）またはPython で記述します。Firestoreのトリガー（ドキュメントの作成・更新・削除時に自動実行）、Firebase Authenticationのトリガー（ユーザー登録時に自動実行）、HTTPSリクエスト、Pub/Subメッセージ、スケジュール実行など、豊富なトリガーが用意されています。第2世代のCloud Functions（Cloud Run ベース）では、最大60分のタイムアウト、同時実行数の制御、最小インスタンス数の設定が可能で、コールドスタートの問題も大幅に改善されています。リアルタイム機能はFirestoreの最大の強みで、`onSnapshot`リスナーを設定するだけで、データの変更がクライアントに自動的にプッシュされます。オフライン状態でもローカルキャッシュから読み書きでき、接続回復時に自動同期される仕組みは、モバイルアプリでの体験を大きく向上させます。

**AWS Amplify**は、AWS LambdaとAWS AppSync を中核としたサーバーレスアーキテクチャを提供しています。Lambda関数はNode.js・Python・Java・Go・.NETなど多言語に対応し、最大15分のタイムアウトで長時間処理にも対応できます。Amplify Gen 2では、TypeScriptでLambda関数を定義し、`defineFunction` APIでAmplifyのバックエンドリソースと統合できます。API層はAWS AppSync（GraphQL）が標準で、リアルタイムサブスクリプションもGraphQLの`subscription`型で宣言的に定義できます。AppSyncのリアルタイム機能はWebSocketベースで、Firestoreと同様にデータ変更の自動プッシュが可能です。REST APIが必要な場合はAmazon API Gatewayも利用できます。さらに、Step Functions（ワークフロー）・EventBridge（イベントルーティング）・SQS / SNS（メッセージング）など、AWSの豊富なサーバーレスサービスと自由に連携できるため、複雑なバックエンドアーキテクチャにも対応可能です。

<div class="box-success">
<strong>サーバーレス関数の「コールドスタート」はユーザー体験に直結します</strong><br>
サーバーレス関数は、一定時間リクエストがないとインスタンスが停止し、次のリクエスト時に起動時間（コールドスタート）が発生します。Supabaseの Edge Functions（Deno）はエッジ実行のため起動が高速です。Firebaseの Cloud Functions 第2世代は最小インスタンス数を設定することでコールドスタートを回避できます（ただし常時起動分のコストが発生します）。AWS LambdaはProvisioned Concurrency で同様の対策が可能です。APIのレスポンス速度が重要なアプリでは、コールドスタートへの対策も検討しておくのがポイントです。
</div>

## 開発者体験・エコシステム ── 「日々の開発がどれだけ快適に進められるか」

BaaSは開発チームが毎日触るツールです。SDK・CLI・ドキュメント・ローカル開発環境の品質は、開発の生産性とチームの満足度に直結します。

**Supabase**は、開発者体験を最も重視しているサービスのひとつです。ダッシュボード（Web UI）は洗練されたデザインで、テーブルエディタ・SQLエディタ・認証管理・ストレージ管理・ログビューアがすべてブラウザ上で操作できます。特にSQL エディタはインテリジェントな補完機能を備えており、PostgreSQLに精通した開発者にとって快適な操作環境です。Supabase CLIを使えば、ローカル環境でDockerベースのSupabaseスタックを起動し、本番と同じ環境で開発・テストできます。マイグレーション管理もCLIに統合されています。SDKはJavaScript / TypeScript（supabase-js）を主力に、Flutter（Dart）・Swift・Kotlin・Python・C#にも対応しています。supabase-jsはTypeScriptの型推論が強力で、データベースのスキーマから自動生成された型定義により、フロントエンドのコードに型安全性をもたらします。ドキュメントは英語ですが体系的で質が高く、GitHubのリポジトリはオープンソースのためコードベースを直接確認することもできます。

**Firebase**は、モバイル開発のエコシステムにおいて最も成熟したBaaSです。Firebase Consoleはプロジェクト全体を俯瞰できる管理画面で、Firestore・Auth・Hosting・Functions・Crashlytics・Analytics・Remote Configなど、Firebaseのすべてのサービスを一元管理できます。Firebase CLIはプロジェクトの初期化・デプロイ・エミュレータの起動に対応しており、Firebase Local Emulator Suiteを使えば、Firestore・Auth・Functions・Hosting・Storageをローカルで完全にエミュレートできます。SDKはWeb（JavaScript / TypeScript）・iOS（Swift / Objective-C）・Android（Kotlin / Java）・Flutter（Dart）・Unity（C#）・C++に対応しており、特にモバイル系SDKの成熟度は群を抜いています。ドキュメントはGoogleの品質基準で管理されており、コードラボ（ステップバイステップのチュートリアル）・YouTubeの解説動画・Stack Overflowの回答数も豊富です。コミュニティの規模が最も大きく、困ったときに情報を見つけやすいのがポイントです。

**AWS Amplify**は、Gen 2で開発者体験が大幅に改善されました。Gen 1ではGraphQLスキーマをベースにした設定ファイル主導のアプローチでしたが、Gen 2ではTypeScript-firstの宣言的なバックエンド定義に移行し、`defineData`・`defineAuth`・`defineFunction`・`defineStorage`といったAPIでバックエンドリソースをコードとして定義します。AWS CDK（Cloud Development Kit）をベースにしているため、Amplifyの抽象化では対応できない要件にはCDKのコンストラクトを直接使って拡張できます。Amplify CLIはプロジェクトの初期化・サンドボックス環境の起動・デプロイに対応しています。サンドボックス環境では、開発者ごとに独立したバックエンドが自動プロビジョニングされるため、チーム開発で他の開発者の作業に影響を与えません。SDKはJavaScript / TypeScript（aws-amplify）・Swift・Android（Kotlin）・Flutterに対応しています。ドキュメントはAWSの中でも充実しており、Amplify Gen 2への移行ガイドも整備されています。AWSの他サービス（SES・Pinpoint・Rekognition等）との連携ドキュメントも豊富です。

## 料金体系 ── プロダクトの成長フェーズでコスト感は大きく変わります

<table class="comparison-table">
<thead>
<tr><th>項目</th><th>Supabase</th><th>Firebase</th><th>AWS Amplify</th></tr>
</thead>
<tbody>
<tr><td><strong>無料枠</strong></td><td>Free：2プロジェクト / DB 500MB / Storage 1GB / 帯域5GB / Edge Functions 500K呼出 / 月50,000 Auth MAU</td><td>Spark：Firestore 1GiB保存・50,000読取/日・20,000書込/日 / Auth 月間10,000 SMS無料（メール/ソーシャルは無制限） / Storage 5GB / Functions 呼出125,000/月</td><td>AWS Free Tier：12ヶ月間の無料枠（Cognito 50,000 MAU・DynamoDB 25GB・Lambda 100万リクエスト/月・S3 5GB等）</td></tr>
<tr><td><strong>有料プラン</strong></td><td>Pro：月25ドル（DB 8GB・Storage 100GB・帯域250GB・100,000 Auth MAU含む）、超過分は従量課金</td><td>Blaze（従量課金）：Firestore読取 $0.06/10万件・書込 $0.18/10万件・Storage $0.026/GB/月・Functions $0.40/100万呼出</td><td>各AWSサービスの従量課金（DynamoDB: 書込$1.25/100万WCU・読取$0.25/100万RCU、Lambda: $0.20/100万リクエスト、Cognito: 50,000 MAU超は$0.0055/MAU）</td></tr>
<tr><td><strong>入門コスト</strong></td><td>月0円（Freeプラン）〜月25ドル（Proプラン）</td><td>月0円（Sparkプラン・従量課金なし）〜従量課金（Blaze）</td><td>月0円（Free Tier期間中）〜従量課金</td></tr>
<tr><td><strong>コスト予測</strong></td><td>Proプランは月額固定＋超過従量のため予測しやすい</td><td>完全従量課金のため、トラフィック急増時のコストに注意が必要</td><td>サービスごとの従量課金が組み合わさるため、コスト全体像の把握にはAWS Cost Explorerが必要</td></tr>
<tr><td><strong>課金の主な軸</strong></td><td>月額固定 + DBストレージ + 帯域 + Auth MAU + Edge Functions呼出</td><td>Firestoreの読取/書込/削除件数 + Storage容量 + Functions呼出/CPU時間</td><td>各AWSサービスのリクエスト数 + ストレージ容量 + データ転送量</td></tr>
</tbody>
</table>

コスト面で最も予測しやすいのはSupabaseで、Proプラン（月25ドル）の固定月額に含まれるリソース量が明確に定義されています。超過分のみ従量課金されるため、「今月いくらかかるか」を見通しやすい構造です。Firebaseは完全従量課金のBlazeプランが主力ですが、Firestoreの読取回数が課金の主な軸になるため、リアルタイムリスナーを多用するアプリではコストが予想以上に膨らむケースがあります。予算アラートの設定が必須です。AWS Amplifyは裏側の各AWSサービスの従量課金が組み合わさるため、コストの全体像をつかむにはAWS Cost Explorerやコスト配分タグの活用が必要です。大切なのは「月額料金の安さ」だけでなく「プロダクトが10倍・100倍にスケールしたときのコストカーブ」を見通すことです。

## よくある質問

<div class="faq-item">
<div class="faq-q">BaaSを使うと、将来的にベンダーロックインされませんか？</div>
<div class="faq-a">ロックインのリスクはサービスによって異なります。Supabaseはオープンソースで、PostgreSQLという標準的なデータベースを使用しているため、データの移行が最も容易です。セルフホスト（自社サーバーやVPSでSupabaseを運用）も可能なため、ベンダーロックインのリスクは最も低いです。Firebaseは独自のFirestoreデータモデルとセキュリティルールに依存するため、他サービスへの移行にはデータモデルの再設計が必要になるケースがあります。AWS Amplifyは裏側がAWSのマネージドサービスのため、AWSエコシステム内での柔軟性は高いですが、他クラウドへの移行コストは大きくなります。ロックインが心配な場合は、ビジネスロジックをサーバーレス関数に閉じ込め、データベースアクセスを抽象化するアーキテクチャにしておくのがおすすめです。</div>
</div>

<div class="faq-item">
<div class="faq-q">モバイルアプリ（iOS / Android）の開発にはどのサービスが適していますか？</div>
<div class="faq-a">モバイルアプリ開発でのエコシステムの成熟度で言えば、Firebaseが最も実績があります。iOS・Android・Flutterの公式SDKが充実しており、プッシュ通知（FCM）・クラッシュレポート（Crashlytics）・アプリ内テスト（A/Bテスト / Remote Config）・アプリ配信（App Distribution）など、モバイル開発に特化した機能がBaaSと一体で提供されています。SupabaseもFlutter・Swift・KotlinのSDKを提供しており、特にFlutter開発者コミュニティでの採用が増えています。AWS AmplifyはiOS（Swift）・Android（Kotlin）・Flutterに対応していますが、Web（React / Next.js）向けの機能が最も充実している印象です。</div>
</div>

<div class="faq-item">
<div class="faq-q">チーム開発（複数人での並行開発）にはどのサービスが向いていますか？</div>
<div class="faq-a">チーム開発の体験で最も進んでいるのはAWS Amplify Gen 2のサンドボックス環境です。開発者ごとに独立したバックエンドが自動的にプロビジョニングされるため、他のメンバーの開発環境に影響を与えずに作業できます。Supabaseはブランチング機能（Preview Branches）でプルリクエストごとにプレビュー環境を自動生成でき、GitOpsベースのワークフローと相性が良いです。Firebaseはプロジェクト単位の管理が基本で、開発・ステージング・本番を別プロジェクトとして作成し、Firebase CLIで切り替える運用が一般的です。</div>
</div>

<div class="faq-item">
<div class="faq-q">AIアプリ（RAG・ベクトル検索）を構築するにはどのサービスが適していますか？</div>
<div class="faq-a">AI / RAG（検索拡張生成）アプリケーションに最も適しているのはSupabaseです。PostgreSQLの拡張機能pgvectorにより、ベクトルデータの保存・類似度検索がデータベース内で直接実行できます。ドキュメントのEmbeddingを生成し、セマンティック検索やRAGのリトリーバーとして活用するユースケースに最適です。Firebaseにはネイティブのベクトル検索機能はありませんが、VertexAI（Google Cloud）やAlgoliaとの連携で実現可能です。AWS AmplifyはAmazon Bedrockとの連携でAI機能を組み込めますが、ベクトルデータベースには別途Amazon OpenSearch Serverlessなどの構築が必要です。</div>
</div>

<div class="verdict">
<h3>編集部の結論</h3>
<p><strong>大切なのは「最も機能が多いBaaSを導入すること」ではなく、「自社のプロダクト──リレーショナルデータベースの柔軟性とオープンソースの移植性を重視するのか、Googleエコシステムとの統合とモバイルファーストの開発体験を重視するのか、AWSの堅牢なインフラとエンタープライズ要件への対応を重視するのか──に合ったBaaSで、バックエンドの構築を効率化し、プロダクト開発に集中すること」です。</strong></p>
<p>PostgreSQL（SQL・RLS・JOIN・トリガー）×オープンソース×セルフホスト可能×REST/GraphQL自動生成×Edge Functions×pgvector（AI/ベクトル検索）×型安全なTypeScript SDKで、データの移植性を確保しながらモダンなWebアプリのバックエンドを構築するなら<strong>Supabase</strong>がおすすめです。PostgreSQLの豊富な機能をフルに活かしつつ、BaaSの手軽さも両立したいチームにとって最も魅力的な選択肢です。</p>
<p>Firestore（NoSQL・オフライン同期・自動スケール）×Firebase Auth（匿名認証含む幅広いプロバイダ対応）×Cloud Functions×FCM（プッシュ通知）×Crashlytics×Analytics×Remote Config×成熟したモバイルSDKで、iOSやAndroidのモバイルアプリを素早くリリースするなら<strong>Firebase</strong>がおすすめです。Googleエコシステムとの深い統合と、モバイル開発に特化した包括的なツール群は他のBaaSでは得られない強みです。</p>
<p>AWS Cognito（認証・SAMLフェデレーション）×AppSync（GraphQL・リアルタイム）×DynamoDB / Aurora PostgreSQL×Lambda×S3×CDK統合×Amplify Gen 2（TypeScript-first）×IAMによる細粒度アクセス制御で、エンタープライズレベルのセキュリティとスケーラビリティを確保しながらフルスタックアプリを構築するなら<strong>AWS Amplify</strong>がおすすめです。AWSの既存リソース（VPC・RDS・SES等）との統合が必要な場合にも最適です。</p>
<p>迷ったら、まず「データモデル」と「チームの技術スタック」で判断するのがおすすめです。PostgreSQLに慣れているチームならSupabase。モバイルアプリが主軸ならFirebase。AWSを既に利用しているならAmplify。3サービスとも無料枠が用意されていますので、実際にプロジェクトを作成し、データベース操作・認証フロー・サーバーレス関数のデプロイまでを試してから判断することをおすすめします。</p>
</div>

## まとめ：選び方の3つのポイント

<ul class="checklist">
<li><strong>PostgreSQL×オープンソース×RLS×REST/GraphQL自動生成×Edge Functions×pgvector×セルフホスト可能で、データの移植性を確保しながらモダンなWebアプリのバックエンドを構築するなら → Supabase</strong>（Free月0円 / Pro月25ドル〜 / PostgreSQL・SQL・外部キー・JOIN・トリガー・拡張機能・RLS・PostgREST・Realtime・Edge Functions（Deno）・Supabase Auth・Supabase Storage・TypeScript型推論・ローカルDocker開発・ブランチング・オープンソース）</li>
<li><strong>Firestore×Googleエコシステム×オフライン同期×FCM×Crashlytics×Analytics×Remote Config×成熟したモバイルSDKで、モバイルファーストのアプリを素早くリリースするなら → Firebase</strong>（Spark月0円 / Blaze従量課金 / Firestore・NoSQL・ドキュメント型・オフライン同期・自動スケール・Firebase Auth・匿名認証・Cloud Functions・Firebase Hosting・FCM・Crashlytics・Analytics・Remote Config・A/Bテスト・App Distribution・Local Emulator Suite）</li>
<li><strong>AWS Cognito×AppSync×DynamoDB×Lambda×CDK統合×IAM×Amplify Gen 2で、エンタープライズレベルのスケーラビリティとセキュリティを確保するなら → AWS Amplify</strong>（Free Tier 12ヶ月無料 / 以降従量課金 / DynamoDB・Aurora PostgreSQL・AppSync（GraphQL）・Lambda・Cognito・S3・CDK統合・TypeScript-first・サンドボックス環境・Amplify Hosting・Step Functions・EventBridge連携・SAMLフェデレーション・IAMアクセス制御）</li>
</ul>

「新規プロダクトのバックエンドを一から構築する時間がない」「認証やデータベースのインフラ管理から解放されたい」「プロダクトの成長に合わせてスケールできるバックエンドがほしい」── こうした課題を感じているチームは、まず「自社のデータモデル（RDBが必要か、NoSQLで十分か）」と「チームの技術スタック（PostgreSQL / Google Cloud / AWS）」を基準に、各サービスの無料枠で実際にプロジェクトを作成してみるところから始めてみてください。BaaSの選定は「機能の多さ」だけでなく「プロダクトが成長したときにも柔軟に対応できるか」も含めた中長期の判断が大切です。自社のプロダクトの成長を支えてくれるバックエンド基盤を見つけていきましょう。
