const rtcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: [import.meta.env.VITE_RTC_ICE_SERVER_1, import.meta.env.VITE_RTC_ICE_SERVER_2],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default rtcConfig;
