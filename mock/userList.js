var userList = [
  {
      id:'111111',
      userCode:'13233',
      userName: 'lux1234'
  },
  {   id:'222222',
      userCode:'222222',
      userName: 'liujian'
  },
  {     id:'23333',
        userCode:'23333',
        userName: '23333'
  },
  {   id:'444444',
      userCode:'444444',
      userName: '444444'
  },
  {    id:'5555',
       userCode:'5555',
       userName: '5555'
  },
  {
    id:'666666',
    userCode:'666666',
    userName: '6666'
  },
  {   id:'777777',
      userCode:'77777',
      userName: '77777'
  },
  {     id:'88888',
        userCode:'8888',
        userName: '888'
  },
  {   id:'8888',
      userCode:'8888',
      userName: '8888'
  },
  {   
     id:'9999',
      userCode:'9999',
      userName: '999'
  } ,
  {  
    id:'322',
    userCode:'33',
    userName: '888'
  },
  {   id:'567',
  userCode:'6677',
  userName: '8888'
  },
  {    id:'9888',
  userCode:'9999',
  userName: '999'
  } 
]
export default [{
  path: '/user/userList',
  data: {total: userList.length,currentPage:1, rows: userList}
}]