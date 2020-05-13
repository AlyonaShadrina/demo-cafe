export const token = state => state.profile.accessToken;
export const profile = state => state.profile.user;
export const timeRemaining = state => state.profile.timeRemaining;
export const refill = state => state.profile.refill;

export const profileIsLoading = state => state.profile.loading;
export const profileError = state => state.profile.errors;
export const editCardError = state => state.profile.errors.editCard;
