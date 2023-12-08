import React, { createContext } from 'react';

// 创建一个简化的用户上下文
const UserContext = createContext({
    user: null, // 用户设为 null
    isAuthenticated: false // 认证状态设为 false
});

export default UserContext;
