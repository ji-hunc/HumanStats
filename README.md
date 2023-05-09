# Human Stats

## 배포 주소

[https://www.humanstats.shop/](https://www.humanstats.shop/)

## 🛠 개발 환경

- PC, Mobile 둘다의 환경에 최적화

## 💻 기술스택

#### Frontend

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

#### Backend

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

#### Database

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white">

## 구조도

<img src="https://user-images.githubusercontent.com/52407470/236869844-6a2835f9-47b3-4a05-a763-dc7debe27576.png">

## 시작 가이드

### Requirements

작업 환경

- `React 5.0.1`
- `Node.js 16.16.0`
- `MySql 8.0.31`

### Installation

```bash
$ git clone https://github.com/ji-hunc/HumanStats.git
$ cd HumanStats
```

#### Frontend

```
$ cd front
$ npm install
$ npm run start
```

#### Database

```
(개인 mysql 접속)
$ mysql -u root -p
(HSScript.sql 파일이 있는 path를 작성)
$ source path/HSScript.sql
```

#### Backend

```
$ cd server
$ npm install
$ npm run server
```

## 📷 화면 구성

|                                                       Home                                                        |                                                    Home Mobile                                                    |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/52407470/236873028-bf25b5e7-5e4e-4488-b08f-5d0b81d90b87.png"> | <img src="https://user-images.githubusercontent.com/52407470/236873210-30b2d70f-4a7d-438f-94d9-d18122e37cc8.png"> |
|                                                      In Game                                                      |                                                  In Game Mobile                                                   |
| <img src="https://user-images.githubusercontent.com/52407470/236874347-5c5b9ea1-986b-41de-920a-58cbce5dc9c9.png"> | <img src="https://user-images.githubusercontent.com/52407470/236874406-992dcf09-577a-4013-b194-cee8c74c2471.png"> |

## 디렉토리 구조

```bash
├── README.md
├── server
│   ├── node_modules
│   ├── main.js
│   ├── package-lock.json
│   └── package.json
└── front
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── yarn.lock
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    └── src
        ├── App.js
        ├── index.js
        ├── index.css
        ├── Api
        │   └── Api.js
        ├── components
        │   ├── AnswerCheck
        │   │   ├── AnswerCheck.js
        │   │   └── styles.js
        │   ├── AnswerCheck
        │   │   ├── Matrix.js
        │   │   └── styles.js
        │   ├── Navigation
        │   │   ├── Navigation.js
        │   │   └── styles.js
        │   ├── Ranking
        │   │   ├── Ranking.js
        │   │   └── styles.js
        │   └── ResultBox
        │       ├── ResultBox.js
        │       └── styles.js
        ├── pages
        │   ├── Home
        │   │   ├── Home.js
        │   │   └── styles.js
        │   ├── Login
        │   │   ├── Login.js
        │   │   └── styles.js
        │   ├── SignUp
        │   │   ├── SignUp.js
        │   │   └── styles.js
        │   ├── NumberMemoryTest
        │   │   ├── NumberMemoryTest.js
        │   │   └── styles.js
        │   ├── AlphabetMemoryTest
        │   │   ├── AlphabetMemoryTest.js
        │   │   └── styles.js
        │   ├── SequenceMemoryTest
        │   │   ├── SequenceMemoryTest.js
        │   │   └── styles.js
        │   └── ReactionTimeTest
        │       ├── ReactionTimeTest.js
        │       └── styles.js
        └── pages
            └── LoginState.js
```
