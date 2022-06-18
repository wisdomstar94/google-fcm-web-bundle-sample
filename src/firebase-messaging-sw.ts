/*
  [ 필요한 패키지 import ]
*/
import { onBackgroundMessage, getMessaging, isSupported } from 'firebase/messaging/sw';
import { initializeApp } from 'firebase/app';
import { firebaseOptions } from './options';

/*
  [ self 라는 변수 타입 선언 ]
*/
declare let self: ServiceWorkerGlobalScope;

/*
  [ firebase app 초기화 ]
*/
const app = initializeApp(firebaseOptions);

/*
  [ 서비스 워커가 activate 되었을 때 처리할 내용 ]
*/
self.addEventListener('activate', (event) => {
  console.log('service.worker.activate!', event);
  event.waitUntil(self.clients.claim());
});

/*
  [ background message 수신 시작 ]
*/
isSupported()
  .then(() => {
    const messaging = getMessaging(app);
    onBackgroundMessage(messaging, (payload) => {
      console.log('onBackgroundMessage...! payload =', payload);

      // 받은 메시지의 데이터중 notification 을 가져옵니다.
      const notification = payload.notification;
      if (notification === undefined) {
        return;
      }

      // title 과 body 를 가져옵니다.
      let { title, body } = notification;
      if (typeof title !== 'string') {
        title = '[제목없음]';
      }
      if (typeof body !== 'string') {
        body = '[내용없음]';
      }

      // 브라우저로 알림을 보냅니다.
      self.registration.showNotification(title, {
        body,
        // icon: image,
        // ...
      });
    })
  })
  .catch((error) => {
    console.error('background messaging 수신 설정 도중 에러가 발생하였습니다.');
    console.error(error);
  });
