/*
  [ 필요한 패키지 import ]
*/
import { initializeApp } from "firebase/app";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
import { firebaseOptions } from './options';

(async() => {
  /*
    [ ServiceWorkerRegistration 가져오기 ]
  */
  let serviceWorkerRegistration: ServiceWorkerRegistration | undefined;
  if ('serviceWorker' in navigator) {
    serviceWorkerRegistration = await navigator.serviceWorker.register(process.env['FIREBASE_MESSAGING_SW_JS_FILE_PATH'] + '');
  }

  /*
    [ firebase app 초기화 ]
  */
  const firebaseApp = initializeApp(firebaseOptions);
  const messaging = getMessaging(firebaseApp);

  /*
    [ foreground message 수신 시작 ]
  */
  onMessage(messaging, (payload) => {
    console.log('onMessage...! payload =', payload);
    // 메시지를 수신받고 처리할 내용을 작성합니다.
  });

  /*
    [ firebase messaging 수신을 위한 token (push key) 가져오기 ]
  */
  getToken(messaging, {
    serviceWorkerRegistration: serviceWorkerRegistration,
  })
    .then((token) => {
      console.log('getToken token', token);
      // token 을 받아온 뒤 처리할 내용을 작성합니다.
    })
    .catch((error) => {
      console.error('firebase messaging token 을 가져올 수 없습니다.');
      console.error(error);
      // token 을 받아오는데 에러가 발생했을 경우 처리할 내용을 작성합니다.
    });

  /*
    [ 브라우저의 알림 권한 요청 ]
  */
  Notification.requestPermission()
    .then((value) => {
      console.log('permission', value);

      switch (value) {
        case 'granted':
          // permission 이 granted 일 때 처리할 내용을 작성합니다.
          break;
        case 'denied':
          // permission 이 denied 일 때 처리할 내용을 작성합니다.
          break;
        case 'default':
          // permission 이 default 일 때 처리할 내용을 작성합니다.
          break;
      }
    })
    .catch((error) => {
      console.log('브라우저 알림 권한 요청에 실패했습니다.');
      console.error(error);
      // 브라우저의 알림 권한 요청시 에러가 발생했을 경우 처리할 내용을 작성합니다.
    });
})();
  