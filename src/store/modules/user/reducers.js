const initialState = {
	profile: null
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case '@auth/SIGN_IN_SUCCESS':
			return { ...state, profile: action.payload.user };
		case '@user/UPDATE_PROFILE_SUCCESS':
			return { ...state, profile: action.payload.profile };
		case '@auth/SIGN_OUT':
			return { ...state, profile: null };
		default:
			return state;
	}
}
