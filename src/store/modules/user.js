import { login, logout, getInfo } from '@/api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    token: Cookies.get('token'),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(email, password).then(response => {
          const result = response.result;
          Cookies.set('token', result.token);
          commit('SET_TOKEN', result.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const result = response.result;
          commit('SET_ROLES', result.roles);
          commit('SET_NAME', result.username);
          commit('SET_AVATAR', result.avatar);
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('token');
        resolve();
      });
    }
  }
};

export default user;
