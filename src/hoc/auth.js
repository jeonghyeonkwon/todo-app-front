import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default (Comp, option, adminRoute = null) => {
    const AuthenticateCheck = (props) => {
        const isLogIn = useSelector(({ user }) =>
            user.account.accountId
        )
        useEffect(() => {
            if (isLogIn && option === false) {
                alert('로그인 사용자는 접근할 수 없습니다. 로그아웃 후 이용해 주세요.');
                props.history.push('/');
            } else if (!isLogIn && option) {
                props.history.push('/login');
            }
        }, []);
        return <Comp />
    }
    return AuthenticateCheck;
}