const express = require('express');
const {RtcTokenBuilder, RtcRole, RtmTokenBuilder, RtmRole} = require('agora-access-token');

const PORT = process.env.PORT || '8080';

const APP_ID = "548f607b7ff44946b365b512d43af7ec";
const APP_CERTIFICATE = "fd3a901afc204bd8adc2867b25b068bd";

const app = express();

const nocache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
}

const generateRtcAccessToken = (req, resp) => {
    // Set response header 
    resp.header('Access-Control-Allow-Origin', '*');
    // get channel name
    const channelName = req.query.channelName;
    if (!channelName)
    {
        return resp.status(500).json({'error': 'channel is required'});
    }

    // get uid
    let uid = req.query.uid;
    if (!uid || uid == '')
    {
        uid = 0;
    }

    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher'){
        role = RtcRole.PUBLISHER;
    }

    // get the expire time 
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '')
    {
        expireTime = 3600;
    }
    else 
    {
        expireTime = parseInt(expireTime, 10);
    }
    // Calculate privilege expire time 
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // Build the token
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    // return the token 
    return resp.json({ 'token': token });
}

const generateRtcEmailAccessToken = (req, resp) => {
    // Set response header 
    resp.header('Access-Control-Allow-Origin', '*');
    // get channel name
    const channelName = req.query.channelName;
    if (!channelName)
    {
        return resp.status(500).json({'error': 'channel is required'});
    }

    // get uid
    let email = req.query.email;
    if (!email || email == '')
    {
        return resp.status(500).json({'error': 'email is required'});
    }

    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher'){
        role = RtcRole.PUBLISHER;
    }

    // get the expire time 
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '')
    {
        expireTime = 3600;
    }
    else 
    {
        expireTime = parseInt(expireTime, 10);
    }
    // Calculate privilege expire time 
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // Build the token
    const token = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, email, role, privilegeExpireTime);
    // const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    // return the token 
    return resp.json({ 'token': token });
}

const generateRtmAccessToken = (req, resp) => {
    // Set response header 
    resp.header('Access-Control-Allow-Origin', '*');
    // get channel name
    const uid = req.query.uid;
    if (!uid)
    {
        return resp.status(500).json({'error': 'uid is required'});
    }

    

    // get role
    let role = RtmRole.Rtm_User;
    

    // get the expire time 
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '')
    {
        expireTime = 3600;
    }
    else 
    {
        expireTime = parseInt(expireTime, 10);
    }
    // Calculate privilege expire time 
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // Build the token
    const token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime);
    
    // return the token 
    return resp.json({ 'token': token });
}

const generateRtmEmailAccessToken = (req, resp) => {
    // Set response header 
    resp.header('Access-Control-Allow-Origin', '*');
    // get channel name
    const email = req.query.email;
    if (!email)
    {
        return resp.status(500).json({'error': 'email is required'});
    }

    

    // get role
    let role = RtmRole.Rtm_User;
    

    // get the expire time 
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '')
    {
        expireTime = 3600;
    }
    else 
    {
        expireTime = parseInt(expireTime, 10);
    }
    // Calculate privilege expire time 
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // Build the token
    const token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, email, role, privilegeExpireTime);
    
    // return the token 
    return resp.json({ 'token': token });
}

app.get('/access_token/rtc', nocache, generateRtcAccessToken);
app.get('/access_token/rtc_email', nocache, generateRtcEmailAccessToken);
app.get('/access_token/rtm', nocache, generateRtmAccessToken);
app.get('/access_token/rtm_email', nocache, generateRtmEmailAccessToken);

app.listen(PORT, () => {
    console.log("Listening on port: ${PORT}");
});