var userList = {
    code: 200,
    data:{
    endRow: 10,
    hasNextPage: true,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: false,
    list: [{
    createTime: null,
    credentialsSalt: "adminnull",
    defaultRole: Object,
    email: "aaa",
    id: "1"
    }],
    navigateFirstPage: 1,
    navigateLastPage: 3,
    navigatePages: 8,
    navigatepageNums: (3) [1, 2, 3],
    nextPage: 2,
    pageNum: 1,
    pageSize: 10,
    pages: 3,
    prePage: 0,
    size: 10,
    startRow: 1,
    total: 2
    }
}
export default [{
  path: '/user/userList',
  data: userList
}]