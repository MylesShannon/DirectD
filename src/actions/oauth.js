import url from 'url';
import qs from 'querystring';
import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { getBills } from 'actions/bills';
import { userTotal } from 'actions/user';
var config = require('config');

// Sign in with Google
export function googleLogin() {
  const google = {
    url: config.api+'/api/v1/auth/google',
    clientId: '786999100982-9ugrvcg6gfh8412vjaqecj3c9i6376up.apps.googleusercontent.com',
    redirectUri: config.redirect,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'openid profile email',
    width: 452,
    height: 633
  };

  return (dispatch) => {
    oauth2(google, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}

export function logout() {
  cookie.remove('token');
  browserHistory.push('/');
  return {
    type: 'LOGOUT_SUCCESS'
  };
}

export function deleteAccount() {
  return (dispatch) => {
    return fetch(config.api+'/api/v1/user/remove', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then(() => {
          cookie.remove('token');
          browserHistory.push('/');
          dispatch(getBills());
          dispatch(userTotal());
          dispatch({
            type: 'ACCOUNT_DELETE_SUCCESS'
          });
        });
      } else {
        return response.json().then(() => {
          dispatch({
            type: 'ACCOUNT_DELETE_FAILURE'
          });
        });
      }
    });
  };
}

function oauth2(config, dispatch) {
  return new Promise((resolve) => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: 'popup',
      response_type: 'code'
    };
    const url = config.authorizationUrl + '?' + qs.stringify(params);
    resolve({ url: url, config: config, dispatch: dispatch });
  });
}

function openPopup({ url, config, dispatch }) {
  return new Promise((resolve) => {
    const width = config.width || 500;
    const height = config.height || 500;
    const options = {
      width: width,
      height: height,
      top: window.screenY + ((window.outerHeight - height) / 2.5),
      left: window.screenX + ((window.outerWidth - width) / 2)
    };
    const popup = window.open(url, '_blank', qs.stringify(options, ','));

    if (url === 'about:blank') {
      popup.document.body.innerHTML = 'Loading...';
    }

    resolve({ window: popup, config: config, dispatch: dispatch });
  });
}

function pollPopup({ window, config, requestToken, dispatch }) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri);
    const redirectUriPath = redirectUri.host + redirectUri.pathname;

    if (requestToken) {
      window.location = config.authorizationUrl + '?' + qs.stringify(requestToken);
    }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling);
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname;
        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(window.location.search.substring(1).replace(/\/$/, ''));
            const hash = qs.parse(window.location.hash.substring(1).replace(/[\/$]/, ''));
            const params = Object.assign({}, query, hash);

            if (params.error) {
              dispatch({
                type: 'OAUTH_FAILURE',
                messages: [{ msg: params.error }]
              });
              reject();
            } else {
              resolve({ oauthData: params, config: config, window: window, interval: polling, dispatch: dispatch });
            }
          } else {
            dispatch({
              type: 'OAUTH_FAILURE',
              messages: [{ msg: 'OAuth redirect has occurred but no query or hash parameters were found.' }]
            });
            reject();
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  });
}

function exchangeCodeForToken({ oauthData, config, window, interval, dispatch }) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config);

    return fetch(config.url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin', // By default, fetch won't send any cookies to the server
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          resolve({ token: json.token, user: json.user, window: window, interval: interval, dispatch: dispatch });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'OAUTH_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
          closePopup({ window: window, interval: interval });
          reject();
        });
      }
    });
  });
}

function signIn({ token, user, window, interval, dispatch }) {
  return new Promise((resolve) => {
    dispatch({
      type: 'OAUTH_SUCCESS',
      token: token,
      user: user
    });
    cookie.save('token', token, { expires: moment().add(24, 'hour').toDate(), domain: window.location.hostname.indexOf('localhost') > 0 ? 'localhost ' : '.mylesshannon.me' });
    browserHistory.push('/');
    resolve({ window: window, interval: interval });
  });

}


function closePopup({ window, interval }) {
  return new Promise((resolve) => {
    clearInterval(interval);
    window.close();
    resolve();
  });
}

