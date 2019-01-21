var data = {
    'code': '10000',
    'token': '123456789',
    'message':'操作成功',
     'user': {
        'id': '222',
        'name': 'lizhouwei',
        'role': {
            'id':'123456',
            'name':'admin'
        }
     }
}

export default [{
    path: '/login',
    data: data
}]