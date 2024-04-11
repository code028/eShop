import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Navigate, Outlet } from 'react-router-dom';

const HasNoToken = () => {
	const session = useSelector((state: RootState) => state.session);

	return !session.refreshToken ? <Outlet /> : <Navigate to={'/'}  replace /> 
}

export default HasNoToken;