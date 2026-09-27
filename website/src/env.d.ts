/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IOS_APP_STORE_URL?: string;
  readonly VITE_IOS_TESTFLIGHT_URL?: string;
  readonly VITE_ANDROID_PLAY_STORE_URL?: string;
  readonly VITE_ANDROID_APK_URL?: string;
  readonly VITE_ANDROID_APK_SHA256?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
