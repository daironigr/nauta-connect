import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import loginAction from '../../actions/loginAction';
import logoutAction, { forceLogoutAction } from '../../actions/logoutAction';
import { loadUserAction, removeUserAction } from '../../actions/userStorageAction';
import { disconnectSplash, hideSplash } from '../../actions/splashAction';
import { nextTheme, restoreLastTheme } from '../../actions/themeAction';
import { closeDialogUsers, openDialogUsers } from '../../actions/dialogUsersAction';
import { loadSessionFromStorage } from '../../actions/storeSessionAction';
import { closeDialogAbout, openDialogAbout } from '../../actions/dialogAboutAction';
import { detectNavigatorAction } from '../../actions/detectNavigatorAction';
import {
  closeDialogQualified,
  loadCountConnect,
  loadQualifiedState,
  openDialogQualified,
  qualifiedAccepted,
} from '../../actions/connectQualifiedAction';

const Background = ({
                      login, loginAction, logoutAction, forceLogoutAction, loadUserAction, hideSplash,
                      disconnectSplash, nextTheme, openDialogUsers, closeDialogUsers, removeUserAction,
                      loadSessionFromStorage, restoreLastTheme, openDialogAbout, closeDialogAbout,
                      detectNavigatorAction, loadCountConnect, openDialogQualified, closeDialogQualified,
                      qualifiedAccepted, loadQualifiedState, ...props
                    }) => {

  useEffect(() => {
    restoreLastTheme();
    detectNavigatorAction();
    loadCountConnect();
    loadQualifiedState()

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch (request.type) {
          case 'LOGIN':
            loginAction(request.payload.username, request.payload.password, request.payload.remember);
            break;
          case 'LOGOUT':
            logoutAction();
            break;
          case 'FORCE_LOGOUT':
            forceLogoutAction();
            break;
          case 'LOAD_USER_STORE':
            loadUserAction(request.payload.username);
            break;
          case 'REMOVE_USER_STORE':
            debugger
            removeUserAction(request.payload.username);
            break;
          case 'HIDE_SPLASH':
            hideSplash();
            break;
          case 'NEXT_THEME':
            nextTheme();
            break;
          case 'OPEN_DIALOG_USERS':
            openDialogUsers();
            break;
          case 'CLOSE_DIALOG_USERS':
            closeDialogUsers();
            break;
          case 'OPEN_DIALOG_ABOUT':
            openDialogAbout();
            break;
          case 'CLOSE_DIALOG_ABOUT':
            closeDialogAbout();
            break;
          case 'OPEN_DIALOG_QUALIFIED':
            openDialogQualified();
            break;
          case 'CLOSE_DIALOG_QUALIFIED':
            closeDialogQualified();
            break;
          case 'QUALIFIED_ACCEPTED':
            qualifiedAccepted();
            break;
          case 'LOAD_SESSION_FROM_STORAGE':
            loadSessionFromStorage();
            break;
        }
      },
    );

  }, []);
  return (
    <Fragment/>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = {
  loginAction,
  logoutAction,
  forceLogoutAction,
  loadUserAction,
  hideSplash,
  disconnectSplash,
  nextTheme,
  openDialogUsers,
  closeDialogUsers,
  removeUserAction,
  loadSessionFromStorage,
  restoreLastTheme,
  openDialogAbout,
  closeDialogAbout,
  detectNavigatorAction,
  loadCountConnect,
  openDialogQualified,
  closeDialogQualified,
  qualifiedAccepted,
  loadQualifiedState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
