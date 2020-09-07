import api from './api';

const createNewWalletForAccount = (currency, token) =>
    api.getRequest(`/account/create-wallet/${currency}`, token);

const createNewWithdraw = (currency, data, token) =>
    api.postRequest(`/account/create-withdraw/${currency}`, data, token);

const confirmNewWithdraw = (code, token) =>
    api.getRequest(`/account/verification-withdraw/${code}`, token);

const getTransactionLast10 = (token) =>
    api.getRequest('/transactions/get10-last', token);

const getTransactionAccount = (page, limit, token) =>
    api.getRequest(`/transactions/account-transactions?page=${page}&limit=${limit}`, token);

const getTradesAccount = (page, limit, token) =>
    api.getRequest(`/transactions/trade-transactions?page=${page}&limit=${limit}`, token);

const getActiveOperations = (token) =>
    api.getRequest('/operations/active', token);

const getActiveCountOperations = (token) =>
    api.getRequest('/operations/active-count', token);

const createOperation = (data, token) =>
    api.postRequest('/operations/create', data, token);

const getOperation = (data, token) =>
    api.getRequest(`/operations/get-operation?link=${ data }`, token);

const getMessagesOperation = (data, token) =>
    api.getRequest(`/operations/get-messages?link=${ data }`, token);

const sendMessagesOperation = (link, data, token) =>
    api.postRequest(`/operations/send-message?link=${ link }`, data, token);

const acceptOperation = (data, token) =>
    api.getRequest(`/operations/accept-operation?link=${ data }`, token);

const payOperation = (data, token) =>
    api.getRequest(`/operations/pay-operation?link=${ data }`, token);

const sendCoinOperation = (data, token) =>
    api.getRequest(`/operations/send-coin-operation?link=${ data }`, token);

const cancelOperation = (data, token) =>
    api.getRequest(`/operations/cancel-operation?link=${ data }`, token);

const disputeOperation = (link, data, token) =>
    api.postRequest(`/operations/dispute-operation?link=${ link }`, data, token);

const saveReviewToUser = (link, data, token) =>
    api.postRequest(`/operations/review-operation?link=${ link }`, data, token);

const getArchiveOperations = (page, limit, token) =>
    api.getRequest(`/operations/archive?page=${page}&limit=${limit}`, token);

const getMyAdvert = (token) =>
    api.getRequest('/anunt/my-advert', token);

const changeStatusAll = (token) =>
    api.getRequest('/user/change-status-all', token);

const changeStatusAdvert = (advert, token) =>
    api.postRequest('/anunt/change-status-advert', {advert}, token);

const getActiveNotification = (token) =>
    api.getRequest('/user/get-active-notification', token);

const getNotification = (page, limit, token) =>
    api.getRequest(`/user/get-notification?page=${page}&limit=${limit}`, token);

const getBalanceAccount = (token) =>
    api.getRequest('/user/get-account-balance', token);

const notificationRead = (id, token) =>
    api.getRequest(`/user/read-notification?notify=${id}`, token);

const getAuthGoogle = (token) =>
    api.getRequest(`/user/auth-google-first`, token);

const getAuthGoogleActive = (code, token) =>
    api.getRequest(`/user/auth-google-active?code=${code}`, token);

const getPaymentSystem = (code, token) =>
    api.getRequest(`/user/get-payment-systems?code=${code}`, token);

const addPaymentSystem = (data, token) =>
    api.postRequest('/user/add-payment-systems', data, token);

const loadUserStatistic = (token) =>
    api.getRequest('/user/get-user-statistic', token);

const loadUserReview = (page, limit, token) =>
    api.getRequest(`/user/get-user-review?page=${page}&limit=${limit}`, token);

const uploadVerification = (data, token) =>
    api.postRequest('/user/verification-user', data, token);

const delPaymentSystem = (id, token) =>
    api.getRequest(`/user/del-payment-systems/${id}`, token);

const getSourcePrice = (coin, currency, token) =>
    api.getRequest(`/anunt/get-price-source?coin=${coin}&currency=${currency}`, token);

const createNewAdvert = (advert, token) =>
    api.postRequest('/anunt/create-new-advert', advert, token);

const getAdvertEdit = (advert, token) =>
    api.getRequest(`/anunt/get-edit-advert/${advert}`, token);

const saveAdvertEdit = (advert, data, token) =>
    api.postRequest(`/anunt/save-edit-advert/${advert}`, data, token);

const deleteAdvertUser = (advert, token) =>
    api.getRequest(`/anunt/delete-advert/${advert}`, token);

const getMessagesSupport = (token) =>
    api.getRequest(`/support/get-messages`, token);

const sendMessagesSupport = (data, token) =>
    api.postRequest(`/support/send-messages`, data, token);

const getRequestCabinet = (url, token) =>
    api.getRequest(url, token);

export default {
    createNewWithdraw,
    confirmNewWithdraw,
    createNewWalletForAccount,
    getTransactionLast10,
    getTransactionAccount,
    getTradesAccount,
    getActiveOperations,
    getActiveCountOperations,
    getArchiveOperations,
    sendMessagesOperation,
    createOperation,
    getMyAdvert,
    changeStatusAll,
    changeStatusAdvert,
    getActiveNotification,
    getNotification,
    getBalanceAccount,
    notificationRead,
    getOperation,
    acceptOperation,
    payOperation,
    sendCoinOperation,
    cancelOperation,
    disputeOperation,
    saveReviewToUser,
    getMessagesOperation,
    getMessagesSupport,
    sendMessagesSupport,
    getAuthGoogle,
    getAuthGoogleActive,
    getPaymentSystem,
    addPaymentSystem,
    delPaymentSystem,
    getSourcePrice,
    createNewAdvert,
    getAdvertEdit,
    saveAdvertEdit,
    deleteAdvertUser,
    loadUserStatistic,
    loadUserReview,
    uploadVerification,
    getRequestCabinet,
};
