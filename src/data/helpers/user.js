import Immutable from 'seamless-immutable'

export const normalizeUser = (user={})=>{
	const clean = {
		_id: 				user._id,
		email: 				user.email||'',
		email_MD5: 			user.email_MD5||'',
		fullName: 			user.fullName||'',
		groups: 			user.groups||[],
		password: 			user.password||false,
		pro: 				user.pro||false,
		proExpire: 			user.proExpire||null,
		uniqKey: 			user.uniqKey||''
	}

	return Immutable(clean)
}

export const blankCurrent = normalizeUser({})