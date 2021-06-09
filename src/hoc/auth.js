import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
export default (Comp, option, adminRoute = null) => {
    const AuthenticateCheck = ({ history }) => {
        const { isLogIn } = useSelector(({ user }) => ({
            isLogIn: user.account.id
        }))
        const [token, setToken] = useState(null);


        useEffect(() => {
            try {
                const get = localStorage.getItem('jwttoken');
                if (get) {
                    setToken(get);
                } else {
                    if (!token && option === true) {
                        //로그인 되어있지 않으면
                        alert('로그인 후 이용해 주세요.');
                        history.push('/login');
                    }
                }
            } catch (e) {
            }
        }, []);
        useEffect(() => {
            if (token && option === false) {
                //로그인되어 있으면 금지
                alert('로그인 사용자는 접근할 수 없습니다. 로그아웃 후 이용해 주세요.');
                history.push('/');
            }
        }, [token])
        return <Comp />
    }
    return AuthenticateCheck;
}