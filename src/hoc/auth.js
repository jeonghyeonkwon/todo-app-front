import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default (Comp, option, adminRoute = null) => {
    const AuthenticateCheck = (props) => {
        const isLogIn = useSelector(({ user }) =>
            user.account.accountId
        )
        useEffect(() => {
            if (!isLogIn && option) {
                props.history.push('/login');
            }
        }, []);
        return <Comp />
    }
    return AuthenticateCheck;
}