const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  visitor: {
    token: 'visitor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'visitor-token': {
    roles: ['visitor'],
    introduction: 'I am an visitor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal visitor'
  }
}

module.exports = [
  //user login
  {
    url: 'auth/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username].token
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        code: 20000,
        data: {
          token: token,
          user: {
            name: '',
            roles: []
          }
        }
      }
    }
  },
  // get user info
  {
    url: 'auth/info',
    type: 'get',
    response: config => {
      const { token } = config.body || { token: 'visitor-token' }
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  {
    url: 'auth/logout',
    type: 'delete',
    response: () => {
      return {
        code: 20000,
        data: 'logout success'
      }
    }
  }
]