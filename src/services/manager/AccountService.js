import { useAxiosPrivate } from '~/hooks';

const ACCOUNT_URL = '/v1/manager/account';

function AccountService() {
    const axiosPrivate = useAxiosPrivate();

    const getBuyers = async (payload) => {
        try {
            const res = await axiosPrivate.get(ACCOUNT_URL, payload);
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    const getSellers = async (payload) => {
        try {
            const res = await axiosPrivate.get(ACCOUNT_URL, payload);
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    const getAccounts = async (params) => {
        try {
            const res = await axiosPrivate.get(ACCOUNT_URL, {
                params: {...params}
            });
            return res?.data;
        } catch (error) {
            throw error.response;
        }
    };

    const changeAccountStatus = async (payload, params) => {
        try {
            const res = await axiosPrivate.delete(ACCOUNT_URL, {
                data: payload,
                params: {...params},
            });
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    return { getBuyers, getSellers, getAccounts, changeAccountStatus };
}

export default AccountService;
