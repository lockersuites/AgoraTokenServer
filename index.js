const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = process.env.PORT || 3000;

const APP_ID = "24ded81ab1004231bebf4534c29df37c";
const APP_CERTIFICATE = "f2a541ee16f444c4aed7159ddb59f373";



app.get('/token', (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const uid = req.query.uid || 0;  // Set to 0 for non-login authentication
  const role = RtcRole.PUBLISHER;  // Role can be PUBLISHER or SUBSCRIBER
  const expireTime = 3600; // Token validity time in seconds

  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  return res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
