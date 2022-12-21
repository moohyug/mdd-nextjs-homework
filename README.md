## 배경정보
모두닥의 멤버 무무는 대대적인 리빌딩에 앞서 새로이 리빌딩할 코드의 새로운 기술스택을 학습함으로써 리빌딩 과정에 긴밀히 참여함으로써 리빌딩을 성공적으로 마무리할 수 있는데 기여한다. 해당 github 프로젝트는 이러한 목표의 일환이다. 

프로젝트의 개발진행 순서 및 참고자료는 다음 [링크](https://www.notion.so/modoodoc/react-014acdb3b66a497391be4094a00042bb)에서 참조 가능하다. CSS styling 및 Typescript 작업은 시간관계상 진행하지 않았다. 

사전과제 중에서도 다음 기능들을 구현하였다. 

1. 홈(병원리스트) <-> 리뷰리스트 <-> 리뷰상세 페이지로의 링크 이동 : next/link, next/router 활용
2. getServerSideProps 함수를 활용하여 SSR 기능 구현
3. react hook를 활용하여 리뷰리스트에서 1) infinite scroll, 2) 치료항목 버튼 클릭, 3) 검색 기능 구현
4. redux toolkit 을 활용하여 홈의 병원리스트 정보를 저장 및 렌더링. 

## 개발스택
- Javascript 
- React
- Redux
- Redux toolkit
- Next.js