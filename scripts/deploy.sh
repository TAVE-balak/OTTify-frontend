#!/bin/bash

REPOSITORY="/home/ubuntu/react-github-action"

cd $REPOSITORY # 이 경로로 이동해서 밑에 명령어들을 차례로 실행.

sudo npm install --legacy-peer-deps # 의존성 파일 설치.