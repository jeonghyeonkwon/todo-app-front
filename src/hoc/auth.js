import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
export default (Comp, option, adminRoute = null) => {
    const AuthenticateCheck = ({ history }) => {
        const { isLogIn } = useSelector(({ user }) => ({
            isLogIn: user.account.id
        }))


        useEffect(() => {
            console.log(`isLogin 됨 ? ${isLogIn}`)
            if (!isLogIn && option === true) {
                //로그인 되어있지 않으면
                alert('로그인 후 이용해 주세요.');
                history.push('/login');
            }
        }, []);
        useEffect(() => {
            if (isLogIn && option === false) {
                //로그인되어 있으면 금지
                alert('로그인 사용자는 접근할 수 없습니다. 로그아웃 후 이용해 주세요.');
                history.push('/');
            }
        }, [isLogIn])
        return <Comp />
    }
    return AuthenticateCheck;
}